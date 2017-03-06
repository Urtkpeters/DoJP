var aryEntityLibrary =
[
    {assetName: "entityBullet", type: 'temp', hp: "100", speed: 7, attackType: "melee", cooldown: 0, spawnSound: 'none'},
    {assetName: "bullet", type: 'temp', hp: "30", speed: 9, attackType: "melee", cooldown: 0, spawnSound: 'none'},
    {assetName: "bulletLeft", type: 'temp', hp: "30", speed: 9, attackType: "melee", cooldown: 0, spawnSound: 'none'},
    {assetName: "bulletRight", type: 'temp', hp: "30", speed: 9, attackType: "melee", cooldown: 0, spawnSound: 'none'},
    {assetName: "bulletUpperLeft", type: 'temp', hp: "30", speed: 9, attackType: "melee", cooldown: 0, spawnSound: 'none'},
    {assetName: "bulletUpperRight", type: 'temp', hp: "30", speed: 9, attackType: "melee", cooldown: 0, spawnSound: 'none'},
    {assetName: "bulletBig", type: 'temp', hp: "30", speed: 9, attackType: "melee", cooldown: 0, spawnSound: 'none'},
    {assetName: "laptop", type: 'temp', hp: "40", speed: 5, attackType: "none", cooldown: 0, spawnSound: 'none'},
    {assetName: "explosion", type: 'temp', hp: "40", speed: 0, attackType: "melee", cooldown: 0, spawnSound: 'none'},
    {assetName: "leftTombstoneAttack", type: 'temp', hp: "5000", speed: 0, attackType: "none", cooldown: 0, spawnSound: 'none'},
    {assetName: "rightTombstoneAttack", type: 'temp', hp: "5000", speed: 0, attackType: "none", cooldown: 0, spawnSound: 'none'},
    {assetName: "centerTombstoneAttack", type: 'temp', hp: "5000", speed: 0, attackType: "none", cooldown: 0, spawnSound: 'none'},

    {assetName: "playerSleeping", type: 'death', hp: "150", speed: 0.6, attackType: "none", cooldown: 0, spawnSound: 'none'},
    {assetName: "lowBugDeath", type: 'death', hp: "45", speed: 0, attackType: "none", cooldown: 0, spawnSound: 'none'},
    {assetName: "mediumBugDeath", type: 'death', hp: "45", speed: 0, attackType: "none", cooldown: 0, spawnSound: 'none'},
    {assetName: "highBugDeath", type: 'death', hp: "45", speed: 0, attackType: "none", cooldown: 0, spawnSound: 'none'},
    {assetName: "todayBugDeath", type: 'death', hp: "45", speed: 0, attackType: "none", cooldown: 0, spawnSound: 'none'},
    {assetName: "tombstoneBugDeath", type: 'death', hp: "90", speed: 0, attackType: "none", cooldown: 0, spawnSound: 'none'},

    {assetName: "pitfall", type: 'level', hp: 2000, speed: 0.6, attackType: "melee", cooldown: 0, spawnSound: 'none'},
    {assetName: "floor", type: 'level', hp: 4400, speed: 0.6, attackType: "none", cooldown: 0, spawnSound: 'none'},
    {assetName: "lowBug", type: 'level', hp: 8, speed: 100, attackType: "melee", cooldown: 0, spawnSound: 'none'},
    {assetName: "mediumBug", type: 'level', hp: 16, speed: 100, attackType: "ranged", cooldown: 60, spawnSound: 'none'},
    {assetName: "highBug", type: 'level', hp: 32, speed: 100, attackType: "melee", cooldown: 0, spawnSound: 'none'},
    {assetName: "todayBug", type: 'level', hp: 64, speed: 100, attackType: "ranged", cooldown: 45, spawnSound: 'none'},
    {assetName: "tombstoneBug", type: 'level', hp: 1000, speed: 2, attackType: "special", cooldown: 300, spawnSound: 'tombstoneRoar'}
];



function buildEntity(whichEntity, entityPosition, entityMovement, entityTiming, entityType, entityBounty)
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
    objEntity.bounty = parseInt(entityBounty);

    objEntity.hp = 1;
    objEntity.speed = 1;

    for(var i = 0; i < aryEntityLibrary.length; i++)
    {
        if(aryEntityLibrary[i].assetName == whichEntity)
        {
            objEntity.hp = aryEntityLibrary[i].hp;
            objEntity.speed = aryEntityLibrary[i].speed;
            objEntity.attackType = aryEntityLibrary[i].attackType;
            objEntity.cooldown = aryEntityLibrary[i].cooldown;

            if(aryEntityLibrary[i].spawnSound != 'none')
            {
                objEntity.objSpawnSound = objSounds[aryEntityLibrary[i].spawnSound];
            }
        }
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
                    objLevel.objMusic = objSounds['boss'];
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