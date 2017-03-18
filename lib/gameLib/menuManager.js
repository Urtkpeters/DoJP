var objMenu = {};
var colInactive = '#FFFFFF';
var colActive = 'blue';
var aryUILibrary =
[
    {assetName: 'splashBackground', filePath: 'media/ui/splashBackground.jpg'},
    {assetName: 'titleBackground', filePath: 'media/ui/titleBackground.jpg'},
    {assetName: 'shopBackground', filePath: 'media/ui/shopBackground.png'},
    {assetName: 'optionsBackground', filePath: 'media/ui/optionsBackground.jpg'},

    {assetName: 'ptoIcon', filePath: 'media/ui/ptoIcon.png'},
    {assetName: 'batteryPower', filePath: 'media/ui/batteryPower.png'},

    {assetName: 'ptoShopIcon', filePath: 'media/ui/ptoShopIcon.png'},
    {assetName: 'nespressoCapsuleIcon', filePath: 'media/ui/nespressoCapsule.png'},
    {assetName: 'windowsUpdatesIcon', filePath: 'media/ui/windowsUpdates.png'},
    {assetName: 'notepadIcon', filePath: 'media/ui/notepad.png'},
    {assetName: 'notepadplusplusIcon', filePath: 'media/ui/notepadplusplus.png'},
    {assetName: 'farIcon', filePath: 'media/ui/far.png'},
    {assetName: 'eclipseIcon', filePath: 'media/ui/eclipse.png'},
    {assetName: 'dreamweaverIcon', filePath: 'media/ui/dreamweaver.png'},
    {assetName: 'muleStudioIcon', filePath: 'media/ui/muleStudio.png'},
    {assetName: 'intelliJIcon', filePath: 'media/ui/intelliJ.png'},
    {assetName: 'netbeansIcon', filePath: 'media/ui/netbeans.png'},
    {assetName: 'optionOff', filePath: 'media/ui/optionOff.png'},
    {assetName: 'optionOn', filePath: 'media/ui/optionOn.png'}
];

var objUILibrary = {};

function buildUILibrary()
{
    for(var i = 0; i < aryUILibrary.length; i++)
    {
        objUILibrary[aryUILibrary[i].assetName] = aryUILibrary[i].objImage;
    }
}

function buildMenu()
{
    if(objGame.menuState == 'splash')
    {
        objMenu = buildSplashMenu();
    }
    else if(objGame.menuState == 'title')
    {
        objMenu = buildTitleMenu();
    }
    else if(objGame.menuState == 'shop')
    {
        objMenu = buildShopMenu();
    }
    else if(objGame.menuState == 'victory')
    {
        objMenu = buildVictoryMenu();
    }
    else if(objGame.menuState == 'gameover')
    {
        objMenu = buildGameoverMenu();
    }
    else if(objGame.menuState == 'explanation')
    {
        objMenu = buildExplanationMenu();
    }
    else if(objGame.menuState == 'options')
    {
        objMenu = buildOptionsMenu();
    }

    objGame.gameState = 'menu';
    objMenu.objMusic.playMusic();

    return objMenu;
}

function renderMenu()
{
    objMenu.render();
}

function buildSplashMenu()
{
    var objSplashMenu = {};

    objSplashMenu.objImage = objUILibrary.splashBackground;
    objSplashMenu.objMusic = objSounds.intro;
    objSplashMenu.objKeystroke = objSounds.keystroke;

    objSplashMenu.render = function()
    {
        objCanvas.context.drawImage
        (
            objSplashMenu.objImage,
            0,
            0,
            800,
            600,
            0,
            0,
            800,
            600
        );

        objCanvas.context.fillStyle = '#FFFFFF';
        objCanvas.context.font = '30px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillText('Developers of Jagged Peak', 400, 200);

        objCanvas.context.font = '18px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillText('Press Space or J', 400, 400);
    };

    objSplashMenu.pressedW = function() { /* Do nothing */ };
    objSplashMenu.pressedS = function() { /* Do nothing */ };
    objSplashMenu.pressedA = function() { /* Do nothing */ };
    objSplashMenu.pressedD = function() { /* Do nothing */ };

    objSplashMenu.pressedJ = function()
    {
        objGame.gameState = 'buildMenu';
        objGame.menuState = 'title';
        objGame.setInputSleeping();
        objSplashMenu.objKeystroke.play();
    };

    objSplashMenu.pressedK = function() { /* Do nothing */ };

    objSplashMenu.pressedSpace = function()
    {
        objGame.gameState = 'buildMenu';
        objGame.menuState = 'title';
        objGame.setInputSleeping();
        objSplashMenu.objKeystroke.play();
    };

    return objSplashMenu;
}

function buildTitleMenu()
{
    var objTitleScreen = {};

    objTitleScreen.objImage = objUILibrary.titleBackground;
    objTitleScreen.objMusic = objSounds.intro;
    objTitleScreen.objKeystroke = objSounds.keystroke;

    objTitleScreen.activeMenu = 0;
    objTitleScreen.menuOptions =
    [
        {textColor: colActive, gameLink: 'buildMenu', menuLink: 'explanation'},
        {textColor: colInactive, gameLink: 'buildMenu', menuLink: 'explanation'},
        {textColor: colInactive, gameLink: 'buildMenu', menuLink: 'options'}
    ];

    objTitleScreen.render = function()
    {
        objCanvas.context.drawImage(objTitleScreen.objImage, 0, 0, 800, 600, 0, 0, 800, 600);

        objCanvas.context.font = '30px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillStyle = colInactive;
        objCanvas.context.fillText('Developers of Jagged Peak', 400, 200);

        objCanvas.context.font = '18px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillStyle = objTitleScreen.menuOptions[0].textColor;
        objCanvas.context.fillText('New Game', 400, 300);
        objCanvas.context.fillStyle = objTitleScreen.menuOptions[1].textColor;
        objCanvas.context.fillText('Demo Level', 400, 350);
        objCanvas.context.fillStyle = objTitleScreen.menuOptions[2].textColor;
        objCanvas.context.fillText('Options', 400, 400);
    };

    objTitleScreen.pressedW = function()
    {
        if(objTitleScreen.activeMenu == 0)
        {
            objTitleScreen.activeMenu = 2;
        }
        else
        {
            objTitleScreen.activeMenu -= 1;
        }

        for(var i = 0; i < objTitleScreen.menuOptions.length; i++)
        {
            objTitleScreen.menuOptions[i].textColor = colInactive;
        }

        objTitleScreen.menuOptions[objTitleScreen.activeMenu].textColor = colActive;
        objTitleScreen.objKeystroke.play();
        objGame.setInputSleeping();
    };

    objTitleScreen.pressedS = function()
    {
        if(objTitleScreen.activeMenu == 2)
        {
            objTitleScreen.activeMenu = 0;
        }
        else
        {
            objTitleScreen.activeMenu += 1;
        }

        for(var i = 0; i < objTitleScreen.menuOptions.length; i++)
        {
            objTitleScreen.menuOptions[i].textColor = colInactive;
        }

        objTitleScreen.menuOptions[objTitleScreen.activeMenu].textColor = colActive;
        objTitleScreen.objKeystroke.play();
        objGame.setInputSleeping();
    };

    objTitleScreen.pressedA = function() { /* Do nothing */ };
    objTitleScreen.pressedD = function() { /* Do nothing */ };

    objTitleScreen.pressedJ = function()
    {
        if(objTitleScreen.activeMenu == 1)
        {
            objGame.nextLevel = 98;
        }

        objTitleScreen.objKeystroke.play();
        objTitleScreen.objMusic.stop();
        objGame.gameState = objTitleScreen.menuOptions[objTitleScreen.activeMenu].gameLink;
        objGame.menuState = objTitleScreen.menuOptions[objTitleScreen.activeMenu].menuLink;
        objGame.setInputSleeping();
    };

    objTitleScreen.pressedK = function()
    {
        objGame.gameState = 'buildMenu';
        objGame.menuState = 'splash';
        objGame.setInputSleeping();
    };

    objTitleScreen.pressedSpace = function()
    {
        objTitleScreen.objKeystroke.play();
        objTitleScreen.objMusic.stop();
        objGame.gameState = objTitleScreen.menuOptions[objTitleScreen.activeMenu].gameLink;
        objGame.menuState = objTitleScreen.menuOptions[objTitleScreen.activeMenu].menuLink;
        objGame.setInputSleeping();
    };

    return objTitleScreen;
}

function buildGameoverMenu()
{
    var objGameover = {};

    objGameover.musicPlaying = false;
    objGameover.slide = 0;
    objGameover.slideCounter = 0;
    objGameover.slide0alpha = 0;
    objGameover.slide1alpha = 0;
    objGameover.objMusic = objSounds.gameover;

    objGameover.render = function()
    {
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.fillRect(0, 0, 800, 600);

        if(objGameover.slide < 2)
        {
            objGameover.slideCounter += 1;

            if(objGameover.slideCounter == 50)
            {
                objGameover.slide += 1;
                objGameover.slideCounter = 0;
            }
        }

        if(objGameover.slide == 0)
        {
            objGameover.slide0alpha += 0.02;
        }
        else if(objGameover.slide == 2)
        {
            objGameover.slide1alpha += 0.02;
        }

        objCanvas.context.font = '50px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillStyle = colInactive;
        objCanvas.context.globalAlpha = objGameover.slide0alpha;
        objCanvas.context.fillText('Game Over', 400, 275);

        objCanvas.context.font = '18px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillStyle = colInactive;
        objCanvas.context.globalAlpha = objGameover.slide1alpha;
        objCanvas.context.fillText('Press Space or J', 400, 400);
    };

    objGameover.pressedW = function() { /* Do nothing */ };
    objGameover.pressedS = function() { /* Do nothing */ };
    objGameover.pressedA = function() { /* Do nothing */ };
    objGameover.pressedD = function() { /* Do nothing */ };

    objGameover.pressedJ = function()
    {
        objGame.gameState = 'buildMenu';
        objGame.menuState = 'splash';
        objGameover.objMusic.stop();
        objGame.setInputSleeping();
    };

    objGameover.pressedK = function() { /* Do nothing */ };

    objGameover.pressedSpace = function()
    {
        objGameover.objMusic.stop();
        objGame.gameState = 'buildMenu';
        objGame.menuState = 'splash';
        objGame.setInputSleeping();
    };

    return objGameover
}

function buildVictoryMenu()
{
    var objVictory = {};

    objVictory.earningsCounter = 0;
    objVictory.slide = 0;
    objVictory.slideCounter = 0;
    objVictory.objMusic = objSounds.victory;
    objVictory.objScoreCount = objSounds.scoreCount;

    objVictory.render = function()
    {
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.fillRect(0, 0, 800, 600);

        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillStyle = colInactive;

        if(objVictory.slide == 0)
        {
            objCanvas.context.font = '50px Arial';
            objCanvas.context.fillText('Committing code...', 400, 225 + (objVictory.slideCounter));

            objVictory.slideCounter += 1;
            if(objVictory.slideCounter == 50)
            {
                objVictory.slide += 1;
                objVictory.slideCounter = 0;
            }
        }
        else if(objVictory.slide == 1)
        {
            objCanvas.context.font = '50px Arial';
            objCanvas.context.fillText('Committed!', 400, 275);

            objVictory.slideCounter += 1;
            if(objVictory.slideCounter == 20)
            {
                objVictory.slide += 1;
                objVictory.slideCounter = 0;
            }
        }
        else if(objVictory.slide == 2)
        {
            objCanvas.context.font = '50px Arial';
            objCanvas.context.fillText('Committed!', 400, 275);

            objCanvas.context.font = '18px Arial';
            objCanvas.context.fillText('level.earnings == ' + (Math.round(objLevel.earnings  * ((100 - objVictory.earningsCounter)/100))).toString(), 400, 350);
            objCanvas.context.fillText('player.budget == ' + (objPlayer.earnings + (objLevel.earnings * (objVictory.earningsCounter / 100))).toString(), 400, 375);

            if(objVictory.earningsCounter < 100 && objVictory.slideCounter > 50)
            {
                objVictory.earningsCounter += 1;

                if(objVictory.earningsCounter % 5 == 0 && objVictory.earningsCounter < 95)
                {
                    objVictory.objScoreCount.playScore();
                }
                else if(objVictory.earningsCounter == 95)
                {
                    objVictory.objScoreCount.stop();
                    objSounds.purchase.play();
                }
            }

            objVictory.slideCounter += 1;
            if(objVictory.slideCounter == 160)
            {
                objVictory.slide += 1;
                objVictory.slideCounter = 0;
                objPlayer.earnings += objLevel.earnings;
            }
        }
        else if(objVictory.slide == 3)
        {
            objCanvas.context.font = '50px Arial';
            objCanvas.context.fillText('Committed!', 400, 275);

            objCanvas.context.font = '18px Arial';
            objCanvas.context.fillText('level.earnings == 0', 400, 350);
            objCanvas.context.fillText('player.budget == ' + (objPlayer.earnings).toString(), 400, 375);
            objCanvas.context.fillText('Press Space or J', 400, 450);
        }
    };

    objVictory.pressedW = function() { /* Do nothing */ };
    objVictory.pressedS = function() { /* Do nothing */ };
    objVictory.pressedA = function() { /* Do nothing */ };
    objVictory.pressedD = function() { /* Do nothing */ };

    objVictory.pressedJ = function()
    {
        if(objVictory.slide == 3)
        {
            objGame.gameState = 'buildMenu';
            objGame.menuState = 'shop';
            objVictory.objMusic.stop();
            objGame.setInputSleeping();
        }
    };

    objVictory.pressedK = function() { /* Do nothing */ };

    objVictory.pressedSpace = function()
    {
        if(objVictory.slide == 3)
        {
            objGame.gameState = 'buildMenu';
            objGame.menuState = 'shop';
            objVictory.objMusic.stop();
            objGame.setInputSleeping();
        }
    };

    return objVictory;
}

function buildShopMenu()
{
    var objShop = {};

    objShop.objBackground = objUILibrary.shopBackground;
    objShop.objMusic = objSounds.shop;
    objShop.objKeystroke = objSounds.keystroke;

    objShop.flashBalance = 0;
    objShop.flashLevel = 0;
    objShop.activeMenu = 0;
    objShop.subMenu = 0;
    objShop.aryItems =
    [
        [
            {itemName: 'PTO', itemCode: 'pto', cost: 250, itemType: 'consumable', iconImage: objUILibrary.ptoShopIcon, quantityDescription: 'Days left: ', itemDescription: 'Keeps you going if bugs get you down'},
            {itemName: 'Nespresso Capsule', itemCode: 'nespresso', cost: 200, itemType: 'consumable', iconImage: objUILibrary.nespressoCapsuleIcon, quantityDescription: 'On Hand: ', itemDescription: 'Drink one of these for some pep in your step'},
            {itemName: 'Windows Updates', itemCode: 'windate', cost: 200, itemType: 'consumable', iconImage: objUILibrary.windowsUpdatesIcon, quantityDescription: 'Updates Installed: ', itemDescription: 'Has the side effect of making your laptop overheat faster'}
        ],
        [
            {itemName: 'Notepad', itemCode: 'notepad', cost: 200, itemType: 'IDE', iconImage: objUILibrary.notepadIcon, quantityDescription: 'Version: ', itemDescription: 'All developers start somewhere'},
            {itemName: 'Notepad++', itemCode: 'notepadplusplus', cost: 500, itemType: 'IDE', iconImage: objUILibrary.notepadplusplusIcon, quantityDescription: 'Version: ', itemDescription: 'A bit lacking but lightweight and easy to use.'},
            {itemName: 'Far', itemCode: 'far', cost: 800, itemType: 'IDE', iconImage: objUILibrary.farIcon, quantityDescription: 'Version: ', itemDescription: 'Multi-use and small but loved by a die-hard crowd.'}
        ],
        [
            {itemName: 'Eclipse', itemCode: 'eclipse', cost: 1200, itemType: 'IDE', iconImage: objUILibrary.eclipseIcon, quantityDescription: 'Version: ', itemDescription: 'Multi-faceted able to tackle a wide range of problems'},
            {itemName: 'Dreamweaver', itemCode: 'dreamweaver', cost: 1200, itemType: 'IDE', iconImage: objUILibrary.dreamweaverIcon, quantityDescription: 'Version: ', itemDescription: 'Very good at one thing but not good for much else'},
            {itemName: 'Mule Studio', itemCode: 'muleStudio', cost: 1500, itemType: 'IDE', iconImage: objUILibrary.muleStudioIcon, quantityDescription: 'Version: ', itemDescription: 'Great at tackling a single focus with a variety of tools'}
        ],
        [
            {itemName: 'IntelliJ', itemCode: 'intelliJ', cost: 1500, itemType: 'IDE', iconImage: objUILibrary.intelliJIcon, quantityDescription: 'Version: ', itemDescription: 'Extensible. Flexible.'},
            {itemName: 'Netbeans', itemCode: 'netbeans', cost: 1200, itemType: 'IDE', iconImage: objUILibrary.netbeansIcon, quantityDescription: 'Version: ', itemDescription: 'Not as flexible as others but not as focused as some.'}
        ]
    ];

    objShop.render = function()
    {
        // General shop stuff not specific to a sub menu
        objCanvas.context.drawImage
        (
            objShop.objBackground,
            0,
            0,
            800,
            600,
            0,
            0,
            800,
            600
        );

        objCanvas.context.font = '18px Arial';
        objCanvas.context.textAlign = 'right';
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.fillText('Next Level - Press Space >', 780, 550);

        objCanvas.context.font = '14px Arial';
        objCanvas.context.textAlign = 'left';
        objCanvas.context.fillStyle = "#FFFFFF";

        if(objShop.flashBalance > 0)
        {
            objCanvas.context.fillStyle = "Red";
            objShop.flashBalance -= 1;
        }

        objCanvas.context.font = '12px Arial';
        objCanvas.context.fillText('Budget: ' + objPlayer.earnings, 430, 278);

        objCanvas.context.fillStyle = "#FFFFFF";
        objCanvas.context.fillRect(75, 293 + (60 * objShop.activeMenu), 10, 10);

        for(var i = 0; i < objShop.aryItems[objShop.subMenu].length; i++)
        {
            objCanvas.context.drawImage
            (
                objShop.aryItems[objShop.subMenu][i].iconImage,
                0,
                0,
                50,
                50,
                100,
                270 + (i * 60),
                50,
                50
            );

            objCanvas.context.fillText(objShop.aryItems[objShop.subMenu][i].itemName, 160, 302 + (i * 60));
        }

        // Item Title
        objCanvas.context.font = '22px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillText(objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemName, 578, 325);

        // Item Description
        objCanvas.context.font = '12px Arial';
        objCanvas.context.textAlign = 'left';
        objCanvas.context.fillText(objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemDescription, 430, 370);

        if(objShop.flashLevel > 0)
        {
            objCanvas.context.fillStyle = "Red";
            objShop.flashLevel -= 1;
        }

        // Quantity Description
        if(objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemType == 'consumable')
        {
            objCanvas.context.fillStyle = "#FFFFFF";
            objCanvas.context.fillText(objShop.aryItems[objShop.subMenu][objShop.activeMenu].quantityDescription + objPlayer[objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemCode], 430, 405);
        }
        else
        {
            var textLevel = '';

            if(objPlayer.IDE[objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemCode].level == 10)
            {
                textLevel = 'MAX';
            }
            else
            {
                textLevel = objPlayer.IDE[objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemCode].level;
            }

            objCanvas.context.fillText(objShop.aryItems[objShop.subMenu][objShop.activeMenu].quantityDescription + textLevel, 430, 405);
        }

        // Purchase Text
        var textUpgrade = '';
        objCanvas.context.fillStyle = "#FFFFFF";
        if(objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemType == 'IDE' && objPlayer.IDE[objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemCode].level >= 1 && objPlayer.IDE.active == objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemCode)
        {
            if(objPlayer.IDE[objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemCode].level == 10)
            {
                textUpgrade = 'At highest version';
            }
            else
            {
                textUpgrade = 'Press J to upgrade';
            }

            objCanvas.context.fillText('Already equipped', 430, 432);
            objCanvas.context.fillText(textUpgrade, 430, 450);
        }
        else if(objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemType == 'IDE' && objPlayer.IDE[objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemCode].level >= 1 && objPlayer.IDE.active != objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemCode)
        {
            if(objPlayer.IDE[objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemCode].level == 10)
            {
                textUpgrade = 'At highest version';
            }
            else
            {
                textUpgrade = 'Press J to upgrade';
            }

            objCanvas.context.fillText('Press K to equip', 430, 432);
            objCanvas.context.fillText(textUpgrade, 430, 450);
        }
        else
        {
            objCanvas.context.fillText('Press J to purchase', 430, 450);
        }

        // Cost text
        objCanvas.context.textAlign = 'right';
        objCanvas.context.fillText('Cost: ' + objShop.aryItems[objShop.subMenu][objShop.activeMenu].cost, 740, 450);


        var trianglePath;

        if(objShop.subMenu < 3)
        {
            trianglePath = new Path2D();
            trianglePath.moveTo(70, 440);
            trianglePath.lineTo(90, 440);
            trianglePath.lineTo(80, 450);
            objCanvas.context.fill(trianglePath);
        }

        if(objShop.subMenu > 0)
        {
            trianglePath = new Path2D();
            trianglePath.moveTo(70, 280);
            trianglePath.lineTo(90, 280);
            trianglePath.lineTo(80, 270);
            objCanvas.context.fill(trianglePath);
        }
    };

    objShop.pressedW = function()
    {
        if(objShop.activeMenu == 0 && objShop.subMenu > 0)
        {
            objShop.activeMenu = 2;
            objShop.subMenu -= 1;
        }
        else if(objShop.activeMenu > 0)
        {
            objShop.activeMenu -= 1;
        }

        objShop.objKeystroke.play();
        objGame.setInputSleeping();
    };

    objShop.pressedS = function()
    {
        if(objShop.activeMenu == 2 && objShop.subMenu < 3)
        {
            objShop.activeMenu = 0;
            objShop.subMenu += 1;
        }
        else if(objShop.activeMenu < 2 && objShop.subMenu != 3)
        {
            objShop.activeMenu += 1;
        }
        else if(objShop.activeMenu < 1 && objShop.subMenu == 3)
        {
            objShop.activeMenu += 1;
        }

        objShop.objKeystroke.play();
        objGame.setInputSleeping();
    };

    objShop.pressedA = function() { /* Do nothing */ };
    objShop.pressedD = function() { /* Do nothing */ };

    objShop.pressedJ = function()
    {
        var blnSuccess = objPlayer.purchase(objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemCode, objShop.aryItems[objShop.subMenu][objShop.activeMenu].cost, objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemType);

        if(blnSuccess && objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemType == 'IDE' && objPlayer.IDE[objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemCode].level == 1)
        {
            objShop.aryItems[objShop.subMenu][objShop.activeMenu].cost = objShop.aryItems[objShop.subMenu][objShop.activeMenu].cost * 0.1;
        }

        objGame.setInputSleeping(300);
    };

    objShop.pressedK = function()
    {
        objPlayer.equip(objShop.aryItems[objShop.subMenu][objShop.activeMenu].itemCode);
        objGame.setInputSleeping();
    };

    objShop.pressedSpace = function()
    {
        objGame.gameState = 'nextLevel';
        objGame.menuState = 'none';
        objShop.objMusic.stop();
        objGame.setInputSleeping();
    };

    return objShop;
}

function buildExplanationMenu()
{
    var objExplanation = {};

    objExplanation.player = buildSprite('player');
    objExplanation.lowBug = buildSprite('lowBug');
    objExplanation.mediumBug = buildSprite('mediumBug');
    objExplanation.highBug = buildSprite('highBug');
    objExplanation.todayBug = buildSprite('todayBug');
    objExplanation.bullet = buildSprite('bullet');
    objExplanation.laptop = buildSprite('laptop');

    objExplanation.objMusic = objSounds.explanation;

    objExplanation.slide = 0;
    objExplanation.slideCounter = 0;
    objExplanation.alphaCounter = 0;
    objExplanation.alphaOut = 100;
    objExplanation.moveCounter = 0;

    objExplanation.render = function()
    {
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.fillRect(0, 0, 800, 600);

        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillStyle = colInactive;

        if(objExplanation.slide == 0)
        {
            objExplanation.slideCounter += 1;

            if(objExplanation.slideCounter == 30)
            {
                objExplanation.slideCounter = 0;
                objExplanation.slide += 1;
            }
        }
        else if(objExplanation.slide == 1)
        {
            objCanvas.context.globalAlpha = (objExplanation.alphaCounter / 100);
            objCanvas.context.font = '22px Arial';
            objCanvas.context.fillText('This is you. Developer of Jagged Peak.', 400, 300);
            objExplanation.player.render(375,325);
            objCanvas.context.globalAlpha = 1;

            objExplanation.slideCounter += 1;

            if(objExplanation.slideCounter == 100)
            {
                objExplanation.slideCounter = 0;
                objExplanation.slide += 1;
                objExplanation.alphaCounter = 0;
            }
            else if(objExplanation.alphaCounter < 100)
            {
                objExplanation.alphaCounter += 2;
            }
        }
        else if(objExplanation.slide == 2)
        {
            objExplanation.player.render(375,325 + (225 * (objExplanation.moveCounter / 100)));

            objCanvas.context.globalAlpha = (objExplanation.alphaOut / 100);
            objCanvas.context.font = '22px Arial';
            objCanvas.context.fillText('This is you. Developer of Jagged Peak.', 400, 300);

            objCanvas.context.globalAlpha = (objExplanation.alphaCounter / 100);
            objCanvas.context.fillStyle = "#323232";
            objCanvas.context.fillRect(300, 130, 200, 300);
            objCanvas.context.fillStyle = colInactive;
            objExplanation.lowBug.render(425,146);
            objExplanation.mediumBug.render(425,206);
            objExplanation.highBug.render(425,266);
            objExplanation.todayBug.render(425,326);
            objCanvas.context.font = '38px Arial Bold';
            objCanvas.context.textAlign = 'left';
            objCanvas.context.fillText('?',430,416);
            objCanvas.context.font = '16px Arial';
            objCanvas.context.textAlign = 'center';
            objCanvas.context.fillText('These are the bugs. Ruiners of all perfect deployments.', 400, 25);
            objCanvas.context.textAlign = 'right';
            objCanvas.context.fillText('Low', 390, 170);
            objCanvas.context.fillText('Medium', 390, 230);
            objCanvas.context.fillText('High', 390, 290);
            objCanvas.context.fillText('Today', 390, 350);
            objCanvas.context.fillText('Tombstone', 390, 408);

            objCanvas.context.globalAlpha = 1;

            objExplanation.slideCounter += 1;

            if(objExplanation.slideCounter == 280)
            {
                objExplanation.slideCounter = 0;
                objExplanation.slide += 1;
                objExplanation.alphaCounter = 0;
                objExplanation.alphaOut = 100;
                objExplanation.moveCounter = 0;
            }
            else if(objExplanation.alphaOut > 0)
            {
                objExplanation.alphaOut -= 2;
                objExplanation.moveCounter += 2;
            }
            else if(objExplanation.alphaOut <= 0 && objExplanation.alphaCounter < 100)
            {
                objExplanation.alphaCounter += 2;
            }
        }
        else if(objExplanation.slide == 3)
        {
            objCanvas.context.fillStyle = "#323232";
            objCanvas.context.fillRect(300 - (275 * (objExplanation.moveCounter / 100)), 130, 200, 300);
            objCanvas.context.fillStyle = colInactive;
            objExplanation.player.render(375,550);
            objExplanation.lowBug.render(425 - (275 * (objExplanation.moveCounter / 100)),146);
            objExplanation.mediumBug.render(425 - (275 * (objExplanation.moveCounter / 100)),206);
            objExplanation.highBug.render(425 - (275 * (objExplanation.moveCounter / 100)),266);
            objExplanation.todayBug.render(425 - (275 * (objExplanation.moveCounter / 100)),326);
            objCanvas.context.font = '38px Arial Bold';
            objCanvas.context.textAlign = 'left';
            objCanvas.context.fillText('?',430 - (275 * (objExplanation.moveCounter / 100)),416);
            objCanvas.context.font = '16px Arial';
            objCanvas.context.textAlign = 'right';
            objCanvas.context.fillText('Low', 390 - (275 * (objExplanation.moveCounter / 100)), 170);
            objCanvas.context.fillText('Medium', 390 - (275 * (objExplanation.moveCounter / 100)), 230);
            objCanvas.context.fillText('High', 390 - (275 * (objExplanation.moveCounter / 100)), 290);
            objCanvas.context.fillText('Today', 390 - (275 * (objExplanation.moveCounter / 100)), 350);
            objCanvas.context.fillText('Tombstone', 390 - (275 * (objExplanation.moveCounter / 100)), 408);
            objCanvas.context.textAlign = 'center';

            objCanvas.context.globalAlpha = (objExplanation.alphaOut / 100);
            objCanvas.context.fillText('These are the bugs. Ruiners of all perfect deployments.', 400, 25);

            objCanvas.context.globalAlpha = (objExplanation.alphaCounter / 100);
            objCanvas.context.fillStyle = "#323232";
            objCanvas.context.fillRect(300, 130, 200, 120);
            objCanvas.context.fillStyle = colInactive;
            objExplanation.bullet.render(434,158);
            objExplanation.laptop.render(425,202);
            objCanvas.context.font = '16px Arial';
            objCanvas.context.fillText('Use your powerful Laptop and faithful IDE to destroy them.', 400, 25);
            objCanvas.context.textAlign = 'right';
            objCanvas.context.fillText('IDE (J)', 390, 170);
            objCanvas.context.fillText('Laptop (K)', 390, 220);

            objCanvas.context.globalAlpha = 1;

            objExplanation.slideCounter += 1;

            if(objExplanation.slideCounter == 280)
            {
                objExplanation.slideCounter = 0;
                objExplanation.slide += 1;
                objExplanation.alphaCounter = 0;
                objExplanation.alphaOut = 100;
                objExplanation.moveCounter = 0;
            }
            else if(objExplanation.alphaOut > 0)
            {
                objExplanation.alphaOut -= 2;
                objExplanation.moveCounter += 2;
            }
            else if(objExplanation.slideCounter > 70 && objExplanation.alphaCounter < 100)
            {
                objExplanation.alphaCounter += 2;
            }
        }
        else if(objExplanation.slide == 4)
        {
            objCanvas.context.fillStyle = "#323232";
            objCanvas.context.fillRect(25, 130, 200, 300);
            objCanvas.context.fillRect(300 + (275 * (objExplanation.moveCounter / 100)), 130, 200, 120);
            objCanvas.context.fillStyle = colInactive;
            objExplanation.player.render(375,550);
            objExplanation.lowBug.render(150,146);
            objExplanation.mediumBug.render(150,206);
            objExplanation.highBug.render(150,266);
            objExplanation.todayBug.render(150,326);
            objExplanation.bullet.render(434 + (275 * (objExplanation.moveCounter / 100)),158);
            objExplanation.laptop.render(425 + (275 * (objExplanation.moveCounter / 100)),202);
            objCanvas.context.font = '38px Arial Bold';
            objCanvas.context.textAlign = 'left';
            objCanvas.context.fillText('?',155,416);
            objCanvas.context.font = '16px Arial';
            objCanvas.context.textAlign = 'right';
            objCanvas.context.fillText('Low', 115, 170);
            objCanvas.context.fillText('Medium', 115, 230);
            objCanvas.context.fillText('High', 115, 290);
            objCanvas.context.fillText('Today', 115, 350);
            objCanvas.context.fillText('Tombstone', 115, 408);
            objCanvas.context.fillText('IDE (J)', 390 + (275 * (objExplanation.moveCounter / 100)), 170);
            objCanvas.context.fillText('Laptop (K)', 390 + (275 * (objExplanation.moveCounter / 100)), 220);
            objCanvas.context.textAlign = 'center';

            objCanvas.context.globalAlpha = (objExplanation.alphaOut / 100);
            objCanvas.context.fillText('Use your powerful Laptop and faithful IDE to destroy them.', 400, 25);

            objCanvas.context.globalAlpha = (objExplanation.alphaCounter / 100);
            objCanvas.context.fillText('Press Space or J to begin.', 400, 300);

            objCanvas.context.globalAlpha = 1;

            objExplanation.slideCounter += 1;

            if(objExplanation.alphaOut > 0)
            {
                objExplanation.alphaOut -= 2;
                objExplanation.moveCounter += 2;
            }
            else if(objExplanation.slideCounter > 70 && objExplanation.alphaCounter < 100)
            {
                objExplanation.alphaCounter += 2;
            }
        }
    };

    objExplanation.pressedW = function() { /* Do nothing */ };
    objExplanation.pressedS = function() { /* Do nothing */ };
    objExplanation.pressedA = function() { /* Do nothing */ };
    objExplanation.pressedD = function() { /* Do nothing */ };

    objExplanation.pressedJ = function()
    {
        objGame.gameState = 'newGame';
        objGame.menuState = 'none';
        objGame.setInputSleeping();
        objExplanation.objMusic.stop();
    };

    objExplanation.pressedK = function() { /* Do nothing */ };

    objExplanation.pressedSpace = function()
    {
        objGame.gameState = 'newGame';
        objGame.menuState = 'none';
        objGame.setInputSleeping();
        objExplanation.objMusic.stop();
    };

    return objExplanation;
}

function buildOptionsMenu()
{
    var objOptions = {};

    objOptions.objBackground = objUILibrary.optionsBackground;
    objOptions.objOptionOff = objUILibrary.optionOff;
    objOptions.objOptionOn = objUILibrary.optionOn;
    objOptions.objMusic = objSounds.shop;
    objOptions.objKeystroke = objSounds.keystroke;
    objOptions.objEquip = objSounds.equip;

    objOptions.menuSelection = 0;

    objOptions.render = function()
    {
        objCanvas.context.drawImage
        (
            objOptions.objBackground,
            0,
            0,
            800,
            600,
            0,
            0,
            800,
            600
        );

        objCanvas.context.fillStyle = '#FFFFFF';

        objCanvas.context.globalAlpha = 0.2;
        objCanvas.context.fillRect(150, 157 + (50 * objOptions.menuSelection), 500, 30);
        objCanvas.context.globalAlpha = 1;

        objCanvas.context.font = '50px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillText('Options ', 400, 70);

        objCanvas.context.font = '23px Arial';
        objCanvas.context.textAlign = 'right';
        objCanvas.context.fillText('Enable Music: ', 430, 180);
        objCanvas.context.fillText('Enable Sound Effects: ', 430, 230);

        if(objGame.musicOff)
        {
            objCanvas.context.drawImage
            (
                objOptions.objOptionOff,
                0,
                0,
                25,
                25,
                500,
                160,
                25,
                25
            );
        }
        else
        {
            objCanvas.context.drawImage
            (
                objOptions.objOptionOn,
                0,
                0,
                25,
                25,
                500,
                160,
                25,
                25
            );
        }

        if(objGame.soundEffectsOff)
        {
            objCanvas.context.drawImage
            (
                objOptions.objOptionOff,
                0,
                0,
                25,
                25,
                500,
                210,
                25,
                25
            );
        }
        else
        {
            objCanvas.context.drawImage
            (
                objOptions.objOptionOn,
                0,
                0,
                25,
                25,
                500,
                210,
                25,
                25
            );
        }
    };

    objOptions.pressedW = function()
    {
        if(objOptions.menuSelection == 0)
        {
            objOptions.menuSelection = 1;
        }
        else
        {
            objOptions.menuSelection = 0;
        }

        objOptions.objKeystroke.play();
        objGame.setInputSleeping();
    };

    objOptions.pressedS = function()
    {
        if(objOptions.menuSelection == 1)
        {
            objOptions.menuSelection = 0;
        }
        else
        {
            objOptions.menuSelection = 1;
        }

        objOptions.objKeystroke.play();
        objGame.setInputSleeping();
    };

    objOptions.pressedA = function() { /* Do nothing */ };
    objOptions.pressedD = function() { /* Do nothing */ };

    objOptions.pressedJ = function()
    {
        if(objOptions.menuSelection == 0)
        {
            objGame.musicOff = !objGame.musicOff;
            if(!objGame.musicOff)
            {
                objOptions.objMusic.playMusic();
            }
            else
            {
                objOptions.objMusic.stop();
            }
        }
        else if(objOptions.menuSelection == 1)
        {
            objGame.soundEffectsOff = !objGame.soundEffectsOff;
        }

        objOptions.objEquip.play();
        objGame.setInputSleeping();
    };

    objOptions.pressedK = function()
    {
        objOptions.objMusic.stop();
        objOptions.objKeystroke.play();
        objGame.setInputSleeping();
        objGame.gameState = 'buildMenu';
        objGame.menuState = 'title';
    };

    objOptions.pressedSpace = function()
    {
        if(objOptions.menuSelection == 0)
        {
            objGame.musicOff = !objGame.musicOff;
            if(!objGame.musicOff)
            {
                objOptions.objMusic.playMusic();
            }
            else
            {
                objOptions.objMusic.stop();
            }

        }
        else if(objOptions.menuSelection == 1)
        {
            objGame.soundEffectsOff = !objGame.soundEffectsOff;
        }

        objOptions.objEquip.play();
        objGame.setInputSleeping();
    };

    return objOptions
}