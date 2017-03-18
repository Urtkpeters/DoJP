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
    objGame.nextLevel = 0;
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
                        $('#registerErrorDiv').text(responseData.strMessage);
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
                    if (responseData.blnSuccess == false)
                    {
                        $('#registerErrorDiv').text(responseData.strMessage);
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
        objGame.nextLevel += 1;

        //levelManager.js
        objLevel = buildLevel();
        objInput = objLevel.player;

        objGame.gameState = 'level';

        window.requestAnimationFrame(levelLoop);
    }
    else if(objGame.gameState == 'newGame')
    {
        //levelManager.js
        objLevel = buildLevel();
        objPlayer.newGame();
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

        //levelManager.js
        calculateCollisions();

        //levelManager.js
        levelTick();

        window.requestAnimationFrame(levelLoop);
    }
    else if(objGame.gameState == 'buildMenu')
    {
        window.requestAnimationFrame(menuLoop);
    }
}