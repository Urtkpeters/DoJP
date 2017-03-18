<?php
    require 'lib/siteLib/loginHandler.php';

    $blnLoggedInDB = $clsLoginHandler->checkSession();
?>
<html>
    <head>
        <meta charset="UTF-8">
        <script src="lib/extLib/jquery.min.js"></script>
        <script data-main="lib/siteLib/config.js" src="lib/extLib/require.js"></script>
        <script src="lib/extLib/jquery.fancybox.min.js"></script>
        <link rel="stylesheet" href="lib/extLib/jquery.fancybox.min.css" />
        <link rel="stylesheet" href="lib/siteLib/main.css" />
        <script src="lib/siteLib/loginFunctionality.js"></script>
    </head>
    <body>
        <div id="navigationDiv" class="navigationDiv">
            <div id="messages" class="messages"></div>
            <div id="loginDiv" class="loginDiv">
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
        <div id="gameDiv" class="gameDiv">
            <canvas id="gameCanvas" class="gameCanvas"></canvas>
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
                }
            });
        </script>
    </body>
</html>