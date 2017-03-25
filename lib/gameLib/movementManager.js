var objPositions = {};

function buildMovement(whichMovement, speed)
{
    var objMovement = {};

    if(whichMovement == 'entityBullet')
    {
        objMovement = buildEntityBullet(speed);
    }
    else if(whichMovement == 'notepad0')
    {
        objMovement = buildNotepad0Movement(speed);
    }
    else if(whichMovement == 'notepadplusplus0')
    {
        objMovement = buildNotepadPlusPlus0Movement(speed);
    }
    else if(whichMovement == 'notepadplusplus1')
    {
        objMovement = buildNotepadPlusPlus1Movement(speed);
    }
    else if(whichMovement == 'far0')
    {
        objMovement = buildFar0Movement(speed);
    }
    else if(whichMovement == 'eclipse0')
    {
        objMovement = buildEclipse0Movement(speed);
    }
    else if(whichMovement == 'eclipse1')
    {
        objMovement = buildEclipse1Movement(speed);
    }
    else if(whichMovement == 'eclipse2')
    {
        objMovement = buildEclipse2Movement(speed);
    }
    else if(whichMovement == 'eclipse3')
    {
        objMovement = buildEclipse3Movement(speed);
    }
    else if(whichMovement == 'eclipse4')
    {
        objMovement = buildEclipse4Movement(speed);
    }
    else if(whichMovement == 'dreamweaver0')
    {
        objMovement = buildDreamweaver0Movement(speed);
    }
    else if(whichMovement == 'muleStudio0')
    {
        objMovement = buildMuleStudio0Movement(speed);
    }
    else if(whichMovement == 'intelliJ0')
    {
        objMovement = buildIntelliJ0Movement(speed);
    }
    else if(whichMovement == 'intelliJ1')
    {
        objMovement = buildIntelliJ1Movement(speed);
    }
    else if(whichMovement == 'intelliJ2')
    {
        objMovement = buildIntelliJ2Movement(speed);
    }
    else if(whichMovement == 'netbeans0')
    {
        objMovement = buildNetbeans0Movement(speed);
    }
    else if(whichMovement == 'netbeans1')
    {
        objMovement = buildNetbeans1Movement(speed);
    }
    else if(whichMovement == 'floor' || whichMovement == 'pitfall')
    {
        objMovement = buildFloorMovement(speed);
    }
    else if(whichMovement == 'stationary')
    {
        objMovement = buildStationaryMovement(speed);
    }
    else if(whichMovement == 'leftSwoop')
    {
        objMovement = buildLeftSwoopMovement(speed);
    }
    else if(whichMovement == 'rightSwoop')
    {
        objMovement = buildRightSwoopMovement(speed);
    }
    else if(whichMovement == 'leftSimpleZigZag')
    {
        objMovement = buildLeftSimpleZigZagMovement(speed);
    }
    else if(whichMovement == 'rightSimpleZigZag')
    {
        objMovement = buildRightSimpleZigZagMovement(speed);
    }
    else if(whichMovement == 'leftBox')
    {
        objMovement = buildLeftBoxMovement(speed);
    }
    else if(whichMovement == 'rightBox')
    {
        objMovement = buildRightBoxMovement(speed);
    }
    else if(whichMovement == 'leftX')
    {
        objMovement = buildLeftXMovement(speed);
    }
    else if(whichMovement == 'rightX')
    {
        objMovement = buildRightXMovement(speed);
    }
    else if(whichMovement == 'leftBackAndForth')
    {
        objMovement = buildLeftBackAndForthMovement(speed);
    }
    else if(whichMovement == 'rightBackAndForth')
    {
        objMovement = buildRightBackAndForthMovement(speed);
    }
    else if(whichMovement == 'centerBoxes')
    {
        objMovement = buildCenterBoxesMovement(speed);
    }
    else if(whichMovement == 'tombstone')
    {
        objMovement = buildTombstoneMovement(speed);
    }

    return objMovement;
}

function buildPositions()
{
    objPositions.floor = [0,-100];
    objPositions.floorLoop = [0,-700];

    objPositions.playerStart = [375, 550];
    objPositions.left = [-350, -100];
    objPositions.right = [850, -100];
    objPositions.center = [400, -100];
    objPositions.middle = [375, 350];
    objPositions.straightLeft = [-350, 0];
    objPositions.tombstone = [150, -125];
    objPositions.rightTombstone = [600,0];
    objPositions.leftTombstone = [0,0];
    objPositions.centerTombstone = [300,0];

    objPositions.pit1 = [0,-200];
    objPositions.pit2 = [200,-200];
    objPositions.pit3 = [400,-200];
    objPositions.pit4 = [600,-200];

    objPositions.player = [0,0];
    objPositions.laptop = [0,0];
    objPositions.entity = [0,0];
    objPositions.entityBullet = [0,0];

    objPositions.getPosition = function(whichPosition)
    {
        var returnPosition = [];

        if(whichPosition == 'player')
        {
            var playerPosition = objLevel.player.getPos();
            returnPosition = [playerPosition[0] + 20, playerPosition[1]];
        }
        else if(whichPosition == 'laptop')
        {
            var laptopPosition = objLevel.laptop.getPos();
            returnPosition = [laptopPosition[0] - 138, laptopPosition[1] - 138];
        }
        else
        {
            returnPosition = objPositions[whichPosition];
        }

        return returnPosition;
    };

    objPositions.setPosition = function(whichPosition, aryCoordinates)
    {
        objPositions[whichPosition] = [aryCoordinates[0],aryCoordinates[1]];
    };
}

function buildEntityBullet(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y += objMovement.speed;

        return xy;
    };

    return objMovement;
}

function buildNotepad0Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);

        return xy;
    };

    return objMovement;
}

function buildNotepadPlusPlus0Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.segment = 0;
    objMovement.counter = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        if(objMovement.segment == 0)
        {
            xy.x -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);
            xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);

            objMovement.counter += 1;

            if(objMovement.counter == 5)
            {
                objMovement.segment += 1;
            }
        }
        else
        {
            xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);
        }

        return xy;
    };

    return objMovement;
}

function buildNotepadPlusPlus1Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.segment = 0;
    objMovement.counter = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        if(objMovement.segment == 0)
        {
            xy.x += objMovement.speed * (objPlayer.IDE.notepad.speed / 100);
            xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);

            objMovement.counter += 1;

            if(objMovement.counter == 5)
            {
                objMovement.segment += 1;
            }
        }
        else
        {
            xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);
        }

        return xy;
    };

    return objMovement;
}

function buildFar0Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);

        return xy;
    };

    return objMovement;
}

function buildEclipse0Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);

        return xy;
    };

    return objMovement;
}

function buildEclipse1Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y -= (objMovement.speed * (objPlayer.IDE.notepad.speed / 100)) / 1.5;
        xy.x -= (objMovement.speed * (objPlayer.IDE.notepad.speed / 100)) / 1.5;

        return xy;
    };

    return objMovement;
}

function buildEclipse2Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y -= (objMovement.speed * (objPlayer.IDE.notepad.speed / 100)) / 1.5;
        xy.x += (objMovement.speed * (objPlayer.IDE.notepad.speed / 100)) / 1.5;

        return xy;
    };

    return objMovement;
}

function buildEclipse3Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.x -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);

        return xy;
    };

    return objMovement;
}

function buildEclipse4Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.x += objMovement.speed * (objPlayer.IDE.notepad.speed / 100);

        return xy;
    };

    return objMovement;
}

function buildDreamweaver0Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);

        return xy;
    };

    return objMovement;
}

function buildMuleStudio0Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);

        return xy;
    };

    return objMovement;
}

function buildIntelliJ0Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.segment = 0;
    objMovement.counter = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        if(objMovement.segment == 0)
        {
            xy.x -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);
            xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);

            objMovement.counter += 1;

            if(objMovement.counter == 10)
            {
                objMovement.segment += 1;
            }
        }
        else
        {
            xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);
        }

        return xy;
    };

    return objMovement;
}

function buildIntelliJ1Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);

        return xy;
    };

    return objMovement;
}

function buildIntelliJ2Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.segment = 0;
    objMovement.counter = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        if(objMovement.segment == 0)
        {
            xy.x += objMovement.speed * (objPlayer.IDE.notepad.speed / 100);
            xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);

            objMovement.counter += 1;

            if(objMovement.counter == 10)
            {
                objMovement.segment += 1;
            }
        }
        else
        {
            xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);
        }

        return xy;
    };

    return objMovement;
}

function buildNetbeans0Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.segment = 0;
    objMovement.counter = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        if(objMovement.segment == 0)
        {
            xy.x -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);
            xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);

            objMovement.counter += 1;

            if(objMovement.counter == 10)
            {
                objMovement.segment += 1;
            }
        }
        else
        {
            xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);
        }

        return xy;
    };

    return objMovement;
}

function buildNetbeans1Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.segment = 0;
    objMovement.counter = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        if(objMovement.segment == 0)
        {
            xy.x += objMovement.speed * (objPlayer.IDE.notepad.speed / 100);
            xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);

            objMovement.counter += 1;

            if(objMovement.counter == 10)
            {
                objMovement.segment += 1;
            }
        }
        else
        {
            xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);
        }

        return xy;
    };

    return objMovement;
}

function buildFloorMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y += objMovement.speed;

        return xy;
    };

    return objMovement;
}

function buildStationaryMovement(speed)
{
    var objMovement = {};

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        return xy;
    };

    return objMovement;
}

function buildLeftSimpleZigZagMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            xy = objMovement.straightLine({x: -50, y: 0}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = objMovement.straightLine({x: 772, y: 0}, {x: 772, y:300}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = objMovement.straightLine({x: 772, y: 300}, {x: 0, y:300}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            xy = objMovement.straightLine({x: 0, y: 300}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            xy = objMovement.straightLine({x: 0, y: 0}, {x: 772, y:0}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 4)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    objMovement.straightLine = function(startPoint, endPoint, percent)
    {
        var x = startPoint.x + ((endPoint.x - startPoint.x) * percent);
        var y = startPoint.y + ((endPoint.y - startPoint.y) * percent);

        return( {x:x, y:y} )
    };

    return objMovement;
}

function buildRightSimpleZigZagMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            xy = objMovement.straightLine({x: 850, y: 0}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = objMovement.straightLine({x: 0, y: 0}, {x: 0, y:300}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = objMovement.straightLine({x: 0, y: 300}, {x: 772, y:300}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            xy = objMovement.straightLine({x: 772, y: 300}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            xy = objMovement.straightLine({x: 772, y: 0}, {x: 0, y:0}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 4)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    objMovement.straightLine = function(startPoint, endPoint, percent)
    {
        var x = startPoint.x + ((endPoint.x - startPoint.x) * percent);
        var y = startPoint.y + ((endPoint.y - startPoint.y) * percent);

        return( {x:x, y:y} )
    };

    return objMovement;
}

function buildLeftSwoopMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;
        objMovement.percent += ((1 / 100) * speed);

        if(objMovement.segment == 0)
        {
            xy = objMovement.swoop({x: -50, y: -100}, {x: 375, y: 700}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = objMovement.resetToZero({x: 772, y: 0}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = objMovement.swoop({x: 0, y: 0}, {x: 375, y: 600}, {x: 772, y:0}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 2)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    objMovement.swoop = function(startPoint,controlPoint,endPoint, percent)
    {
        var x = Math.pow(1-percent,2) * startPoint.x + 2 * (1-percent) * percent * controlPoint.x + Math.pow(percent,2) * endPoint.x;
        var y = Math.pow(1-percent,2) * startPoint.y + 2 * (1-percent) * percent * controlPoint.y + Math.pow(percent,2) * endPoint.y;

        return( {x:x,y:y} );
    };

    objMovement.resetToZero = function(startPoint, endPoint, percent)
    {
        var x = startPoint.x - startPoint.x * percent;
        var y = 0;

        return( {x:x, y:y} )
    };

    return objMovement;
}

function buildRightSwoopMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;
        objMovement.percent += ((1 / 100) * speed);

        if(objMovement.segment == 0)
        {
            xy = objMovement.swoop({x: 850, y: -100}, {x: 375, y: 700}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = objMovement.resetToZero({x: 0, y: 0}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = objMovement.swoop({x: 772, y: 0}, {x: 375, y: 600}, {x: 0, y:0}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 2)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    objMovement.swoop = function(startPoint,controlPoint,endPoint, percent)
    {
        var x = Math.pow(1-percent,2) * startPoint.x + 2 * (1-percent) * percent * controlPoint.x + Math.pow(percent,2) * endPoint.x;
        var y = Math.pow(1-percent,2) * startPoint.y + 2 * (1-percent) * percent * controlPoint.y + Math.pow(percent,2) * endPoint.y;

        return( {x:x,y:y} );
    };

    objMovement.resetToZero = function(startPoint, endPoint, percent)
    {
        var x = startPoint.x + endPoint.x * percent;
        var y = 0;

        return( {x:x, y:y} )
    };

    return objMovement;
}

function buildLeftBoxMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            xy = objMovement.straightLine({x: 0, y: -50}, {x: 0, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = objMovement.straightLine({x: 0, y: 562}, {x: 772, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = objMovement.straightLine({x: 772, y:562}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            xy = objMovement.straightLine({x: 772, y: 0}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            xy = objMovement.straightLine({x: 0, y: 0}, {x: 0, y:562}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 4)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    objMovement.straightLine = function(startPoint, endPoint, percent)
    {
        var x = startPoint.x + ((endPoint.x - startPoint.x) * percent);
        var y = startPoint.y + ((endPoint.y - startPoint.y) * percent);

        return( {x:x, y:y} )
    };

    return objMovement;
}

function buildRightBoxMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            xy = objMovement.straightLine({x: 772, y: -50}, {x: 772, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = objMovement.straightLine({x: 772, y:562}, {x: 0, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = objMovement.straightLine({x: 0, y:562}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            xy = objMovement.straightLine({x: 0, y: 0}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            xy = objMovement.straightLine({x: 772, y: 0}, {x: 772, y:562}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 4)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    objMovement.straightLine = function(startPoint, endPoint, percent)
    {
        var x = startPoint.x + ((endPoint.x - startPoint.x) * percent);
        var y = startPoint.y + ((endPoint.y - startPoint.y) * percent);

        return( {x:x, y:y} )
    };

    return objMovement;
}

function buildLeftXMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            xy = objMovement.straightLine({x: -50, y: -50}, {x: 772, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = objMovement.straightLine({x: 772, y:562}, {x: 0, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = objMovement.straightLine({x: 0, y:562}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            xy = objMovement.straightLine({x: 772, y:0}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            xy = objMovement.straightLine({x: 0, y: 0}, {x: 772, y:562}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 4)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    objMovement.straightLine = function(startPoint, endPoint, percent)
    {
        var x = startPoint.x + ((endPoint.x - startPoint.x) * percent);
        var y = startPoint.y + ((endPoint.y - startPoint.y) * percent);

        return( {x:x, y:y} )
    };

    return objMovement;
}

function buildRightXMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            xy = objMovement.straightLine({x: 850, y: -50}, {x: 0, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = objMovement.straightLine({x: 0, y: 562}, {x: 772, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = objMovement.straightLine({x: 772, y:562}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            xy = objMovement.straightLine({x: 0, y: 0}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            xy = objMovement.straightLine({x: 772, y: 0}, {x: 0, y:562}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 4)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    objMovement.straightLine = function(startPoint, endPoint, percent)
    {
        var x = startPoint.x + ((endPoint.x - startPoint.x) * percent);
        var y = startPoint.y + ((endPoint.y - startPoint.y) * percent);

        return( {x:x, y:y} )
    };

    return objMovement;
}

function buildLeftBackAndForthMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            objMovement.percent += ((1 / 100) * (objMovement.speed * 10));
            xy = objMovement.straightLine({x: 0, y: -50}, {x: 0, y:40}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = objMovement.straightLine({x: 0, y: 40}, {x: 772, y:40}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            objMovement.percent += ((1 / 100) * (objMovement.speed * 10));
            xy = objMovement.straightLine({x: 772, y:40}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            xy = objMovement.straightLine({x: 772, y: 0}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            objMovement.percent += ((1 / 100) * (objMovement.speed * 10));
            xy = objMovement.straightLine({x: 0, y: 0}, {x: 0, y:40}, objMovement.percent/100);
        }

        if(objMovement.percent >= 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 4)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    objMovement.straightLine = function(startPoint, endPoint, percent)
    {
        var x = startPoint.x + ((endPoint.x - startPoint.x) * percent);
        var y = startPoint.y + ((endPoint.y - startPoint.y) * percent);

        return( {x:x, y:y} )
    };

    return objMovement;
}

function buildRightBackAndForthMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            objMovement.percent += ((1 / 100) * (objMovement.speed * 10));
            xy = objMovement.straightLine({x: 772, y: -50}, {x: 772, y:40}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = objMovement.straightLine({x: 772, y: 40}, {x: 0, y:40}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            objMovement.percent += ((1 / 100) * (objMovement.speed * 10));
            xy = objMovement.straightLine({x: 0, y:40}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            xy = objMovement.straightLine({x: 0, y: 0}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            objMovement.percent += ((1 / 100) * (objMovement.speed * 10));
            xy = objMovement.straightLine({x: 772, y: 0}, {x: 772, y:40}, objMovement.percent/100);
        }

        if(objMovement.percent >= 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 4)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    objMovement.straightLine = function(startPoint, endPoint, percent)
    {
        var x = startPoint.x + ((endPoint.x - startPoint.x) * percent);
        var y = startPoint.y + ((endPoint.y - startPoint.y) * percent);

        return( {x:x, y:y} )
    };

    return objMovement;
}

function buildCenterBoxesMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            xy = objMovement.straightLine({x: 386, y: -50}, {x: 386, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            objMovement.percent += ((1 / 100) * objMovement.speed);
            xy = objMovement.straightLine({x: 386, y: 562}, {x: 0, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = objMovement.straightLine({x: 0, y:562}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            objMovement.percent += ((1 / 100) * objMovement.speed);
            xy = objMovement.straightLine({x: 0, y: 0}, {x: 386, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            xy = objMovement.straightLine({x: 386, y: 0}, {x: 386, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 5)
        {
            objMovement.percent += ((1 / 100) * objMovement.speed);
            xy = objMovement.straightLine({x: 386, y: 562}, {x: 772, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 6)
        {
            xy = objMovement.straightLine({x: 772, y: 562}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 7)
        {
            objMovement.percent += ((1 / 100) * objMovement.speed);
            xy = objMovement.straightLine({x: 772, y: 0}, {x: 386, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 8)
        {
            xy = objMovement.straightLine({x: 386, y: 0}, {x: 386, y:562}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 8)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    objMovement.straightLine = function(startPoint, endPoint, percent)
    {
        var x = startPoint.x + ((endPoint.x - startPoint.x) * percent);
        var y = startPoint.y + ((endPoint.y - startPoint.y) * percent);

        return( {x:x, y:y} )
    };

    return objMovement;
}

function buildTombstoneMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        if(positionY < -2)
        {
            xy.y += objMovement.speed;
        }

        return xy;
    };

    return objMovement;
}

function checkCollision(objOne, objTwo)
{
    var blnCollision = false;

    var objOnePos = objOne.getPos();
    var objTwoPos = objTwo.getPos();

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