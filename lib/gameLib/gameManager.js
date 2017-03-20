var objGame = {};
var objCanvas = {};

//This is the game initializer.
function initializeGame()
{
    buildGame();
    buildCanvas();
    buildPositions();
    initAssetLoader();
    loadingLoop();
}

function buildGame()
{
    objGame.gameState = 'start';
    objGame.menuState = 'splash';
    objGame.loggedIn = blnLoggedIn;
    objGame.inputSleeping = false;
    objGame.gamePaused = false;
    objGame.gamePausedSleeping = false;
    objGame.enableMusic = true;
    objGame.enableSound = true;

    objGame.setGameState = function(strGameState)
    {
        objGame.gameState = strGameState;
    };

    objGame.setMenuState = function(strMenuState)
    {
        objGame.menuState = strMenuState;
    };

    objGame.setInputSleeping = function(length)
    {
        var sleepLength = parseInt(length);

        if(isNaN(sleepLength))
        {
            sleepLength = 200;
        }

        objGame.inputSleeping = true;
        setTimeout(function(){ objGame.inputSleeping = false }, sleepLength);
    };

    objGame.setGamePaused = function()
    {
        if(objGame.gamePausedSleeping == false)
        {
            if(objGame.gamePaused == false)
            {
                objGame.gamePaused = true;
            }
            else if(objGame.gamePaused == true)
            {
                objGame.gamePaused = false;
            }

            objGame.gamePausedSleeping = true;
            setTimeout(function(){ objGame.gamePausedSleeping = false }, 170);
        }

    };
}

function buildCanvas()
{
    objCanvas.canvas = document.getElementById('gameCanvas');
    objCanvas.canvas.width = 800;
    objCanvas.canvas.height = 600;
    objCanvas.context = objCanvas.canvas.getContext('2d');

    objCanvas.clear = function()
    {
        objCanvas.context.clearRect(0, 0, objCanvas.canvas.width, objCanvas.canvas.height);
    };
}

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
                    }
                }
            });
        }
    }
}

function loadingLoop()
{
    objCanvas.clear();

    if(objGame.gameState == 'start')
    {
        //assetLoader.js
        loadGameAssets();

        window.requestAnimationFrame(loadingLoop);
    }
    else
    {
        window.requestAnimationFrame(menuLoop);
    }
}

function menuLoop()
{
    objCanvas.clear();

    if(objGame.gameState == 'menu')
    {
        //inputManager.js
        keyListener();

        //menuManager.js
        renderMenu();

        window.requestAnimationFrame(menuLoop);
    }
    else if(objGame.gameState == 'buildMenu')
    {
        //menuManager.js
        objInput = buildMenu();

        window.requestAnimationFrame(menuLoop);
    }
    else if(objGame.gameState == 'nextLevel')
    {
        objPlayer.nextLevel += 1;

        //levelManager.js
        objLevel = buildLevel();
        objInput = objLevel.player;

        objGame.gameState = 'level';

        window.requestAnimationFrame(levelLoop);
    }
    else if(objGame.gameState == 'newGame')
    {
        //levelManager.js
        objPlayer.newGame();
        objLevel = buildLevel();
        objInput = objLevel.player;

        objGame.gameState = 'level';

        window.requestAnimationFrame(levelLoop);
    }
}

function levelLoop()
{
    objCanvas.clear();

    if(objGame.gameState == 'level')
    {
        //inputManager.js
        keyListener();

        //levelManager.js
        renderLevel();

        if(!objGame.gamePaused)
        {
            //levelManager.js
            calculateCollisions();

            //levelManager.js
            levelTick();
        }

        window.requestAnimationFrame(levelLoop);
    }
    else if(objGame.gameState == 'buildMenu')
    {
        window.requestAnimationFrame(menuLoop);
    }
}