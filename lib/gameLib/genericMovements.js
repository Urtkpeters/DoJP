function straightLine(startPoint, endPoint, percent)
{
    var x = startPoint.x + ((endPoint.x - startPoint.x) * percent);
    var y = startPoint.y + ((endPoint.y - startPoint.y) * percent);

    return( {x:x, y:y} )
}

function swoop(startPoint,controlPoint,endPoint, percent)
{
    var x = Math.pow(1-percent,2) * startPoint.x + 2 * (1-percent) * percent * controlPoint.x + Math.pow(percent,2) * endPoint.x;
    var y = Math.pow(1-percent,2) * startPoint.y + 2 * (1-percent) * percent * controlPoint.y + Math.pow(percent,2) * endPoint.y;

    return( {x:x,y:y} );
}

function checkCollision(objOne, objTwo)
{
    var blnCollision = false;

    var objOnePos = objOne.getPos();
    var objTwoPos = objTwo.getPos();

    if(objTwo.assetName == 'tombstoneBug')
    {
        objTwoPos = objTwo.getTombstoneHitBox();
    }

    if(objOne.assetName == 'explosion')
    {
        if(objOne.explosionTracker <= 10)
        {
            objOnePos[0] += 135;
            objOnePos[1] += 135;
            objOnePos[2] -= 135;
            objOnePos[3] -= 135;
        }
        else if(objOne.explosionTracker > 10 && objOne.explosionTracker <= 20)
        {
            objOnePos[0] += 105;
            objOnePos[1] += 105;
            objOnePos[2] -= 105;
            objOnePos[3] -= 105;
        }
        else if(objOne.explosionTracker > 20 && objOne.explosionTracker <= 30)
        {
            objOnePos[0] += 60;
            objOnePos[1] += 60;
            objOnePos[2] -= 60;
            objOnePos[3] -= 60;
        }
    }

    if(objOnePos[1] >= objTwoPos[1] && objOnePos[1] <= objTwoPos[3] && objOnePos[0] >= objTwoPos[0] && objOnePos[0] <= objTwoPos[2])
    {
        blnCollision = true;
    }
    else if(objOnePos[2] >= objTwoPos[0] && objOnePos[2] <= objTwoPos[2] && objOnePos[1] >= objTwoPos[1] && objOnePos[1] <= objTwoPos[3])
    {
        blnCollision = true;
    }
    else if(objOnePos[2] >= objTwoPos[0] && objOnePos[2] <= objTwoPos[2] && objOnePos[3] >= objTwoPos[1] && objOnePos[3] <= objTwoPos[3])
    {
        blnCollision = true;
    }
    else if(objOnePos[0] >= objTwoPos[0] && objOnePos[0] <= objTwoPos[2] && objOnePos[3] >= objTwoPos[1] && objOnePos[3] <= objTwoPos[3])
    {
        blnCollision = true;
    }
    else if(objTwoPos[1] >= objOnePos[1] && objTwoPos[1] <= objOnePos[3] && objTwoPos[0] >= objOnePos[0] && objTwoPos[0] <= objOnePos[2])
    {
        blnCollision = true;
    }
    else if(objTwoPos[2] >= objOnePos[0] && objTwoPos[2] <= objOnePos[2] && objTwoPos[1] >= objOnePos[1] && objTwoPos[1] <= objOnePos[3])
    {
        blnCollision = true;
    }
    else if(objTwoPos[2] >= objOnePos[0] && objTwoPos[2] <= objOnePos[2] && objTwoPos[3] >= objOnePos[1] && objTwoPos[3] <= objOnePos[3])
    {
        blnCollision = true;
    }
    else if(objTwoPos[0] >= objOnePos[0] && objTwoPos[0] <= objOnePos[2] && objTwoPos[3] >= objOnePos[1] && objTwoPos[3] <= objOnePos[3])
    {
        blnCollision = true;
    }

    return blnCollision;
}