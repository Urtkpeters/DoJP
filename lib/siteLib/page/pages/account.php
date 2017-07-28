<?php
    require_once 'lib/siteLib/event/loginHandler.php';
    require_once 'lib/siteLib/event/gameHandler.php';

    $accountInfo = $clsLoginHandler->getAccountInfo();

    $strUsername = '';
    $strEmailAddress = '';
    $strScore = '';
    $strLevel = '';

    foreach($accountInfo as $row)
    {
        $strUsername = $row['username'];
        $strEmailAddress = $row['emailAddress'];
        $strScore = $row['Score'];
        $strLevel = $row['levelNumber'];
    }

    $sessionId = $_COOKIE["SCfDoL"];
    $settingValues = $clsGameHandler->getSettingValues($sessionId);

    $enableMusic = $settingValues['EnableMusic'] ? 'true' : 'false';
    $enableSound = $settingValues['EnableSound'] ? 'true' : 'false';
?>
<div class="accountShell">
    <div class="accountTitle">Account</div>
    <div class="accountInfo">
        <div class="sectionTitle">
            <label>Account Info</label>
        </div>
        <div id="accountInfoFeedback" class="accountInfoFeedback">
            &nbsp;
        </div>
        <div class="fieldShell">
            <div class="accountLabel">
                <label>Username:</label>
            </div>
            <div class="accountInput">
                <input id="usernameChange" type="text" value="<?=$strUsername?>" onkeypress="return usernameChange(event)" />
            </div>
            <div id="usernameSubmit" class="changeButton" onclick="return usernameChange(event)">Change</div>
        </div>
        <div class="fieldShell">
            <div class="accountLabel">
                <label>Email Address:</label>
            </div>
            <div class="accountInput">
                <input id="emailChange" type="text" value="<?=$strEmailAddress?>" onkeypress="return emailChange(event)" />
            </div>
            <div id="emailSubmit" class="changeButton" onclick="return emailChange(event)">Change</div>
        </div>
        <div class="fieldShell">
            <div class="accountLabel">
                <label>Password:</label>
            </div>
            <div class="accountInput">
                <input id="passwordChange" type="password" value="123456789101112" onkeypress="return passwordChange(event)" />
            </div>
        </div>
        <div class="fieldShell">
            <div class="accountLabel">
                <label>Confirm Password:</label>
            </div>
            <div class="accountInput">
                <input id="passwordConfirmChange" type="password" value="121110987654321" onkeypress="return passwordChange(event)" />
            </div>
            <div id="passwordSubmit" class="changeButton" onclick="return passwordChange(event)">Change</div>
        </div>
        <div class="fieldShell">
            <div id="passwordError" class="errorLabel noDisplay">
                <label>Password values do not match.</label>
            </div>
        </div>
    </div>
    <div class="gameInfo">
        <div class="gameInfoSectionTitle">
            <label>Game Info</label>
        </div>
        <div class="gameInfoLabel">
            <label>Highest Level: <?=$strLevel?></label>
        </div>
        <div class="gameInfoLabel">
            <label>Highest Score: <?=$strScore?></label>
        </div>
    </div>
    <div class="settingsInfo">
        <div class="sectionTitle">
            <label>Setting Info</label>
        </div>
        <div id="settingFeedback" class="settingFeedback">
            &nbsp;
        </div>
        <div class="setting">
            <div class="settingLabel">
                <label>Enable Music: </label>
            </div>
            <div class="settingInput">
                <input id="enableMusic" type="checkbox" checked="checked" />
            </div>
        </div>
        <div class="setting">
            <div class="settingLabel">
                <label>Enable Sound: </label>
            </div>
            <div class="settingInput">
                <input id="enableSound" type="checkbox" checked="checked" />
            </div>
        </div>
    </div>
    <script>
        $(document).ready(function()
        {
            $('#enableMusic').attr('checked', <?=$enableMusic?>);
            $('#enableSound').attr('checked', <?=$enableSound?>);
        });
    </script>
    <script src="js/accountChanges.js"></script>
</div>
