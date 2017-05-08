function checkLogin()
{
    objGame.loggedIn = blnLoggedIn;

    if(objGame.loggedIn)
    {
        var sessionId = parseInt(document.cookie.split('=')[1]);

        if(typeof(sessionId) !== 'undefined' && sessionId > 0)
        {
            $.ajax
            ({
                url: '/lib/siteLib/ajaxHandler.php?request=getSettingValues&sessionId=' + sessionId,
                cache: false,
                dataType: 'json',
                success: function (responseData)
                {
                    if (responseData.blnSuccess == true)
                    {
                        objGame.enableMusic = (responseData.EnableMusic == '1');
                        objGame.enableSound = (responseData.EnableSound == '1');

                        if(objGame.gameState == 'menu')
                        {
                            if(!objGame.enableMusic)
                            {
                                objMenu.objMusic.stop();
                            }
                        }
                        else if(objGame.gameState == 'level')
                        {
                            if(!objGame.enableMusic)
                            {
                                objLevel.objMusic.stop();
                            }
                        }
                    }
                    else
                    {
                        $('#messages').html('<label>' + responseData.strMessage + '</label>');
                        setTimeout(function(){$('#messages').fadeOut(2000, function(){var objMessagesDiv = $('#messages'); objMessagesDiv.text(''); objMessagesDiv.fadeIn(0)});}, 8000);
                    }
                }
            });
        }
    }
}

function updateSettingData(settingCode, settingValue)
{
    if(objGame.loggedIn)
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
                    if(!responseData.blnSuccess)
                    {
                        $('#messages').html('<label>' + responseData.strMessage + '</label>');
                        setTimeout(function(){$('#messages').fadeOut(2000, function(){var objMessagesDiv = $('#messages'); objMessagesDiv.text(''); objMessagesDiv.fadeIn(0)});}, 8000);
                    }
                }
            });
        }
    }
}

function submitScore()
{
    var sessionId = 0;
    objGame.loggedIn = blnLoggedIn;

    if(objGame.loggedIn)
    {
        sessionId = parseInt(document.cookie.split('=')[1]);
    }

    $.ajax
    ({
        url: '/lib/siteLib/ajaxHandler.php?request=submitScore&sessionId=' + sessionId + '&score=' + objPlayer.score + '&level=' + objPlayer.nextLevel,
        cache: false,
        dataType: 'json',
        success: function (responseData)
        {
            if (!responseData.blnSuccess == true)
            {
                $('#messages').html('<label>' + responseData.strMessage + '</label>');
                setTimeout(function(){$('#messages').fadeOut(2000, function(){var objMessagesDiv = $('#messages'); objMessagesDiv.text(''); objMessagesDiv.fadeIn(0)});}, 8000);
            }
        }
    });
}

function saveGame()
{
    var sessionId = 0;
    objGame.loggedIn = blnLoggedIn;

    if(objGame.loggedIn)
    {
        sessionId = parseInt(document.cookie.split('=')[1]);

        if(typeof(sessionId) !== 'undefined' && sessionId > 0)
        {
            $.ajax
            ({
                url: '/lib/siteLib/ajaxHandler.php?request=saveGame&sessionId=' + sessionId + '&level=' + objPlayer.nextLevel + '&earnings=' + objPlayer.earnings + '&score=' + objPlayer.score + '&pto=' + objPlayer.pto + '&windate=' + objPlayer.windate + '&nespresso=' + objPlayer.nespresso + '&activeide=' + objPlayer.IDE.active + '&notepad=' + objPlayer.IDE.notepad.level + '&notepadplusplus=' + objPlayer.IDE.notepadplusplus.level + '&far=' + objPlayer.IDE.far.level + '&eclipse=' + objPlayer.IDE.eclipse.level + '&dreamweaver=' + objPlayer.IDE.dreamweaver.level + '&mulestudio=' + objPlayer.IDE.muleStudio.level + '&intelliJ=' + objPlayer.IDE.intelliJ.level + '&netbeans=' + objPlayer.IDE.netbeans.level,
                cache: false,
                dataType: 'json',
                success: function (responseData)
                {
                    $('#messages').html('<label>' + responseData.strMessage + '</label>');
                    setTimeout(function(){$('#messages').fadeOut(2000, function(){var objMessagesDiv = $('#messages'); objMessagesDiv.text(''); objMessagesDiv.fadeIn(0)});}, 8000);

                    if (responseData.blnSuccess == true)
                    {

                    }
                }
            });
        }
    }
}

function loadGame()
{
    var sessionId = 0;
    objGame.loggedIn = blnLoggedIn;

    if(objGame.loggedIn)
    {
        sessionId = parseInt(document.cookie.split('=')[1]);

        if(typeof(sessionId) !== 'undefined' && sessionId > 0)
        {
            $.ajax
            ({
                url: '/lib/siteLib/ajaxHandler.php?request=loadGame&sessionId=' + sessionId,
                cache: false,
                dataType: 'json',
                success: function (responseData)
                {
                    $('#messages').html('<label>' + responseData.strMessage + '</label>');
                    setTimeout(function(){$('#messages').fadeOut(2000, function(){var objMessagesDiv = $('#messages'); objMessagesDiv.text(''); objMessagesDiv.fadeIn(0)});}, 8000);

                    if (responseData.blnSuccess == true)
                    {
                        objPlayer.newGame();

                        objPlayer.nextLevel = parseInt(responseData.level);
                        objPlayer.earnings = parseInt(responseData.earnings);
                        objPlayer.score = parseInt(responseData.score);
                        objPlayer.pto = parseInt(responseData.pto);
                        objPlayer.windate = parseInt(responseData.windate);
                        objPlayer.nespresso = parseInt(responseData.nespresso);
                        objPlayer.IDE.active = responseData.activeIDE;
                        objPlayer.IDE.notepad.level = parseInt(responseData.notepad);
                        objPlayer.IDE.notepadplusplus.level = parseInt(responseData.notepadPlusPlus);
                        objPlayer.IDE.far.level = parseInt(responseData.far);
                        objPlayer.IDE.eclipse.level = parseInt(responseData.eclipse);
                        objPlayer.IDE.dreamweaver.level = parseInt(responseData.dreamweaver);
                        objPlayer.IDE.muleStudio.level = parseInt(responseData.muleStudio);
                        objPlayer.IDE.intelliJ.level = parseInt(responseData.intelliJ);
                        objPlayer.IDE.netbeans.level = parseInt(responseData.netbeans);

                        objPlayer.explosionDamage = 20 + (2 * objPlayer.windate);

                        $.each(objPlayer.IDE, function()
                        {
                            if(typeof(this) == 'object' && this.level > 1)
                            {
                                this.damage += (this.damageLevel * (this.level - 1));
                                this.cooldown -= (this.cooldownLevel * (this.level - 1));
                                this.speed += (this.speedLevel * (this.level - 1));
                            }
                        });

                        objGame.gameState = 'buildMenu';
                        objGame.menuState = 'shop';

                        objMenu.objMusic.stop();
                    }
                }
            });

            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}