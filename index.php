<?php
    require 'lib/siteLib/loginHandler.php';

    $blnLoggedInDB = $clsLoginHandler->checkSession();

    $strRequestTarget = '';
    $strPage = '';

    if(isset($_GET['requestTarget']))
    {
        $strRequestTarget = $_GET['requestTarget'];
    }

    if($strRequestTarget == 'dojp')
    {
        $strPage = 'lib/siteLib/DoJP.php';
    }
    else if($strRequestTarget == 'leaderboard')
    {
        $strPage = 'lib/siteLib/leaderboard.php';
    }
    else if($strRequestTarget == 'account' && $blnLoggedInDB)
    {
        $strPage = 'lib/siteLib/account.php';
    }
    else
    {
        $strRequestTarget = 'home';
        $strPage = 'lib/siteLib/home.php';
    }
?>
<html>
    <head>
        <meta charset="UTF-8">
        <script src="lib/extLib/jquery.min.js"></script>
        <link rel="stylesheet" href="lib/siteLib/main.css" />
        <?php
            if($strRequestTarget == 'dojp')
            {
                echo '<script data-main="lib/siteLib/config.js" src="lib/extLib/require.js"></script>';
            }

            echo '<link rel="stylesheet" href="lib/siteLib/'.$strRequestTarget.'.css" />';
        ?>
        <link rel="stylesheet" href="lib/siteLib/main.css" />
        <script src="lib/extLib/jquery.fancybox.min.js"></script>
        <link rel="stylesheet" href="lib/extLib/jquery.fancybox.min.css" />
        <script src="lib/siteLib/loginFunctionality.js"></script>
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
            </div>
            <div class="mainNavigation">
                <a href="/dojp"><div id="gameNav" class="navLink"><p>DoJP</p></div></a>
                <a href="/leaderboard"><div id="leaderboardNav" class="navLink"><p>Leaderboard</p></div></a>
            </div>
        </div>
        <div id="messages" class="messages"></div>
        <div id="pageContents" class="pageContents">
            <?php
                require $strPage;
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
                </div>
                <div id="loginErrorDiv" class="errorDiv"></div>
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
                <div id="registerErrorDiv" class="errorDiv"></div>
                <div id="registerLoginButton" class="submitButton" onclick="return showLogin(event)">
                    <label>LOGIN</label>
                </div>
                <div id="registerSubmitButton" class="submitButton" onclick="return register(event)">
                    <label>SUBMIT</label>
                </div>
            </div>
            <div id="contactLightBox" class="lightboxContainer">
                <p>If you have any problems with the site or game please send an email to: <br /><br /><a href="mailto:kpeters@jaggedpeak.com">kpeters@jaggedpeak.com</a></p>
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
    </body>
</html>