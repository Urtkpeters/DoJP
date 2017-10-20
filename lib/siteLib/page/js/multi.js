var objCanvas = {},
    objKeysState = {},
    objPlayer = {},
    conn = new WebSocket('ws://localhost:8080');

conn.onopen = function(e)
{
    console.log("Connection established!");
};

conn.onmessage = function(e)
{
    console.log(e.data);
};

objCanvas.canvas = document.getElementById('gameCanvas');
objCanvas.context = objCanvas.canvas.getContext('2d');
objCanvas.clear = function()
{
    objCanvas.context.clearRect(0, 0, objCanvas.canvas.width, objCanvas.canvas.height);
};

window.addEventListener('keydown', function(event)
{
    objKeysState[event.keyCode || event.which] = true;
},true);

window.addEventListener('keyup', function(event)
{
    objKeysState[event.keyCode || event.which] = false;
},true);

objPlayer.coordX = 10;
objPlayer.coordY = 10;

objPlayer.pressedW = function()
{
    objPlayer.coordY -= 1;
    conn.send('Y-1');
    conn.
};

objPlayer.pressedA = function()
{
    objPlayer.coordX -= 1;
    conn.send('X-1');
};

objPlayer.pressedS = function()
{
    objPlayer.coordY += 1;
    conn.send('Y+1');
};

objPlayer.pressedD = function()
{
    objPlayer.coordX += 1;
    conn.send('Y+1');
};

function multiLoop()
{
    if(objKeysState[87])
    {
        objPlayer.pressedW();
    }

    if(objKeysState[83])
    {
        objPlayer.pressedS();
    }

    if(objKeysState[65])
    {
        objPlayer.pressedA();
    }

    if(objKeysState[68])
    {
        objPlayer.pressedD();
    }

    objCanvas.clear();

    objCanvas.context.fillStyle = '#000000';
    objCanvas.context.fillRect(0, 0, 800, 600);

    objCanvas.context.fillStyle = '#FFFFFF';
    objCanvas.context.fillRect(objPlayer.coordX, objPlayer.coordY, 10, 10);

    window.requestAnimationFrame(multiLoop);
}

multiLoop();