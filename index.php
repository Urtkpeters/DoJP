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
            <div id="logoDiv" class="logoDiv">
                <img src="media/site/logo2.png" />
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
                <div id="gameNav" class="navLink"><p>DoJP</p></div>
                <div id="leaderboardNav" class="navLink"><p>Leaderboard</p></div>
            </div>
        </div>
        <div id="messages" class="messages"></div>
        <div id="gameDiv" class="gameDiv">
            <canvas id="gameCanvas" class="gameCanvas"></canvas>
        </div>
        <div id="madeDiv" class="madeDiv">
            <label>Curious how it was made? Click here to find out.</label>
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
            <div id="madeLightbox" class="madeLightbox">
                <p>This game was written entirely in Javascript and HTML5 Canvas. The artwork was all created on a web based application called Piskel and the sound effects were all gathered off of FreeSound.</p>
                <p class="imgP"><a href="http://www.piskel.com/"><img src="media/site/PiskelLogo.png" /></a></p>
                <p class="imgP"><a href="http://www.freesound.org/"><img src="media/site/FreeSoundLogo.png" /></a></p>
                <p>To see a blow-by-blow on how this project was created please see my GitHub link below.</p>
                <p class="imgP"><a href="https://github.com/Urtkpeters/DoJP/"><img src="media/site/GitHubLogo2.png" /></a></p>
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

            $('#madeDiv').click(function()
            {
                $.fancybox.open({src: '#madeLightbox'});
                $('.fancybox-slide').click(function(){$.fancybox.close();});
                $('#madeLightbox').click(function(event){event.stopPropagation();})
            });
        </script>
    </body>
</html>