<?php
    require 'databaseHandler.php';

    $intSessionId = $_COOKIE["SCfDoJP"];
    $strUsername = '';
    $strEmailAddress = '';
    $strScore = '';
    $strLevel = '';

    $qryGetUserInfo =
    "
        select usr.username,
          usr.emailAddress,
          lb.Score,
          lh.levelNumber
        from Sessions ses
          join Users usr on usr.UserId = ses.UserId
          join Leaderboard lb on lb.UserId = ses.UserId
          join levelHeader lh on lh.levelHeaderId = lb.levelHeaderId
        where ses.sessionId = " . $intSessionId . "
        order by lb.Score desc
        limit 1
    ";

    foreach($db->query($qryGetUserInfo) as $row)
    {
        $strUsername = $row['username'];
        $strEmailAddress = $row['emailAddress'];
        $strScore = $row['Score'];
        $strLevel = $row['levelNumber'];
    }
?>
<div class="accountShell">
    <div class="accountTitle">Account</div>
    <div class="accountInfo">
        <div class="sectionTitle">
            <label>Account Info</label>
        </div>
        <div class="fieldShell">
            <div class="accountLabel">
                <label>Username:</label>
            </div>
            <div class="accountInput">
                <?php
                    echo '<input id="usernameChange" type="text" value="' . $strUsername . '" onkeypress="return usernameChange(event)" />';
                ?>
            </div>
            <div id="usernameSubmit" class="changeButton" onclick="return usernameChange(event)">Change</div>
        </div>
        <div class="fieldShell">
            <div class="accountLabel">
                <label>Email Address:</label>
            </div>
            <div class="accountInput">
                <?php
                    echo '<input id="emailChange" type="text" value="' . $strEmailAddress . '" onkeypress="return emailChange(event)" />';
                ?>
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
        <div class="sectionTitle">
            <label>Game Info</label>
        </div>
        <div class="gameInfoLabel">
            <?php
                echo '<label>Highest Level: ' . $strLevel . '</label>'
            ?>
        </div>
        <div class="gameInfoLabel">
            <?php
                echo '<label>Highest Score: ' . $strScore . '</label>'
            ?>
        </div>
    </div>
    <div class="settingsInfo">
        <div class="sectionTitle">
            <label>Setting Info</label>
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
        <script>
            $(document).ready(function()
            {
                <?php
                    $arySettings = array();
                    $strEnableMusic = 'false';
                    $strEnableSound = 'false';

                    $qryGetSettingValues =
                        "
                            select SettingCode,
                                SettingValue
                            from Sessions ses
                                join Settings sts on sts.UserId = ses.UserId
                            where ses.sessionId = 
                        " . $intSessionId;

                    foreach($db->query($qryGetSettingValues) as $row)
                    {
                        $arySettings[$row['SettingCode']] = $row['SettingValue'];
                    }

                    if($arySettings['EnableMusic'] == 1)
                    {
                        $strEnableMusic = 'true';
                    }

                    if($arySettings['EnableSound'] == 1)
                    {
                        $strEnableSound = 'true';
                    }

                    echo "$('#enableMusic').attr('checked', " . $strEnableMusic . ");";
                    echo "$('#enableSound').attr('checked', " . $strEnableSound . ");";
                ?>
            });

            function usernameChange(event)
            {
                if(event.type == 'click' || event.type == 'keypress' && event.keyCode == 13)
                {

                    changeAccountValue('username', $('#usernameChange').val());
                }
            }

            function emailChange(event)
            {
                if(event.type == 'click' || event.type == 'keypress' && event.keyCode == 13)
                {

                    changeAccountValue('emailAddress', $('#emailChange').val());
                }
            }

            function passwordChange(event)
            {
                if(event.type == 'click' || event.type == 'keypress' && event.keyCode == 13)
                {
                    var newPassword = $('#passwordChange').val();
                    var passwordConfirmChange = $('#passwordConfirmChange').val();

                    if(newPassword == passwordConfirmChange)
                    {
                        $('#passwordError').addClass('noDisplay');

                        changeAccountValue('password', newPassword);
                    }
                    else
                    {
                        $('#passwordError').removeClass('noDisplay');
                    }
                }
            }

            function changeAccountValue(accountCode, accountValue)
            {
                var sessionId = parseInt(document.cookie.split('=')[1]);

                if(typeof(sessionId) !== 'undefined' && sessionId > 0)
                {
                    $.ajax
                    ({
                        url: '/lib/siteLib/ajaxHandler.php?request=setAccountValue&sessionId=' + sessionId + '&accountCode=' + accountCode + '&accountValue=' + accountValue,
                        cache: false,
                        dataType: 'json',
                        success: function (responseData)
                        {
                            if(responseData.blnSuccess)
                            {
                                $('#messages').html('<label>' + responseData.strMessage + '</label>');
                                setTimeout(function(){$('#messages').fadeOut(2000, function(){var objMessagesDiv = $('#messages'); objMessagesDiv.text(''); objMessagesDiv.fadeIn(0)});}, 8000);
                            }
                        }
                    });
                }
            }

            $('#enableMusic').click(function()
            {
                changeSettingValue('enableMusic', $('#enableMusic').prop('checked'));
            });

            $('#enableSound').click(function()
            {
                changeSettingValue('enableSound', $('#enableSound').prop('checked'));
            });

            function changeSettingValue(settingCode, settingValue)
            {
                var sessionId = parseInt(document.cookie.split('=')[1]);

                if(typeof(sessionId) !== 'undefined' && sessionId > 0)
                {
                    $.ajax
                    ({
                        url: '/lib/siteLib/ajaxHandler.php?request=setSettingValue&sessionId=' + sessionId + '&settingCode=' + settingCode + '&settingValue=' + settingValue,
                        cache: false,
                        dataType: 'json',
                        success: function (responseData)
                        {
                            if(responseData.blnSuccess)
                            {
                                $('#messages').html('<label>' + responseData.strMessage + '</label>');
                                setTimeout(function(){$('#messages').fadeOut(2000, function(){var objMessagesDiv = $('#messages'); objMessagesDiv.text(''); objMessagesDiv.fadeIn(0)});}, 8000);
                            }
                        }
                    });
                }
            }
        </script>
    </div>
</div>
