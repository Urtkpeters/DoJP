var objInterface = {};

function buildInterface()
{
    objInterface.aspectWidth = 800;
    objInterface.aspectHeight = 600;
    objInterface.browser = '';
    objInterface.allowFullscreen = false;
    objInterface.screenIcon = '';
    objInterface.mousePos = {x: 0, y: 0};
    objInterface.inputSleeping = false;

    objInterface.setInputSleeping = function(length)
    {
        var sleepLength = parseInt(length);

        if(isNaN(sleepLength))
        {
            sleepLength = 200;
        }

        objInterface.inputSleeping = true;
        setTimeout(function(){ objInterface.inputSleeping = false }, sleepLength);
    };

    objInterface.gameFullscreen = function()
    {
        if(objInterface.screenIcon.FileName == 'fullScreen')
        {
            if(objInterface.browser == 'general')
            {
                document.getElementById('gameCanvas').requestFullscreen();
            }
            else if(objInterface.browser == 'chrome')
            {
                document.getElementById('gameDiv').webkitRequestFullscreen();
                $('#gameDiv').addClass('gameDivChromeFullscreen');
                $('#gameCanvas').addClass('gameCanvasChromeFullscreen');
            }
            else if(objInterface.browser == 'firefox')
            {
                document.getElementById('gameCanvas').mozRequestFullScreen();
            }
            else if(objInterface.browser == 'ie')
            {
                document.getElementById('gameCanvas').msRequestFullscreen();
            }
        }
        else
        {
            if(objInterface.browser == 'general')
            {
                document.exitFullscreen();
            }
            else if(objInterface.browser == 'chrome')
            {
                document.webkitExitFullscreen();
                $('#gameDiv').removeClass('gameDivChromeFullscreen');
                $('#gameCanvas').removeClass('gameCanvasChromeFullscreen');
            }
            else if(objInterface.browser == 'firefox')
            {
                document.mozCancelFullScreen();
            }
            else if(objInterface.browser == 'ie')
            {
                document.msExitFullscreen();
            }
        }
    }
}

function buildCanvas()
{
    objCanvas.canvas = document.getElementById('gameCanvas');
    objCanvas.canvas.width = objInterface.aspectWidth;
    objCanvas.canvas.height = objInterface.aspectHeight;
    objCanvas.context = objCanvas.canvas.getContext('2d');

    objCanvas.clear = function()
    {
        objCanvas.context.clearRect(0, 0, objCanvas.canvas.width, objCanvas.canvas.height);
    };
}

function renderFullscreenButton()
{
    if(objInterface.allowFullscreen)
    {
        objCanvas.context.globalAlpha = 0.4;

        if (calculateMousePos())
        {
            objCanvas.context.globalAlpha = 1;
        }

        objCanvas.context.drawImage
        (
            objInterface.screenIcon.objImage,
            0,
            0,
            35,
            35,
            755,
            555,
            35,
            35
        );

        objCanvas.context.globalAlpha = 1;
    }
}

function changeFullScreenIcon(browser)
{
    if(objInterface.screenIcon.FileName == 'fullScreen')
    {
        objInterface.screenIcon = objUILibrary.exitFullScreen;
    }
    else
    {
        objInterface.screenIcon = objUILibrary.fullScreen;
        if(browser == 'chrome')
        {
            $('#gameDiv').removeClass('gameDivChromeFullscreen');
            $('#gameCanvas').removeClass('gameCanvasChromeFullscreen');
        }
    }
}