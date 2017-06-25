var objGame = {};
var objCanvas = {};

//This is the game initializer.
function initializeGame()
{
    buildGame();
    buildInterface();
    buildCanvas();
    buildPositions();
    initMouseListeners();
    initAssetLoader();
    loadingLoop();
}

function buildGame()
{
    objGame.gameState = 'start';
    objGame.menuState = 'splash';
    objGame.returnMenu = 'title';
    objGame.loggedIn = blnLoggedIn;
    objGame.hasSavedGame = false;
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

    renderFullscreenButton();
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

    renderFullscreenButton();
}