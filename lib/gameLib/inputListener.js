var objKeysState = {};
var objInput = {};

window.addEventListener('keydown', function(event)
{
    objKeysState[event.keyCode || event.which] = true;
},true);

window.addEventListener('keyup', function(event)
{
    objKeysState[event.keyCode || event.which] = false;
},true);

window.onkeydown = function(e)
{
    if (e.keyCode == 32 && e.target == document.body)
    {
        e.preventDefault();
    }
};

document.addEventListener("webkitfullscreenchange", function()
{
    changeFullScreenIcon('chrome');
});

document.addEventListener("mozfullscreenchange", function()
{
    changeFullScreenIcon('firefox');
});

document.addEventListener("MSFullscreenChange", function()
{
    changeFullScreenIcon('ie');
});

document.addEventListener("fullscreenchange", function()
{
    changeFullScreenIcon('general');
});

function keyListener()
{
    if(objInterface.inputSleeping == false)
    {
        if(objKeysState[87] && $.isFunction(objInput.pressedW))
        {
            objInput.pressedW();
        }

        if(objKeysState[83] && $.isFunction(objInput.pressedS))
        {
            objInput.pressedS();
        }

        if(objKeysState[65] && $.isFunction(objInput.pressedA))
        {
            objInput.pressedA();
        }

        if(objKeysState[68] && $.isFunction(objInput.pressedD))
        {
            objInput.pressedD();
        }

        if(objKeysState[74] && $.isFunction(objInput.pressedJ))
        {
            objInput.pressedJ();
        }

        if(objKeysState[75] && $.isFunction(objInput.pressedK))
        {
            objInput.pressedK();
        }

        if(objKeysState[76] && $.isFunction(objInput.pressedL))
        {
            objInput.pressedL();
        }

        if(objKeysState[32] && $.isFunction(objInput.pressedSpace))
        {
            objInput.pressedSpace();
        }

        if(objKeysState[71] && $.isFunction(objInput.pressedG))
        {
            objInput.pressedG();
        }

        if(objGame.gameState == 'menu' && objGame.menuState == 'title' && objKeysState[49] && objKeysState[221] && objKeysState[51] && objKeysState[77] && objKeysState[48])
        {
            objGame.showDemo = true;
        }

        if(objKeysState[80])
        {
            submitLevelStats();
        }
    }
}

function initMouseListeners()
{
    if(document.fullscreenEnabled)
    {
        objInterface.browser = 'general';
    }
    else if(document.webkitFullscreenEnabled)
    {
        objInterface.browser = 'chrome';
    }
    else if(document.mozFullScreenEnabled)
    {
        objInterface.browser = 'firefox';
    }
    else if(document.msFullscreenEnabled)
    {
        objInterface.browser = 'ie';
    }

    if(objInterface.browser != '')
    {
        objInterface.allowFullscreen = true;

        window.addEventListener('mousemove', function (event)
        {
            objInterface.mousePos = getMousePos(objCanvas.canvas, event);
        }, false);

        window.addEventListener('click', function ()
        {
            if(objInterface.screenIcon.FileName == 'fullScreen')
            {
                if (objInterface.mousePos.x > (objCanvas.canvas.clientWidth * .9375) && objInterface.mousePos.x < objCanvas.canvas.clientWidth && objInterface.mousePos.y > (objCanvas.canvas.clientHeight * .9177) && objInterface.mousePos.y < objCanvas.canvas.clientHeight)
                {
                    objInterface.gameFullscreen();
                }
            }
            else
            {
                if(calculateMousePos())
                {
                    objInterface.gameFullscreen();
                }
            }

        });
    }
}

function getMousePos(canvas, event)
{
    var canvasArea = canvas.getBoundingClientRect();

    return { x: event.clientX - canvasArea.left, y: event.clientY - canvasArea.top };
}

function calculateMousePos()
{
    var aspectWidth = objInterface.aspectWidth;
    var aspectHeight = objInterface.aspectHeight;
    var clientWidth = objCanvas.canvas.clientWidth;
    var clientHeight = objCanvas.canvas.clientHeight;

    if(objInterface.browser == 'chrome' && objInterface.screenIcon.FileName != 'fullScreen')
    {
        aspectWidth = $('#gameDiv').width();
        aspectHeight = $('#gameCanvas').height();
    }

    if((aspectHeight / clientHeight) > (aspectWidth / clientWidth))
    {
        aspectWidth = clientWidth - (clientWidth - (aspectWidth / (aspectHeight / clientHeight))) / 2;
        aspectHeight = clientHeight;
    }
    else if(objInterface.browser != 'chrome' && objInterface.screenIcon.FileName == 'fullScreen')
    {
        aspectWidth = clientWidth;
        aspectHeight = clientHeight - (clientHeight - (aspectHeight / (aspectWidth / clientWidth))) / 2;
    }

    if (objInterface.mousePos.x > (aspectWidth * .9375) && objInterface.mousePos.x < aspectWidth && objInterface.mousePos.y > (aspectHeight * .9177) && objInterface.mousePos.y < aspectHeight)
    {
        return true;
    }
}