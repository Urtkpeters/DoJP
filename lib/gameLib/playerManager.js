var objPlayer = {};

function buildPlayer()
{
    objPlayer.newGame = function()
    {
        objPlayer.nextLevel = 0;
        objPlayer.earnings = 10000;
        objPlayer.score = 908643;
        objPlayer.pto = 100;
        objPlayer.windate = 1;
        objPlayer.nespresso = 0;

        objPlayer.IDE =
        {
            active: 'intelliJ',
            notepad:            {level: 1, bullets: 1, damage: 8,  cooldown: 40, speed: 100, damageLevel: 6, cooldownLevel: 2, speedLevel: 3},
            notepadplusplus:    {level: 0, bullets: 2, damage: 16, cooldown: 40, speed: 100, damageLevel: 4, cooldownLevel: 2, speedLevel: 0},
            far:                {level: 0, bullets: 1, damage: 24, cooldown: 40, speed: 200, damageLevel: 4, cooldownLevel: 1, speedLevel: 2},
            eclipse:            {level: 0, bullets: 5, damage: 12, cooldown: 40, speed: 100, damageLevel: 2, cooldownLevel: 1, speedLevel: 2},
            dreamweaver:        {level: 0, bullets: 1, damage: 2,  cooldown: 10, speed:  25, damageLevel: 1, cooldownLevel: 0, speedLevel: 2},
            muleStudio:         {level: 0, bullets: 1, damage: 24, cooldown: 40, speed: 100, damageLevel: 6, cooldownLevel: 0, speedLevel: 1},
            intelliJ:           {level: 0, bullets: 3, damage: 16, cooldown: 40, speed: 100, damageLevel: 4, cooldownLevel: 1, speedLevel: 2},
            netbeans:           {level: 0, bullets: 2, damage: 16, cooldown: 40, speed: 100, damageLevel: 4, cooldownLevel: 1, speedLevel: 2}
        };

        objPlayer.fireRate = 500;
        objPlayer.batteryMax = 72;
        objPlayer.batteryPower = 0;
        objPlayer.batteryInterval = 20;
        objPlayer.batteryCounter = 0;
        objPlayer.batterySound = false;
        objPlayer.explosionDamage = 20;
        objPlayer.fireRecharge = 0;
    };

    objPlayer.ptoLost = function()
    {
        objPlayer.pto -= 1;
        objLevel.objHUD.sleepingX = objLevel.player.positionX;
        objLevel.objHUD.sleepingY = objLevel.player.positionY;

        if(objPlayer.pto < 0)
        {
            objLevel.fadeOut = true;
            objLevel.blnGameOver = true;
            objLevel.player.positionX = 400;
            objLevel.player.positionY = 2500;
        }
        else
        {
            objLevel.player.deathMove();
        }
    };

    objPlayer.cooldown = function()
    {
        if(objPlayer.batteryPower < objPlayer.batteryMax)
        {
            objPlayer.batteryCounter += (1 + (.1 * objPlayer.windate));

            if(objPlayer.batteryInterval <= objPlayer.batteryCounter)
            {
                objPlayer.batteryCounter = 0;
                objPlayer.batteryPower += 1;
            }
        }
        else if(objPlayer.batteryPower >= objPlayer.batteryMax && objPlayer.batterySound == false)
        {
            objSounds.energyBar.play();
            objPlayer.batterySound = true;
        }

        if(objPlayer.fireRecharge < objPlayer.IDE[objPlayer.IDE.active].cooldown)
        {
            objPlayer.fireRecharge += 1;
        }
    };

    objPlayer.throw = function()
    {
        if(objPlayer.batteryPower >= objPlayer.batteryMax)
        {
            objLevel.laptop = buildEntity('laptop','player','notepad0', 0, 'temp');
            objPlayer.batteryPower = 0;
            objSounds.throw.play();
            objPlayer.batterySound = false;
        }
    };

    objPlayer.fire = function()
    {
        if(objPlayer.fireRecharge >= objPlayer.IDE[objPlayer.IDE.active].cooldown)
        {
            if(objPlayer.IDE.active == 'eclipse')
            {
                objLevel.objBullets['bullet' + objLevel.intBulletCounter] = buildEntity('bullet','player',objPlayer.IDE.active + '0', 0, 'temp');
                objLevel.objBullets['bullet' + objLevel.intBulletCounter + 1] = buildEntity('bulletUpperLeft','player',objPlayer.IDE.active + '1', 0, 'temp');
                objLevel.objBullets['bullet' + objLevel.intBulletCounter + 2] = buildEntity('bulletUpperRight','player',objPlayer.IDE.active + '2', 0, 'temp');
                objLevel.objBullets['bullet' + objLevel.intBulletCounter + 3] = buildEntity('bulletLeft','player',objPlayer.IDE.active + '3', 0, 'temp');
                objLevel.objBullets['bullet' + objLevel.intBulletCounter + 4] = buildEntity('bulletRight','player',objPlayer.IDE.active + '4', 0, 'temp');
                objLevel.intBulletCounter += 5;
                objSounds.fire.play();
            }
            else if(objPlayer.IDE.active == 'muleStudio')
            {
                objLevel.objBullets['bullet' + objLevel.intBulletCounter] = buildEntity('bulletBig','player',objPlayer.IDE.active + '0', 0, 'temp');
                objLevel.intBulletCounter += 1;
                objSounds.fire.play();
            }
            else if(objPlayer.IDE.active == 'netbeans')
            {
                objLevel.objBullets['bullet' + objLevel.intBulletCounter] = buildEntity('bulletBig','player',objPlayer.IDE.active + '0', 0, 'temp');
                objLevel.objBullets['bullet' + objLevel.intBulletCounter + 1] = buildEntity('bulletBig','player',objPlayer.IDE.active + '1', 0, 'temp');
                objLevel.intBulletCounter += 2;
                objSounds.fire.play();
            }
            else
            {
                for(var i = 0; i < objPlayer.IDE[objPlayer.IDE.active].bullets; i++)
                {
                    objLevel.objBullets['bullet' + objLevel.intBulletCounter] = buildEntity('bullet','player',objPlayer.IDE.active + i.toString(), 0, 'temp');
                    objLevel.intBulletCounter += 1;
                    objSounds.fire.play();
                }
            }

            objPlayer.fireRecharge = 0;
        }
    };

    objPlayer.purchase = function(whichItem, cost, itemType)
    {
        if(objPlayer.earnings >= cost)
        {
            if(itemType == 'IDE')
            {
                if(objPlayer.IDE[whichItem].level < 10)
                {
                    objPlayer.IDE[whichItem].level += 1;

                    if(objPlayer.IDE[whichItem].level > 1)
                    {
                        objPlayer.IDE[whichItem].damage += objPlayer.IDE[whichItem].damageLevel;
                        objPlayer.IDE[whichItem].cooldown -= objPlayer.IDE[whichItem].cooldownLevel;
                        objPlayer.IDE[whichItem].speed += objPlayer.IDE[whichItem].speedLevel;
                    }
                    else
                    {
                        objPlayer.IDE.active = whichItem;
                    }

                    objSounds.purchase.play();
                    objPlayer.earnings -= cost;
                    return true;
                }
                else
                {
                    objSounds.noMoney.play();
                    objMenu.flashLevel = 20;
                    return false;
                }
            }
            else
            {
                objPlayer[whichItem] += 1;
                objSounds.purchase.play();
                objPlayer.earnings -= cost;
                return true;
            }
        }
        else
        {
            objSounds.noMoney.play();
            objMenu.flashBalance = 20;
            return false;
        }
    };

    objPlayer.equip = function(whichIDE)
    {
        if(objPlayer.IDE[whichIDE].level > 0)
        {
            objSounds.equip.play();
            objPlayer.IDE.active = whichIDE;
        }
        else
        {
            objSounds.noMoney.play();
        }
    };
}