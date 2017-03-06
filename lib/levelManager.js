var objLevel = {};
var aryLevelLibrary =
[
    {assetName: 'level00', rawJSON: 'levels/level00.json'},
    {assetName: 'level01', rawJSON: 'levels/level01.json'},
    {assetName: 'level02', rawJSON: 'levels/level02.json'},
    {assetName: 'level03', rawJSON: 'levels/level03.json'},
    {assetName: 'level04', rawJSON: 'levels/level04.json'},
    {assetName: 'level05', rawJSON: 'levels/level05.json'},
    {assetName: 'level06', rawJSON: 'levels/level06.json'},
    {assetName: 'level07', rawJSON: 'levels/level07.json'},
    {assetName: 'level08', rawJSON: 'levels/level08.json'},
    {assetName: 'level09', rawJSON: 'levels/level09.json'},
    {assetName: 'level10', rawJSON: 'levels/level10.json'},
    {assetName: 'level11', rawJSON: 'levels/level11.json'},
    {assetName: 'level12', rawJSON: 'levels/level12.json'},
    {assetName: 'level13', rawJSON: 'levels/level13.json'},
    {assetName: 'level14', rawJSON: 'levels/level14.json'},
    {assetName: 'level15', rawJSON: 'levels/level15.json'},
    {assetName: 'level16', rawJSON: 'levels/level16.json'},
    {assetName: 'level17', rawJSON: 'levels/level17.json'},
    {assetName: 'level18', rawJSON: 'levels/level18.json'},
    {assetName: 'level19', rawJSON: 'levels/level19.json'},
    {assetName: 'level20', rawJSON: 'levels/level20.json'}
];

function buildLevel()
{
    var objLevel = {};

    objLevel.blnInvulnerable = false;
    objLevel.blnGameOver = false;
    objLevel.fadeOut = false;

    objLevel.objFloorsTemplate = {};
    objLevel.objFloors = {};
    objLevel.objBullets = {};
    objLevel.objEntities = {};
    objLevel.objDeaths = {};
    objLevel.objPitfalls = {};
    objLevel.intFloorCounter = 0;
    objLevel.intBulletCounter = 0;
    objLevel.intDeathCounter = 0;
    objLevel.intEntityCounter = 0;
    objLevel.earnings = 0;

    objLevel.objPause = buildPause();
    objLevel.objFade = buildFade();
    objLevel.objHUD = buildHUD();
    objLevel.objMusic = objSounds[aryLevelLibrary[objGame.nextLevel].parsedJSON.levelMusic];

    objPlayer.batteryPower = 0;

    $.each(aryLevelLibrary[objGame.nextLevel].parsedJSON.levelEntities, function()
    {
        if(this.assetName == 'player')
        {
            objLevel.player = buildEntity(this.assetName, this.position, this.movement, this.timing, this.type, this.bounty);
        }
        else if(this.assetName == 'floor')
        {
            objLevel.objFloors['floor' + objLevel.intFloorCounter] = buildEntity(this.assetName, this.position, this.movement, this.timing, this.type, this.bounty);
            objLevel.intFloorCounter += 1;
            objLevel.objFloors['floor0'].updateHP(1000);
            objLevel.objFloorsTemplate = this;
        }
        else
        {
            objLevel.objEntities['entity' + objLevel.intEntityCounter] = buildEntity(this.assetName, this.position, this.movement, this.timing, this.type, this.bounty);
            objLevel.intEntityCounter += 1;
        }
    });

    objLevel.fireBullet = function ()
    {
        objPlayer.fire();
    };

    objLevel.throwLaptop = function()
    {
        objPlayer.throw();
    };

    objLevel.objMusic.playMusic();

    return objLevel;
}

function renderLevel()
{
    if(objGame.gamePaused == false)
    {
        for(var key in objLevel.objFloors)
        {
            objLevel.objFloors[key].movement();
            objLevel.objFloors[key].renderSprite();

            var floorHP = objLevel.objFloors[key].updateHP(1);

            if(floorHP == 3235)
            {
                objLevel.objFloors['floor' + objLevel.intFloorCounter] = buildEntity(objLevel.objFloorsTemplate.assetName, 'floorLoop', objLevel.objFloorsTemplate.movement, objLevel.objFloorsTemplate.timing);
                objLevel.intFloorCounter += 1;
            }
            else if(floorHP == 0)
            {
                delete objLevel.objFloors[key];
            }
        }

        for(var key in objLevel.objEntities)
        {
            if(objLevel.objEntities[key].assetName == 'rightTombstoneAttack' || objLevel.objEntities[key].assetName == 'leftTombstoneAttack' || objLevel.objEntities[key].assetName == 'centerTombstoneAttack')
            {
                if(objLevel.objEntities[key].objSprite.stage == 0)
                {
                    objLevel.objEntities[key].objSprite.height = 1;
                    objLevel.objEntities[key].objSprite.stage += 1;
                }
                else if(objLevel.objEntities[key].objSprite.stage >= 1 && objLevel.objEntities[key].objSprite.stage < 4 && objLevel.objEntities[key].objSprite.stageCounter < 1)
                {
                    objLevel.objEntities[key].objSprite.stageCounter += 1;
                }
                else if(objLevel.objEntities[key].objSprite.stage >= 1 && objLevel.objEntities[key].objSprite.stage < 4 && objLevel.objEntities[key].objSprite.stageCounter >= 1)
                {
                    objLevel.objEntities[key].objSprite.height = objLevel.objEntities[key].objSprite.originalHeight * (objLevel.objEntities[key].objSprite.stage /3);
                    objLevel.objEntities[key].objSprite.stage += 1;
                    objLevel.objEntities[key].objSprite.stageCounter = 0;
                }
                else if(objLevel.objEntities[key].objSprite.stage == 4 && objLevel.objEntities[key].objSprite.stageCounter < 40)
                {
                    objLevel.objEntities[key].objSprite.stageCounter += 1;
                }
                else if(objLevel.objEntities[key].objSprite.stage == 4 && objLevel.objEntities[key].objSprite.stageCounter >= 40)
                {
                    objLevel.objEntities[key].objSprite.stage += 1;
                }
                else if(objLevel.objEntities[key].objSprite.stage == 5 && objLevel.objEntities[key].objSprite.stageCounter < 300)
                {
                    objLevel.objEntities[key].objSprite.stageCounter += 1;
                    objLevel.objEntities[key].positionY -= 5;
                }
                else if(objLevel.objEntities[key].objSprite.stage >= 5 && objLevel.objEntities[key].objSprite.stageCounter >= 300)
                {
                    objLevel.objEntities[key].updateHP(5000);
                }
            }

            objLevel.objEntities[key].movement();
            objLevel.objEntities[key].renderSprite();
        }

        for(var key in objLevel.objDeaths)
        {
            objLevel.objDeaths[key].movement();
            objLevel.objDeaths[key].renderSprite();
        }

        for(var key in objLevel.objBullets)
        {
            objLevel.objBullets[key].movement();
            objLevel.objBullets[key].renderSprite();
        }

        if(typeof objLevel.laptop !== 'undefined')
        {
            objLevel.laptop.movement();
            objLevel.laptop.renderSprite();
        }

        if(typeof objLevel.explosion !== 'undefined')
        {
            objLevel.explosion.movement();
            objLevel.explosion.renderSprite();
        }

        objLevel.player.renderSprite();
        objLevel.objHUD.render();

        if(objLevel.objHUD.playerSleeping)
        {
            objLevel.objHUD.renderSleep();
        }

        if(objLevel.fadeOut == true)
        {
            objLevel.objFade.render();
        }
    }
    else
    {
        objLevel.objPause.render();
    }
}

function calculateCollisions()
{
    // Check if the laptop is out of HP and if it is, explode
    if(typeof objLevel.laptop !== 'undefined' && objLevel.laptop.updateHP(1) <= 0)
    {
        objPositions.setPosition('laptop', objLevel.laptop.getPos());
        objLevel.explosion = buildEntity('explosion', 'laptop', 'stationary', 0);
        objLevel.laptop = undefined;
        objSounds.explosion.play();
    }

    // Check if the explosion has expired and delete it if it has
    if(typeof objLevel.explosion !== 'undefined' && objLevel.explosion.updateHP(1) <= 0)
    {
        objLevel.explosion = undefined;
    }

    // Update bullet HP to check if they are dead
    for(var key in objLevel.objBullets)
    {
        if(objLevel.objBullets[key].updateHP(1) <= 0)
        {
            delete objLevel.objBullets[key];
        }
    }

    // Update death HP to check if they are dead
    for(var key in objLevel.objDeaths)
    {
        if(objLevel.objDeaths[key].updateHP(1) <= 0)
        {
            delete objLevel.objDeaths[key];
        }
    }

    // Loop through all entities and check if they collide with bullets, explosions or the player
    for(var key in objLevel.objEntities)
    {
        var blnDelete = false;

        if(objLevel.objEntities[key].assetName == 'entityBullet' || objLevel.objEntities[key].assetName == 'pitfall' || objLevel.objEntities[key].assetName == 'leftTombstoneAttack' || objLevel.objEntities[key].assetName == 'rightTombstoneAttack' || objLevel.objEntities[key].assetName == 'centerTombstoneAttack')
        {
            if(objLevel.objEntities[key].updateHP(1) <= 0)
            {
                blnDelete = true;
            }
        }

        // Checking the things that can kill entities
        for(var key2 in objLevel.objBullets)
        {
            if(objLevel.objEntities[key].type == 'monster' && checkCollision(objLevel.objBullets[key2], objLevel.objEntities[key]))
            {
                delete objLevel.objBullets[key2];
                objSounds.tombstoneHit.play();

                if(objLevel.objEntities[key].updateHP(objPlayer.IDE[objPlayer.IDE.active].damage) <= 0)
                {
                    objPositions.setPosition('entity',objLevel.objEntities[key].getPos());
                    objLevel.objDeaths['death' + objLevel.intDeathCounter] = buildEntity(objLevel.objEntities[key].assetName + 'Death', 'entity', 'stationary', 0);
                    objLevel.intDeathCounter += 1;
                    objLevel.earnings += objLevel.objEntities[key].bounty;

                    if(objLevel.objEntities[key].assetName == 'tombstoneBug')
                    {
                        objSounds.tombstoneDeath.play();
                    }
                    else
                    {
                        objSounds.bugDeath.play();
                    }

                    blnDelete = true;
                    break;
                }

                if(objLevel.objEntities[key].assetName == 'tombstoneBug')
                {
                    objCanvas.context.globalAlpha = 0.15;
                    objCanvas.context.beginPath();
                    objCanvas.context.arc(400,-430 + objLevel.objEntities[key].positionY,500,0,2 * Math.PI, false);
                    objCanvas.context.fillStyle = '#FFFFFF';
                    objCanvas.context.fill();
                    objCanvas.context.globalAlpha = 1;
                }
            }
            else if(objLevel.objEntities[key].assetName == 'entityBullet' && checkCollision(objLevel.objBullets[key2], objLevel.objEntities[key]))
            {
                blnDelete = true;
            }
        }

        if(typeof objLevel.explosion !== 'undefined' && objLevel.objEntities[key].type == 'monster' && checkCollision(objLevel.explosion, objLevel.objEntities[key]))
        {
            if(objLevel.explosion.hitEntities.indexOf(key) < 0)
            {
                objLevel.explosion.hitEntities.push(key);

                if(objLevel.objEntities[key].updateHP(objPlayer.explosionDamage) <= 0)
                {
                    objPositions.setPosition('entity',objLevel.objEntities[key].getPos());
                    objLevel.objDeaths['death' + objLevel.intDeathCounter] = buildEntity(objLevel.objEntities[key].assetName + 'Death', 'entity', 'stationary', 0);
                    objLevel.intDeathCounter += 1;
                    objLevel.earnings += objLevel.objEntities[key].bounty;
                    blnDelete = true;
                }
            }
        }
        else if(typeof objLevel.explosion !== 'undefined' && objLevel.objEntities[key].assetName == 'entityBullet' && checkCollision(objLevel.explosion, objLevel.objEntities[key]))
        {
            blnDelete = true;
        }

        // If the player was hit, lose PTO unless he is marked as invulnerable
        if(checkCollision(objLevel.objEntities[key],objLevel.player) && objLevel.blnInvulnerable == false)
        {
            if(objLevel.objEntities[key].assetName == 'pitfall')
            {
                objSounds.falling.play();
            }
            else
            {
                objLevel.objDeaths['death' + objLevel.intDeathCounter] = buildEntity('playerSleeping','player','floor',0);
                objSounds.hit.play();
            }

            objPlayer.ptoLost();
        }

        if(blnDelete)
        {
            delete objLevel.objEntities[key];
        }
    }
}

function levelTick()
{
    if(objGame.gamePaused == false)
    {
        objPlayer.cooldown();

        // If all entities are dead. Victory!
        if(Object.keys(objLevel.objEntities).length <= 0)
        {
            objLevel.fadeOut = true;
        }

        for(var key in objLevel.objEntities)
        {
            if(objLevel.objEntities[key].attackType == 'ranged' && objLevel.objEntities[key].monsterFire() == false)
            {
                var tmpPos = objLevel.objEntities[key].getPos();
                objPositions.setPosition('entityBullet',[tmpPos[0]+38, tmpPos[1] + 14]);
                objLevel.objEntities['entity' + objLevel.intEntityCounter] = buildEntity('entityBullet','entityBullet','entityBullet',0,'temp',0);
                objLevel.intEntityCounter += 1;
            }
            else if(objLevel.objEntities[key].attackType == 'special' && objLevel.objEntities[key].monsterFire() == false)
            {
                var aryAttackOrder = ['left','right','center','left','center','center','right','left','right','center','right','left'];

                objLevel.objEntities['entity' + objLevel.intEntityCounter] = buildEntity(aryAttackOrder[objLevel.objEntities[key].attackNumber] + 'TombstoneAttack', aryAttackOrder[objLevel.objEntities[key].attackNumber] + 'Tombstone', 'stationary', 0, 'temp', 0);
                objLevel.objEntities[key].attackNumber += 1;
                objLevel.intEntityCounter += 1;
                objSounds.tombstoneAttack.play();

                if(objLevel.objEntities[key].attackNumber >= 11)
                {
                    objLevel.objEntities[key].attackNumber = 0;
                }
            }
        }

        if(objLevel.objFade.fadeCounter == 100)
        {
            objGame.setGameState('buildMenu');
            objLevel.objMusic.stop();

            if(objLevel.blnGameOver == true)
            {
                objGame.setMenuState('gameover');
            }
            else
            {
                objGame.setMenuState('victory');
            }
        }
    }
}

function buildHUD()
{
    var objHUD = {};

    objHUD.ptoIcon = objUILibrary.ptoIcon;
    objHUD.batteryPower = objUILibrary.batteryPower;
    objHUD.batteryColor = 'red';
    objHUD.batteryColorCounter = 0;

    objHUD.render = function()
    {
        objCanvas.context.globalAlpha = 0.3;
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.fillRect(0, 557, 50, 575);
        objCanvas.context.globalAlpha = 1;

        objCanvas.context.globalAlpha = 0.3;
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.fillRect(0, 576, 160, 600);
        objCanvas.context.globalAlpha = 1;

        objCanvas.context.drawImage
        (
            objHUD.ptoIcon,
            0,
            0,
            14,
            15,
            3,
            562,
            14,
            15
        );

        objCanvas.context.fillStyle = "#FFFFFF";
        objCanvas.context.font = '12px Arial';
        objCanvas.context.textAlign = 'left';
        objCanvas.context.fillText('x ' + objPlayer.pto, 25, 574);

        objCanvas.context.drawImage
        (
            objHUD.batteryPower,
            0,
            16 * objPlayer.batteryPower,
            150,
            16,
            3,
            581,
            150,
            16
        );

        if(objPlayer.batteryPower == objPlayer.batteryMax)
        {
            objHUD.batteryColorCounter += 1;

            if(objHUD.batteryColor == 'red' && objHUD.batteryColorCounter == 20)
            {
                objHUD.batteryColor = 'white';
                objHUD.batteryColorCounter = 0;
            }
            else if(objHUD.batteryColor == 'white' && objHUD.batteryColorCounter == 20)
            {
                objHUD.batteryColor = 'red';
                objHUD.batteryColorCounter = 0;
            }


            objCanvas.context.fillStyle = objHUD.batteryColor;
            objCanvas.context.font = '10px Arial';
            objCanvas.context.textAlign = 'left';
            objCanvas.context.fillText('LAPTOP OVERHEATING', 19, 593);
        }
    };

    return objHUD;
}

function buildPause()
{
    var objPause = {};

    objPause.render = function()
    {
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.fillRect(0, 0, 800, 600);

        objCanvas.context.font = '50px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillStyle = colInactive;
        objCanvas.context.fillText('Paused', 400, 275);
    };

    return objPause;
}

function buildFade()
{
    var objFade = {};

    objFade.fadeCounter = 0;

    objFade.render = function()
    {
        objCanvas.context.globalAlpha = 0.01 * objFade.fadeCounter;
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.fillRect(0, 0, 800, 600);
        objCanvas.context.globalAlpha = 1;

        objFade.fadeCounter += 1;
    };

    return objFade;
}