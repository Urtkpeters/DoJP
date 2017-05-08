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

function keyListener()
{
    if(objGame.inputSleeping == false)
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

        if(objKeysState[32] && $.isFunction(objInput.pressedSpace))
        {
            objInput.pressedSpace();
        }

        if(objKeysState[71] && $.isFunction(objInput.pressedG))
        {
            objInput.pressedG();
        }
    }
}