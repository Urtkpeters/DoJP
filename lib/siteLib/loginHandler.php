<?php
    class loginHandler
    {
        function login()
        {
            $objResponse = array
            (
                'blnSuccess' => false,
                'strMessage' => 'Error processing login request.'
            );

            $strUsername = $_GET['username'];
            $strPassword = $_GET['password'];
            $intUserId = 0;

            $strPassword = hash('sha512', $strPassword);

            require 'databaseHandler.php';

            $qryCheckLogin = '
              select userId, 
                username,
                verified
              from Users
              where username = \'' . $strUsername . '\' 
                and password = \'' . $strPassword . '\';';

            foreach($db->query($qryCheckLogin) as $row)
            {
                if($row['verified'] == 1)
                {
                    $objResponse['blnSuccess'] = true;
                    $objResponse['strMessage'] = 'You have been successfully logged in.';
                    $intUserId = $row['userId'];
                }
                else
                {
                    $objResponse['strMessage'] = 'Your account was not verified. Please verify your account using the link sent to your email address.';
                }

            }

            if($objResponse['blnSuccess'])
            {
                $intSessionID = rand(0 , 999999999);

                $strDomain = $_SERVER['HTTP_HOST'];

                setcookie( "SCfDoJP", $intSessionID, time()+7200, "/", $strDomain, 0);

                $stmt = $db->prepare('
                  insert into Sessions (sessionId, sessionActive, timeStamp, userId) 
                  values (:sessionID, 1, date_add(now(),INTERVAL 2 hour), :userId)');

                $stmt->execute(array(':sessionID' => $intSessionID, ':userId' => $intUserId));
            }

            return $objResponse;
        }

        function logout()
        {
            $objResponse = array
            (
                'blnSuccess' => false,
                'strMessage' => 'Error processing logout request.'
            );

            if(isset($_COOKIE['SCfDoJP']))
            {
                $intSessionId = $_COOKIE["SCfDoJP"];

                require 'databaseHandler.php';

                $qryCheckLoggedIn = $db->prepare('
                  update Sessions
                  set sessionActive = 0
                  where sessionId = :sessionId');

                $qryCheckLoggedIn->execute(array(':sessionId' => $intSessionId));

                // Both of these will not just deactivate the cookie but also remove from the browser upon next page load.
                unset($_COOKIE['SCfDoJP']);
                setcookie('SCfDoJP', '', time()-3600, '/');

                $objResponse['blnSuccess'] = true;
                $objResponse['strMessage'] = 'You have been successfully logged out.';
            }

            return $objResponse;
        }

        function checkSession()
        {
            $blnLoggedInDB = false;

            if(isset($_COOKIE['SCfDoJP']))
            {
                $intSessionId = $_COOKIE["SCfDoJP"];

                require 'databaseHandler.php';

                $qryCheckLoggedIn = '
                    select sessionId
                    from Sessions
                    where timeStamp > now()
                      and sessionActive = 1
                      and sessionId = ' . $intSessionId;

                foreach($db->query($qryCheckLoggedIn) as $row)
                {
                    $blnLoggedInDB = true;
                }

                if(!$blnLoggedInDB)
                {
                    // Both of these will not just deactivate the cookie but also remove from the browser upon next page load.
                    unset($_COOKIE['SCfDoJP']);
                    setcookie('SCfDoJP', '', time()-3600, '/');
                }
            }

            return $blnLoggedInDB;
        }

        function register()
        {
            $objResponse = array
            (
                'blnSuccess' => true,
                'strMessage' => 'Error processing register request.'
            );

            $strUsername = $_GET['username'];
            $strEmailAddress = $_GET['emailAddress'];
            $strPassword = $_GET['password'];

            require 'databaseHandler.php';

            $qryUserExists = '
              select username,
                emailAddress
              from Users
              where username = \'' . $strUsername . '\' 
                or emailAddress = \'' . $strEmailAddress . '\';';

            foreach($db->query($qryUserExists) as $row)
            {
                if($row['emailAddress'] == $strEmailAddress)
                {
                    $objResponse['blnSuccess'] = false;
                    $objResponse['strMessage'] = 'User with this email address already exists.';
                }
                else if($row['username'] == $strUsername)
                {
                    $objResponse['blnSuccess'] = false;
                    $objResponse['strMessage'] = 'Username already in use.';
                }
            }

            if($objResponse['blnSuccess'])
            {
                $intVerificationCode = rand(0 , 999999999);
                $strPassword = hash('sha512', $strPassword);
                $objResponse['strMessage'] = 'User successfully registered. Please verify your email address before logging in.';

                $qryInsertUser = $db->prepare(
                "
                  insert into Users (username, emailAddress, password, verified, verificationCode)
                  values (:username, :emailAddress, :password, 0, :verificationCode);
                  set @userId = LAST_INSERT_ID();
                  insert into Settings (SettingCode, SettingValue, UserId)
                  values ('EnableSound', 1, @userId);
                  insert into Settings (SettingCode, SettingValue, UserId)
                  values ('EnableMusic', 1, @userId);
                ");

                $qryInsertUser->execute(array(':username' => $strUsername, ':emailAddress' => $strEmailAddress, ':password' => $strPassword, ':verificationCode' => $intVerificationCode));

                // This is here in case I am running this locally. I don't have a means of sending out mail so it just makes everything crash.
                if($_SERVER['HTTP_HOST'] != 'localhost' && $_SERVER['HTTP_HOST'] != 'DoJP.com')
                {
                    $strEmailMessage = '
                        <html>
                            <body>
                                <p>Hello ' . $strUsername . ',</p>
                                <p style="margin-left: 25px;">
                                    Please visit the link below to verify your recently created account.<br />
                                    <a href="http://odinary.net/lib/siteLib/verifyEmail.php?emailAddress=' . $strEmailAddress . '&verificationCode=' . $intVerificationCode . '">Verify here</a>
                                </p>
                                <p style="margin-left: 25px;">
                                    Sincerely,<br />
                                    Odinary.net
                                </p>
                            </body>
                        </html>
                    ';

                    $strHeaders = 'Content-type: text/html; charset=iso-8859-1' . '\r\n';
                    $strHeaders .= 'To: ' . $strUsername . ' <' . $strEmailAddress . '>' . '\r\n';
                    $strHeaders .= 'From: Odinary <noreply@odinary.net>';

                    mail
                    (
                        $strEmailAddress,
                        'Odinary - Verification Email',
                        $strEmailMessage,
                        $strHeaders,
                        '-f noreply@odinary.net'
                    );
                }
            }

            return $objResponse;
        }

        function verifyEmail()
        {
            $blnEmailVerified = false;

            $strEmailAddress = $_GET['emailAddress'];
            $strVerificationCode = $_GET['verificationCode'];

            require 'databaseHandler.php';

            $qryVerification = '
              select username
              from Users
              where verificationCode = \'' . $strVerificationCode . '\' 
                and emailAddress = \'' . $strEmailAddress . '\';';

            foreach($db->query($qryVerification) as $row)
            {
                $blnEmailVerified = true;
            }

            if($blnEmailVerified)
            {
                $qrySetVerify = $db->prepare('
                  update Users
                  set verified = 1
                  where emailAddress = :emailAddress
                    and verificationCode = :verificationCode');

                $qrySetVerify->execute(array(':emailAddress' => $strEmailAddress, ':verificationCode' => $strVerificationCode));
            }

            return $blnEmailVerified;
        }

        function setAccountValue()
        {
            $strSessionId = $_GET['sessionId'];
            $strAccountCode = $_GET['accountCode'];
            $strAccountValue = $_GET['accountValue'];

            if($strAccountCode == 'password')
            {
                echo $strAccountValue;
                $strAccountValue = hash('sha512', $strAccountValue);
                echo $strAccountValue;
            }

            require 'databaseHandler.php';

            $qrySetValue = '';

            if($strAccountCode == 'username')
            {
                $qrySetValue = $db->prepare('
                  update Users usr
                    join Sessions ses on ses.UserId = usr.UserId
                  set username = :accountValue
                  where ses.sessionId = :sessionId
                    and ses.sessionActive = 1');
            }
            else if($strAccountCode == 'emailAddress')
            {
                $qrySetValue = $db->prepare('
                  update Users usr
                    join Sessions ses on ses.UserId = usr.UserId
                  set emailAddress = :accountValue
                  where ses.sessionId = :sessionId
                    and ses.sessionActive = 1');
            }
            else if($strAccountCode = 'password')
            {
                $qrySetValue = $db->prepare('
                  update Users usr
                    join Sessions ses on ses.UserId = usr.UserId
                  set password = :accountValue
                  where ses.sessionId = :sessionId
                    and ses.sessionActive = 1');
            }

            $qrySetValue->execute(array(':sessionId' => $strSessionId, ':accountValue' => $strAccountValue));

            $objResponse = array
            (
                'blnSuccess' => true,
                'strMessage' => 'Successfully changed.'
            );

            return $objResponse;
        }
    }

    $clsLoginHandler = new loginHandler();
?>