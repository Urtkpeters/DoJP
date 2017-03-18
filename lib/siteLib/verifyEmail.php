<?php
    require 'loginHandler.php';

    $blnVerified = $clsLoginHandler->verifyEmail();
?>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="main.css">
    </head>
    <body>
        <div id="messages" class="messages">
            <?php
                if($blnVerified)
                {
                    echo '<label>Email has been verified.</label>';
                }
                else
                {
                    echo '<label>Email was not successfully verified.</label>';
                }
            ?>
        </div>
    </body>
</html>
