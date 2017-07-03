<?php

require_once 'databaseHandler.php';

class loginHandler extends databaseHandler
{
    function login()
    {
        $objResponse = array
        (
            'blnSuccess' => false,
            'strMessage' => 'Username or password incorrect.'
        );

        $strUsername = $_GET['username'];
        $strPassword = $_GET['password'];
        $intUserId = 0;

        $strPassword = hash('sha512', $strPassword);

        $qryCheckLogin = '
          select UserId, 
            Username,
            Verified,
            ARCUser
          from Users
          where username = \'' . $strUsername . '\' 
            and password = \'' . $strPassword . '\';';

        foreach($this->db->query($qryCheckLogin) as $row)
        {
            if($row['Verified'] == 1)
            {
                $objResponse['blnSuccess'] = true;
                $objResponse['strMessage'] = 'You have been successfully logged in.';
                $objResponse['blnARCUser'] = $row['ARCUser'];
                $intUserId = $row['UserId'];
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

            $stmt = $this->db->prepare('
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

            $qryCheckLoggedIn = $this->db->prepare('
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

            $qryCheckLoggedIn = '
                select sessionId
                from Sessions
                where timeStamp > now()
                  and sessionActive = 1
                  and sessionId = ' . $intSessionId;

            foreach($this->db->query($qryCheckLoggedIn) as $row)
            {
                if($row['sessionId'] != 0)
                {
                    $blnLoggedInDB = true;
                }
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

    function register($emailAddress, $username, $password)
    {
        $objResponse = array
        (
            'blnSuccess' => true,
            'strMessage' => 'Error processing register request.'
        );

        $qryUserExists = '
          select username,
            emailAddress
          from Users
          where username = \'' . $username . '\' 
            or emailAddress = \'' . $emailAddress . '\';';

        foreach($this->db->query($qryUserExists) as $row)
        {
            if($row['emailAddress'] == $emailAddress)
            {
                $objResponse['blnSuccess'] = false;
                $objResponse['strMessage'] = 'User with this email address already exists.';
            }
            else if($row['username'] == $username)
            {
                $objResponse['blnSuccess'] = false;
                $objResponse['strMessage'] = 'Username already in use.';
            }
        }

        if($objResponse['blnSuccess'])
        {
            $verificationCode = rand(0 , 999999999);
            $password = hash('sha512', $password);
            $objResponse['strMessage'] = 'User successfully registered. Please verify your email address before logging in.';

            $qryInsertUser = $this->db->prepare(
            "
              insert into Users (username, emailAddress, password, verified, verificationCode)
              values (:username, :emailAddress, :password, 0, :verificationCode);
              set @userId = LAST_INSERT_ID();
              insert into Settings (SettingCode, SettingValue, UserId)
              values ('EnableSound', 1, @userId);
              insert into Settings (SettingCode, SettingValue, UserId)
              values ('EnableMusic', 1, @userId);
            ");

            $qryInsertUser->execute(array(':username' => $username, ':emailAddress' => $emailAddress, ':password' => $password, ':verificationCode' => $verificationCode));

            // This is here in case I am running this locally. I don't have a means of sending out mail so it just makes everything crash.
            if($_SERVER['HTTP_HOST'] != 'localhost' && $_SERVER['HTTP_HOST'] != 'dojp.com')
            {
                $emailMessage = '
                    <html>
                        <body>
                            <div style="background-color: #303033; width: 1000px; height: 107px;">
                                <div style="width: 100%; height: 30px; text-align: left; background-color: #950740; float: left; margin-top: 77px;"></div>
                                <div style="float: left; margin-top: -100px; margin-left: 291px;"><a href="http://odinary.net/"><img src="http://odinary.net/media/site/logo2.png" style="height: 100px; "></a></div>
                            </div>
                            <div style="margin-top: -20px; background-color: #1A1A1D; width: 1000px; height: 600px; color: #FFFFFF;">
                                <p style="margin-bottom: 25px; margin-left: 300px; padding-top: 50px; font-size: 20px; font-weight: bold;">Hello '.$username.',</p>
                                <p style="margin-left: 325px; padding-top: 25px;">Please visit the link below to verify your recently created account.</p>
                                <p style="margin-left: 350px;"><a href="http://odinary.net/lib/siteLib/verifyEmail.php?emailAddress=' . $emailAddress . '&verificationCode=' . $verificationCode . '" style="color: #FFFFFF">Verify here</a></p>
                                <p style="margin-left: 300px; margin-top: 75px;">Sincerely,</p>
                                <p style="margin-left: 300px; font-weight: bold;">Odinary.net</p>
                            </div>
                        </body>
                    </html>
                ';

                $headers = 'Content-type: text/html; charset=iso-8859-1' . '\r\n';
                $headers .= 'To: ' . $username . ' <' . $emailAddress . '>' . '\r\n';
                $headers .= 'From: Odinary <noreply@odinary.net>';

                mail
                (
                    $emailAddress,
                    'Odinary - Verification Email',
                    $emailMessage,
                    $headers,
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

        $qryVerification = '
          select username
          from Users
          where verificationCode = \'' . $strVerificationCode . '\' 
            and emailAddress = \'' . $strEmailAddress . '\';';

        foreach($this->db->query($qryVerification) as $row)
        {
            if($row['username'] != '')
            {
                $blnEmailVerified = true;
            }
        }

        if($blnEmailVerified)
        {
            $qrySetVerify = $this->db->prepare('
              update Users
              set verified = 1
              where emailAddress = :emailAddress
                and verificationCode = :verificationCode');

            $qrySetVerify->execute(array(':emailAddress' => $strEmailAddress, ':verificationCode' => $strVerificationCode));
        }

        return $blnEmailVerified;
    }

    function setAccountValue($sessionId, $accountCode, $accountValue)
    {
        $qrySetValue = '';

        if($accountCode == 'username')
        {
            $qrySetValue = $this->db->prepare('
              update Users usr
                join Sessions ses on ses.UserId = usr.UserId
              set username = :accountValue
              where ses.sessionId = :sessionId
                and ses.sessionActive = 1');
        }
        else if($accountCode == 'emailAddress')
        {
            $qrySetValue = $this->db->prepare('
              update Users usr
                join Sessions ses on ses.UserId = usr.UserId
              set emailAddress = :accountValue
              where ses.sessionId = :sessionId
                and ses.sessionActive = 1');
        }
        else if($accountCode = 'password')
        {
            $accountValue = hash('sha512', $accountValue);

            $qrySetValue = $this->db->prepare('
              update Users usr
                join Sessions ses on ses.UserId = usr.UserId
              set password = :accountValue
              where ses.sessionId = :sessionId
                and ses.sessionActive = 1');
        }

        $qrySetValue->execute(array(':sessionId' => $sessionId, ':accountValue' => $accountValue));

        $objResponse = array
        (
            'blnSuccess' => true,
            'strMessage' => 'Successfully changed.'
        );

        return $objResponse;
    }

    function getAccountInfo()
    {
        $intSessionId = $_COOKIE["SCfDoJP"];

        $qryGetUserInfo = $this->db->prepare
        ("
            select usr.username,
              usr.emailAddress,
              lb.Score,
              lh.levelNumber
            from Sessions ses
              join Users usr on usr.UserId = ses.UserId
              left outer join Leaderboard lb on lb.UserId = ses.UserId
              left outer join LevelHeader lh on lh.levelHeaderId = lb.levelHeaderId
            where ses.sessionId = " . $intSessionId . "
            order by lb.Score desc
            limit 1
        ");

        $qryGetUserInfo->execute();
        return $qryGetUserInfo->fetchAll();
    }

    function forgotPassword($username, $email)
    {
        $objResponse = array
        (
            'blnSuccess' => false,
            'strMessage' => 'No matches for username and email.'
        );

        $qryCheckForUser = $this->db->prepare
        ('
            select count(UserId) as UserCount
            from Users
            where Username = :username
              and EmailAddress = :email
        ');

        $qryCheckForUser->execute(array(':username' => $username, ':email' => $email));
        $result = $qryCheckForUser->fetchObject();

        if($result->UserCount > 0)
        {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $charactersLength = strlen($characters);
            $randomString = '';

            for($i = 0; $i < 10; $i++)
            {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }

            $password = hash('sha512', $randomString);

            $qryResetPassword = $this->db->prepare
            ('
              update Users
              set Password = :password
              where Username = :username
                and EmailAddress = :email;
            ');

            $qryResetPassword->execute(array(':username' => $username, ':email' => $email, ':password' => $password));

            // This is here in case I am running this locally. I don't have a means of sending out mail so it just makes everything crash.
            if($_SERVER['HTTP_HOST'] != 'localhost' && $_SERVER['HTTP_HOST'] != 'dojp.com')
            {
                $emailMessage = '
                    <html>
                        <body>
                            <div style="background-color: #303033; width: 1000px; height: 107px;">
                                <div style="width: 100%; height: 30px; text-align: left; background-color: #950740; float: left; margin-top: 77px;"></div>
                                <div style="float: left; margin-top: -100px; margin-left: 291px;"><a href="http://odinary.net/"><img src="http://odinary.net/media/site/logo2.png" style="height: 100px; "></a></div>
                            </div>
                            <div style="margin-top: -20px; background-color: #1A1A1D; width: 1000px; height: 600px; color: #FFFFFF;">
                                <p style="margin-bottom: 25px; margin-left: 300px; padding-top: 50px; font-size: 20px; font-weight: bold;">Hello '.$username.',</p>
                                <p style="margin-left: 325px; padding-top: 25px;">A reset password has been triggered for your account. Your new temporary password is below.</p>
                                <p style="margin-left: 350px;">'.$randomString.'</p>
                                <p style="margin-left: 300px; margin-top: 75px;">Sincerely,</p>
                                <p style="margin-left: 300px; font-weight: bold;">Odinary.net</p>
                            </div>
                        </body>
                    </html>
                ';

                $headers = 'Content-type: text/html; charset=iso-8859-1' . '\r\n';
                $headers .= 'To: ' . $username . ' <' . $email . '>' . '\r\n';
                $headers .= 'From: Odinary <noreply@odinary.net>';

                mail
                (
                    $email,
                    'Odinary - Reset Password',
                    $emailMessage,
                    $headers,
                    '-f noreply@odinary.net'
                );
            }

            $objResponse['blnSuccess'] = true;
            $objResponse['strMessage'] = 'Email has been sent.';
        }

        return $objResponse;
    }

    function checkForARC()
    {
        $blnARCUser = false;

        if(isset($_COOKIE['SCfDoJP']))
        {
            $intSessionId = $_COOKIE["SCfDoJP"];

            $qryCheckLoggedIn = '
                select ses.sessionId
                from Sessions ses
                  join Users usr on usr.UserId = ses.UserId
                where ses.timeStamp > now()
                  and ses.sessionActive = 1
                  and usr.ARCUser = 1
                  and ses.sessionId = ' . $intSessionId;

            foreach($this->db->query($qryCheckLoggedIn) as $row)
            {
                if($row['sessionId'] != 0)
                {
                    $blnARCUser = true;
                }
            }
        }

        return $blnARCUser;
    }
}

$clsLoginHandler = new loginHandler();