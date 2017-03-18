var objEntityLibrary = {};

function buildEntity(whichEntity, entityPosition, entityMovement, entityTiming, entityType)
{
    var objEntity = {};

    objEntity.assetName = whichEntity;
    objEntity.objSprite = buildSprite(whichEntity);
    objEntity.height = objEntity.objSprite.height;
    objEntity.width = objEntity.objSprite.width;
    objEntity.positionX = objPositions.getPosition(entityPosition)[0];
    objEntity.positionY = objPositions.getPosition(entityPosition)[1];
    objEntity.timing = entityTiming;
    objEntity.type = entityType;

    objEntity.bounty = parseInt(objEntityLibrary[whichEntity].bounty);
    objEntity.hp = parseInt(objEntityLibrary[whichEntity].hp);
    objEntity.speed = parseFloat(objEntityLibrary[whichEntity].speed);
    objEntity.attackType = objEntityLibrary[whichEntity].attackType;
    objEntity.cooldown = parseInt(objEntityLibrary[whichEntity].cooldown);

    if(objEntityLibrary[whichEntity].spawnSound != 'none')
    {
        objEntity.spawnSound = objEntityLibrary[whichEntity].spawnSound;
    }

    objEntity.getPos = function()
    {
        return ([objEntity.positionX, objEntity.positionY, objEntity.positionX + objEntity.width, objEntity.positionY + objEntity.height]);
    };

    objEntity.updateHP = function(amount)
    {
        if(objEntity.timing <= 0)
        {
            objEntity.hp -= amount;
        }

        return objEntity.hp;
    };

    if(whichEntity == 'player')
    {
        objEntity.positionXOrig = objPositions.getPosition(entityPosition)[0];
        objEntity.positionYOrig = objPositions.getPosition(entityPosition)[1];
        objEntity.invulCount = 0;

        objEntity.renderSprite = function()
        {
            if(objLevel.blnInvulnerable == true)
            {
                objEntity.invulCount += 1;

                if(objEntity.invulCount < 10)
                {
                    objCanvas.context.globalAlpha = 1;
                }
                else if(objEntity.invulCount >= 10 && objEntity.invulCount < 20)
                {
                    objCanvas.context.globalAlpha = 0;
                }
                else
                {
                    objCanvas.context.globalAlpha = 1;
                    objEntity.invulCount = 0;
                }
            }

            objEntity.objSprite.render(objEntity.positionX, objEntity.positionY);
            objCanvas.context.globalAlpha = 1;
        };

        objEntity.pressedW = function()
        {
            if(objEntity.positionY > 0 && objGame.gamePaused == false && objLevel.fadeOut == false)
            {
                objEntity.positionY -= (5 + (.5 * objPlayer.nespresso));
            }
        };

        objEntity.pressedS = function()
        {
            if(objEntity.positionY + objEntity.height < objCanvas.canvas.height && objGame.gamePaused == false && objLevel.fadeOut == false)
            {
                objEntity.positionY += (5 + (.5 * objPlayer.nespresso));
            }
        };

        objEntity.pressedA = function()
        {
            if(objEntity.positionX > 0 && objGame.gamePaused == false && objLevel.fadeOut == false)
            {
                objEntity.positionX -= (5 + (.5 * objPlayer.nespresso));
            }
        };

        objEntity.pressedD = function()
        {
            if(objEntity.positionX + objEntity.width < objCanvas.canvas.width && objGame.gamePaused == false && objLevel.fadeOut == false)
            {
                objEntity.positionX += (5 + (.5 * objPlayer.nespresso));
            }
        };

        objEntity.pressedJ = function()
        {
            if(objGame.gamePaused == false && objLevel.fadeOut == false)
            {
                objLevel.fireBullet(objEntity.positionX, objEntity.positionY);
            }
        };

        objEntity.pressedK = function()
        {
            if(objGame.gamePaused == false && objLevel.fadeOut == false)
            {
                objLevel.throwLaptop();
            }
        };

        objEntity.pressedSpace = function()
        {
            if(objLevel.fadeOut == false)
            {
                objGame.setGamePaused();
                objLevel.objMusic.pause();
                objGame.setInputSleeping();
            }
        };

        objEntity.deathMove = function()
        {
            var deathPosition = objPositions.getPosition('playerStart');

            objEntity.positionX = 400;
            objEntity.positionY = 2500; // Far away so nothing can hit the player
            objLevel.blnInvulnerable = true;

            objGame.setInputSleeping(2500);
            setTimeout(function()
            {
                objEntity.positionX = deathPosition[0];
                objEntity.positionY = deathPosition[1];
                objLevel.objHUD.playerSleeping = false;
            }, 2500);

            setTimeout(function()
            {
                objLevel.blnInvulnerable = false;
            }, 4500);
        };
    }
    else
    {
        objEntity.objMovement = buildMovement(entityMovement, objEntity.speed);
        objEntity.cooldownCounter = 0;
        objEntity.blnCooldown = false;
        objEntity.attackNumber = 0;
        objEntity.spawnSound = false;
        objEntity.bossMusic = false;
        objEntity.explosionTracker = 0;
        objEntity.hitEntities = [];

        objEntity.renderSprite = function()
        {
            objEntity.objSprite.render(objEntity.positionX, objEntity.positionY);

            if(objEntity.assetName == 'explosion')
            {
                objEntity.explosionTracker += 1;
            }
        };

        objEntity.movement = function()
        {
            if(objEntity.timing == 0 && objLevel.blnGameOver == false)
            {
                var xy = objEntity.objMovement.calculateMove(objEntity.positionX, objEntity.positionY);

                if(typeof objEntity.objSpawnSound !== 'undefined' && objEntity.spawnSound == false)
                {
                    objEntity.objSpawnSound.play();
                    objEntity.spawnSound = true;
                }

                if(objEntity.assetName == 'tombstoneBug' && objEntity.bossMusic == false)
                {
                    objLevel.objMusic.pause();
                    objLevel.objMusic = objMusic['boss'];
                    objLevel.objMusic.play();
                    objEntity.bossMusic = true;
                }

                objEntity.positionX = xy.x;
                objEntity.positionY = xy.y;
            }
            else
            {
                objEntity.timing -= 1;
            }
        };

        objEntity.monsterFire = function()
        {
            if(objEntity.blnCooldown == false)
            {
                objEntity.cooldownCounter = objEntity.cooldown;
                objEntity.blnCooldown = true;
            }
            else if(objEntity.cooldownCounter == 0)
            {
                objEntity.blnCooldown = false;
            }
            else
            {
                objEntity.cooldownCounter -= 1;
            }

            return objEntity.blnCooldown;
        };
    }

    return objEntity;
}