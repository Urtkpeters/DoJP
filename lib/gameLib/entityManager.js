var objEntityLibrary = {};

function buildEntity(whichEntity, entityMovement, entityTiming, entityType, entityWaveNumber)
{
    var objEntity = {};

    objEntity.assetName = whichEntity;
    objEntity.objSprite = buildSprite(whichEntity);
    objEntity.height = objEntity.objSprite.height;
    objEntity.width = objEntity.objSprite.width;
    objEntity.entityPosition = [-1000,-1000];
    objEntity.timing = entityTiming;
    objEntity.type = entityType;
    objEntity.waveNumber = entityWaveNumber;

    objEntity.bounty = parseInt(objEntityLibrary[whichEntity].bounty);
    objEntity.hp = parseInt(objEntityLibrary[whichEntity].hp);
    objEntity.speed = parseFloat(objEntityLibrary[whichEntity].speed);
    objEntity.attackType = objEntityLibrary[whichEntity].attackType;
    objEntity.cooldown = parseInt(objEntityLibrary[whichEntity].cooldown);

    if(objEntityLibrary[whichEntity].spawnSound != 'none')
    {
        objEntity.spawnSound = objEntityLibrary[whichEntity].spawnSound;
    }

    if((objEntity.type == 'temp' || objEntity.type == 'playerSleeping') && (objEntity.assetName != 'leftTombstoneAttack' && objEntity.assetName != 'rightTombstoneAttack' && objEntity.assetName != 'centerTombstoneAttack'))
    {
        objEntity.entityPosition = objPositions.getPosition(objEntity.assetName);
    }
    else if(objEntity.type == 'death')
    {
        objEntity.entityPosition = objPositions.getPosition('entity');
    }
    else if(objEntity.type == 'pitfall' || objEntity.assetName == 'tombstoneBug' || objEntity.assetName == 'leftTombstoneAttack' || objEntity.assetName == 'rightTombstoneAttack' || objEntity.assetName == 'centerTombstoneAttack')
    {
        objEntity.entityPosition = objPositions.getPosition(entityMovement);

        if(objEntity.assetName == 'leftTombstoneAttack' || objEntity.assetName == 'rightTombstoneAttack' || objEntity.assetName == 'centerTombstoneAttack')
        {
            entityMovement = 'stationary';
        }
    }
    else if(objEntity.type == 'floor')
    {
        entityMovement = 'floorInit';
    }

    objEntity.positionX = objEntity.entityPosition[0];
    objEntity.positionY = objEntity.entityPosition[1];

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

    objEntity.objMovement = buildMovement(entityMovement, objEntity.speed);
    objEntity.cooldownCounter = objEntity.cooldown;
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
                objEntity.cooldownCounter = 200;
            }

            objEntity.positionX = xy.x;
            objEntity.positionY = xy.y;
        }
    };

    objEntity.monsterFire = function()
    {
        if(objEntity.attackType == 'ranged' && objEntity.cooldownCounter == 0)
        {
            objPositions.setPosition('entityBullet',[objEntity.positionX + 14, objEntity.positionY + 38]);
            objLevel.objEntities['entity' + objLevel.intEntityCounter] = buildEntity('entityBullet','entityBullet',0,'temp');
            objLevel.intEntityCounter += 1;
            objEntity.cooldownCounter = objEntity.cooldown;
        }
        else if(objEntity.attackType == 'special' && objEntity.cooldownCounter == 0)
        {
            var aryAttackOrder = ['left','right','center','left','center','center','right','left','right','center','right','left'];

            objLevel.objEntities['entity' + objLevel.intEntityCounter] = buildEntity(aryAttackOrder[objEntity.attackNumber] + 'TombstoneAttack', aryAttackOrder[objEntity.attackNumber] + 'Tombstone', 0, 'temp');
            objEntity.attackNumber += 1;
            objLevel.intEntityCounter += 1;
            objSounds.tombstoneAttack.play();
            objEntity.cooldownCounter = objEntity.cooldown;

            if(objEntity.attackNumber >= 11)
            {
                objEntity.attackNumber = 0;
            }
        }
        else if(objEntity.timing == 0)
        {
            objEntity.cooldownCounter -= 1;
        }
    };

    objEntity.getTombstoneHitBox = function()
    {
        if(objEntity.timing <= 0)
        {
            return ([150, 0, 650, 69]);
        }

        return ([-1000, -1000, -1001, -1001])
    };

    return objEntity;
}

function buildPlayerEntity()
{
    var objEntity = {};

    objEntity.assetName = 'player';
    objEntity.objSprite = buildSprite('player');
    objEntity.height = objEntity.objSprite.height;
    objEntity.width = objEntity.objSprite.width;
    objEntity.positionX = 375;
    objEntity.positionY = 475;
    objEntity.timing = 0;
    objEntity.type = 'player';
    objEntity.waveNumber = 0;

    objEntity.bounty = 0;
    objEntity.hp = 0;
    objEntity.speed = 100;
    objEntity.attackType = 'ranged';
    objEntity.cooldown = 0;

    objEntity.getPos = function()
    {
        return ([objEntity.positionX, objEntity.positionY, objEntity.positionX + objEntity.width, objEntity.positionY + objEntity.height]);
    };

    objEntity.positionXOrig = 0;
    objEntity.positionYOrig = 0;
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
            var intDoubleButton = 0;

            if(objKeysState[65] || objKeysState[68])
            {
                intDoubleButton = 0.5;
            }

            objEntity.positionY -= ((5 + (.3 * objPlayer.capsule)) / (1 + intDoubleButton));
        }
    };

    objEntity.pressedS = function()
    {
        if(objEntity.positionY + objEntity.height < objCanvas.canvas.height && objGame.gamePaused == false && objLevel.fadeOut == false)
        {
            var intDoubleButton = 0;

            if(objKeysState[65] || objKeysState[68])
            {
                intDoubleButton = 0.5;
            }

            objEntity.positionY += ((5 + (.3 * objPlayer.capsule)) / (1 + intDoubleButton));
        }
    };

    objEntity.pressedA = function()
    {
        if(objEntity.positionX > 0 && objGame.gamePaused == false && objLevel.fadeOut == false)
        {
            var intDoubleButton = 0;

            if(objKeysState[87] || objKeysState[83])
            {
                intDoubleButton = 0.5;
            }

            objEntity.positionX -= ((5 + (.3 * objPlayer.capsule)) / (1 + intDoubleButton));
        }
    };

    objEntity.pressedD = function()
    {
        if(objEntity.positionX + objEntity.width < objCanvas.canvas.width && objGame.gamePaused == false && objLevel.fadeOut == false)
        {
            var intDoubleButton = 0;

            if(objKeysState[87] || objKeysState[83])
            {
                intDoubleButton = 0.5;
            }

            objEntity.positionX += ((5 + (.3 * objPlayer.capsule)) / (1 + intDoubleButton));
        }
    };

    objEntity.pressedJ = function()
    {
        if(!objGame.gamePaused && !objLevel.fadeOut)
        {
            objPlayer.fire();
        }
    };

    objEntity.pressedK = function()
    {
        if(!objGame.gamePaused && !objLevel.fadeOut)
        {
            objPlayer.throw();
        }
    };

    objEntity.pressedSpace = function()
    {
        if(objLevel.fadeOut == false)
        {
            objGame.setGamePaused();
            objLevel.objMusic.pause();
            objInterface.setInputSleeping(500);
        }
    };

    objEntity.deathMove = function()
    {
        objEntity.positionX = 400;
        objEntity.positionY = 2500; // Far away so nothing can hit the player
        objLevel.blnInvulnerable = true;

        objInterface.setInputSleeping(2500);
        objPlayer.fireRecharge = -250;
        setTimeout(function()
        {
            objEntity.positionX = 375;
            objEntity.positionY = 475;
            objLevel.objHUD.playerSleeping = false;
        }, 2500);

        setTimeout(function()
        {
            objLevel.blnInvulnerable = false;
        }, 4500);
    };

    return objEntity;
}