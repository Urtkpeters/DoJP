<?php
    require_once 'lib/siteLib/event/loginHandler.php';

    $blnVerified = $clsLoginHandler->verifyEmail();
?>
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