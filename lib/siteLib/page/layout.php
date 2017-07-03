<?php
    require 'lib/siteLib/event/loginHandler.php';
    $blnLoggedInDB = $clsLoginHandler->checkSession();
    $blnARCUser = $clsLoginHandler->checkForARC();
    $title = 'Odinary';

    if(!file_exists('lib/siteLib/page/pages/'.$eventTarget.'.php') || ($eventTarget == 'account' && !$blnLoggedInDB) || ($eventTarget == 'builds' && $blnLoggedInDB && !$blnARCUser))
    {
        $eventTarget = 'home';
    }

    switch($eventTarget)
    {
        case 'account':
            $title = 'Account';
            break;
        case 'arc':
            $title = 'ARC';
            break;
        case 'dojp':
            $title = 'DoJP';
            break;
        case 'home':
            $title = 'Odinary';
            break;
        case 'leaderboard':
            $title = 'Leaderboard';
            break;
        case 'patchnotes':
            $title = 'Patch Notes';
            break;
        case 'verifyEmail':
            $title = 'Verify Email';
            break;
        case 'ti7':
            $title = 'ARC - TI7';
            break;
        case 'builds':
            $title = 'ARC - Builds';
            break;
    }
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title><?=$title?></title>
        <link rel="stylesheet" href="css/<?=$eventTarget?>.css" />
        <link rel="stylesheet" href="css/main.css" />
        <link rel="shortcut icon" href="media/site/favicon.png" type="image/png">
        <script src="js/jquery.min.js"></script>
        <script src="js/jquery.fancybox.min.js"></script>
        <link rel="stylesheet" href="css/jquery.fancybox.min.css" />
        <script src="js/loginFunctionality.js"></script>
    </head>
    <body>
        <div id="navigationDiv" class="navigationDiv">
            <div id="logoDiv" class="logoDiv">
                <a href="/"><img src="media/site/logo2.png" /></a>
            </div>
            <div id="topButtonsDiv" class="topButtonsDiv">
                <div id="contactButton" class="topButton">
                    <label>CONTACT</label>
                </div>
                <div id="loginDiv" class="topButton">
                    <?php
                        if($blnLoggedInDB)
                        {
                            echo '<label>LOGOUT</label>';
                        }
                        else
                        {
                            echo '<label>LOGIN</label>';
                        }
                    ?>
                </div>
                <?php
                    if($blnLoggedInDB)
                    {
                        echo '<a href="/page/account"><div id="accountButton" class="topButton"><label>ACCOUNT</label></div></a>';
                    }
                ?>
            </div>
            <div class="mainNavigation">
                <div class="dojpNav">
                    <a class="gameNavLink" href="/page/dojp">
                        <div id="gameNav" class="navLink">
                            <p>DoJP</p>
                        </div>
                    </a>
                    <div class="navDropdown">
                        <a href="/page/leaderboard">
                            <div class="subNavLink">Leaderboard</div>
                        </a>
                        <a href="/page/patchnotes">
                            <div class="subNavLink">Patch Notes</div>
                        </a>
                    </div>
                </div>
                <div id="arcNav" class="arcNav">
                    <a class="arcNavLink" href="/page/arc">
                        <div id="arcNav2" class="navLink">
                            <p>ARC</p>
                        </div>
                    </a>
                    <div id="arcSubNav" class="navDropdown">
                        <a href="/page/ti7">
                            <div class="subNavLink">TI7</div>
                        </a>
                        <?php
                            if($blnARCUser)
                            {
                                ?>
                                    <a id="arcBuildLink" href="/page/builds">
                                        <div class="subNavLink">Builds</div>
                                    </a>
                                <?php
                            }
                        ?>
                    </div>
                </div>
            </div>
        </div>
        <div id="messages" class="messages">&nbsp;</div>
        <div id="pageContents" class="pageContents">
            <?php
                require 'pages/'.$eventTarget.'.php';
            ?>
        </div>
        <div id="lightboxShell" class="lightboxShell">
            <div id="loginLightbox" class="lightboxContainer">
                <label>LOGIN</label>
                <div id="loginUsernameDiv" class="inputDiv">
                    <input id="username" type="text" placeholder="Username" onkeypress="return login(event)" autocomplete="off" />
                </div>
                <div id="loginPasswordDiv" class="inputDiv">
                    <input id="password" type="password" placeholder="Password" onkeypress="return login(event)" autocomplete="off" />
                    <div id="forgotPasswordLink" class="forgotPasswordLink" onclick="return showForgotPassword(event)">Forgot Password?</div>
                </div>
                <div id="loginErrorDiv" class="errorDiv">&nbsp;</div>
                <div id="loginRegisterButton" class="submitButton" onclick="return showRegister(event)">
                    <label>REGISTER</label>
                </div>
                <div id="loginSubmitButton" class="submitButton" onclick="return login(event)">
                    <label>SUBMIT</label>
                </div>
            </div>
            <div id="registerLightbox" class="lightboxContainer">
                <label>REGISTER</label>
                <div id="newEmailDiv" class="inputDiv">
                    <input id="newEmail" type="text" placeholder="Email Address" onkeypress="return register(event)" autocomplete="off" />
                </div>
                <div id="newUsernameDiv" class="inputDiv">
                    <input id="newUsername" type="text" placeholder="Username" onkeypress="return register(event)" autocomplete="off" />
                </div>
                <div id="newPasswordDiv" class="inputDiv">
                    <input id="newPassword" type="password" placeholder="Password" onkeypress="return register(event)" autocomplete="off" />
                </div>
                <div id="newPasswordConfirmDiv" class="inputDiv">
                    <input id="newPasswordConfirm" type="password" placeholder="Confirm Password" onkeypress="return register(event)" autocomplete="off" />
                </div>
                <div id="registerErrorDiv" class="errorDiv">&nbsp;</div>
                <div id="registerLoginButton" class="submitButton" onclick="return showLogin(event)">
                    <label>LOGIN</label>
                </div>
                <div id="registerSubmitButton" class="submitButton" onclick="return register(event)">
                    <label>SUBMIT</label>
                </div>
            </div>
            <div id="fpLightbox" class="lightboxContainer">
                <label>FORGOT PASSWORD</label>
                <div id="fpUsernameDiv" class="inputDiv">
                    <input id="fpUsername" type="text" placeholder="Username" onkeypress="return forgotPassword(event)" autocomplete="off" />
                </div>
                <div id="fpEmailDiv" class="inputDiv">
                    <input id="fpEmail" type="text" placeholder="Email Address" onkeypress="return forgotPassword(event)" autocomplete="off" />
                </div>
                <div id="fpErrorDiv" class="errorDiv">&nbsp;</div>
                <div id="fpLoginButton" class="submitButton" onclick="return showLogin(event)">
                    <label>LOGIN</label>
                </div>
                <div id="fpSubmitButton" class="submitButton" onclick="return forgotPassword(event)">
                    <label>SUBMIT</label>
                </div>
            </div>
            <div id="contactLightBox" class="lightboxContainer">
                <p>If you have any problems with the site or game please send an email to: <br /><br /><a href="mailto:urtkpeters@gmail.com">kpeters@jaggedpeak.com</a></p>
            </div>
        </div>
        <script>
            var blnLoggedIn = <?php echo $blnLoggedInDB ? 'true' : 'false'; ?>;

            $('#loginDiv').click(function()
            {
                if(blnLoggedIn)
                {
                    logout();
                }
                else
                {
                    $.fancybox.open({src: '#loginLightbox'});
                    $('.fancybox-slide').click(function(){$.fancybox.close();});
                    $('#loginLightbox').click(function(event){event.stopPropagation();})
                }
            });

            $('#contactButton').click(function()
            {
                $.fancybox.open({src: '#contactLightBox'});
                $('.fancybox-slide').click(function(){$.fancybox.close();});
                $('#contactLightBox').click(function(event){event.stopPropagation();})
            });
        </script>
        <div id="footer" class="footer">
            All assets were created and written by Kurt Peters for Odinary. For any inquiries please feel free to <a href="mailto:urtkpeters@gmail.com">contact me</a>.
        </div>
    </body>
</html>