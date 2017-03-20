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

function keyListener()
{
    if(objGame.inputSleeping == false)
    {
        if(objKeysState[87])
        {
            objInput.pressedW();
        }

        if(objKeysState[83])
        {
            objInput.pressedS();
        }

        if(objKeysState[65])
        {
            objInput.pressedA();
        }

        if(objKeysState[68])
        {
            objInput.pressedD();
        }

        if(objKeysState[74])
        {
            objInput.pressedJ();
        }

        if(objKeysState[75])
        {
            objInput.pressedK();
        }

        if(objKeysState[32])
        {
            objInput.pressedSpace();
        }

        if(objKeysState[71])
        {
            objInput.pressedG();
        }
    }
}