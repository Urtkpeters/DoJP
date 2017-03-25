var objMenu = {};
var colInactive = '#FFFFFF';
var colActive = '#950740';
var objUILibrary = {};

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
    var objNewMenu = {};

    objNewMenu.objImage = objUILibrary.splashBackground.objImage;
    objNewMenu.objLogo = objUILibrary.jaggedPeakLogo.objImage;
    objNewMenu.objMusic = objMusic.intro;
    objNewMenu.objKeystroke = objSounds.keystroke;

    objNewMenu.render = function()
    {
        objCanvas.context.drawImage
        (
            objNewMenu.objImage,
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
        objCanvas.context.font = '40px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillText('Developers of', 400, 130);
        objCanvas.context.drawImage
        (
            objNewMenu.objLogo,
            0,
            0,
            613,
            80,
            100,
            180,
            613,
            70
        );

        objCanvas.context.font = '18px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillText('Press Space or J', 400, 400);
    };

    objNewMenu.pressedJ = function()
    {
        objGame.gameState = 'buildMenu';
        objGame.menuState = 'title';
        objGame.setInputSleeping();
        objNewMenu.objKeystroke.play();
    };

    objNewMenu.pressedSpace = function()
    {
        objGame.gameState = 'buildMenu';
        objGame.menuState = 'title';
        objGame.setInputSleeping();
        objNewMenu.objKeystroke.play();
    };

    return objNewMenu;
}

function buildTitleMenu()
{
    var objNewMenu = {};

    objNewMenu.objImage = objUILibrary.titleBackground.objImage;
    objNewMenu.objLogo = objUILibrary.jaggedPeakLogo.objImage;
    objNewMenu.objMusic = objMusic.intro;
    objNewMenu.objKeystroke = objSounds.keystroke;

    objNewMenu.activeMenu = 0;
    objNewMenu.menuOptions =
    [
        {textColor: colActive, gameLink: 'buildMenu', menuLink: 'explanation'},
        {textColor: colInactive, gameLink: 'menu', menuLink: 'title'},
        {textColor: colInactive, gameLink: 'buildMenu', menuLink: 'options'},
        {textColor: colInactive, gameLink: 'buildMenu', menuLink: 'explanation'}
    ];

    objNewMenu.render = function()
    {
        objCanvas.context.drawImage(objNewMenu.objImage, 0, 0, 800, 600, 0, 0, 800, 600);

        objCanvas.context.fillStyle = '#FFFFFF';
        objCanvas.context.font = '40px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillText('Developers of', 400, 130);
        objCanvas.context.drawImage
        (
            objNewMenu.objLogo,
            0,
            0,
            613,
            80,
            100,
            180,
            613,
            70
        );

        objCanvas.context.font = '18px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillStyle = objNewMenu.menuOptions[0].textColor;
        objCanvas.context.fillText('New Game', 400, 300);
        objCanvas.context.fillStyle = objNewMenu.menuOptions[1].textColor;
        objCanvas.context.fillText('Load Game', 400, 350);
        objCanvas.context.fillStyle = objNewMenu.menuOptions[2].textColor;
        objCanvas.context.fillText('Options', 400, 400);
        objCanvas.context.fillStyle = objNewMenu.menuOptions[3].textColor;
        objCanvas.context.fillText('Demo Level', 400, 450);
    };

    objNewMenu.pressedW = function()
    {
        if(objNewMenu.activeMenu == 0)
        {
            objNewMenu.activeMenu = 3;
        }
        else
        {
            objNewMenu.activeMenu -= 1;
        }

        for(var i = 0; i < objNewMenu.menuOptions.length; i++)
        {
            objNewMenu.menuOptions[i].textColor = colInactive;
        }

        objNewMenu.menuOptions[objNewMenu.activeMenu].textColor = colActive;
        objNewMenu.objKeystroke.play();
        objGame.setInputSleeping();
    };

    objNewMenu.pressedS = function()
    {
        if(objNewMenu.activeMenu == 3)
        {
            objNewMenu.activeMenu = 0;
        }
        else
        {
            objNewMenu.activeMenu += 1;
        }

        for(var i = 0; i < objNewMenu.menuOptions.length; i++)
        {
            objNewMenu.menuOptions[i].textColor = colInactive;
        }

        objNewMenu.menuOptions[objNewMenu.activeMenu].textColor = colActive;
        objNewMenu.objKeystroke.play();
        objGame.setInputSleeping();
    };

    objNewMenu.pressedJ = function()
    {
        objNewMenu.activate();
    };

    objNewMenu.pressedK = function()
    {
        objGame.gameState = 'buildMenu';
        objGame.menuState = 'splash';
        objGame.setInputSleeping();
    };

    objNewMenu.pressedSpace = function()
    {
        objNewMenu.activate();
    };

    objNewMenu.activate = function()
    {
        if(objNewMenu.activeMenu == 3)
        {
            objPlayer.nextLevel = 98;
        }
        else if(objNewMenu.activeMenu == 1)
        {
            loadGame();
        }

        objNewMenu.objKeystroke.play();
        objNewMenu.objMusic.stop();
        objGame.gameState = objNewMenu.menuOptions[objNewMenu.activeMenu].gameLink;
        objGame.menuState = objNewMenu.menuOptions[objNewMenu.activeMenu].menuLink;
        objGame.setInputSleeping();
    };

    return objNewMenu;
}

function buildGameoverMenu()
{
    var objNewMenu = {};

    objNewMenu.musicPlaying = false;
    objNewMenu.slide = 0;
    objNewMenu.slideCounter = 0;
    objNewMenu.slide0alpha = 0;
    objNewMenu.slide1alpha = 0;
    objNewMenu.slide2alpha = 0;
    objNewMenu.objMusic = objMusic.gameover;

    objNewMenu.render = function()
    {
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.fillRect(0, 0, 800, 600);

        if(objNewMenu.slide < 3)
        {
            objNewMenu.slideCounter += 1;

            if(objNewMenu.slideCounter == 50)
            {
                objNewMenu.slide += 1;
                objNewMenu.slideCounter = 0;
            }
        }

        if(objNewMenu.slide == 0)
        {
            objNewMenu.slide0alpha += 0.02;
        }
        else if(objNewMenu.slide == 1)
        {
            objNewMenu.slide1alpha += 0.02;
        }
        else if(objNewMenu.slide == 3)
        {
            objNewMenu.slide2alpha += 0.02;
        }

        objCanvas.context.font = '50px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillStyle = colInactive;
        objCanvas.context.globalAlpha = objNewMenu.slide0alpha;
        objCanvas.context.fillText('Game Over', 400, 275);

        objCanvas.context.font = '18px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillStyle = colInactive;
        objCanvas.context.globalAlpha = objNewMenu.slide1alpha;
        objCanvas.context.fillText('Final Score == ' + objPlayer.score.toString(), 400, 330);

        objCanvas.context.globalAlpha = objNewMenu.slide2alpha;
        objCanvas.context.fillText('Press Space or J', 400, 400);

        objCanvas.context.globalAlpha = 1;
    };

    objNewMenu.pressedJ = function()
    {
        objGame.gameState = 'buildMenu';
        objGame.menuState = 'splash';
        objNewMenu.objMusic.stop();
        objGame.setInputSleeping();
    };

    objNewMenu.pressedSpace = function()
    {
        objNewMenu.objMusic.stop();
        objGame.gameState = 'buildMenu';
        objGame.menuState = 'splash';
        objGame.setInputSleeping();
    };

    return objNewMenu
}

function buildVictoryMenu()
{
    var objNewMenu = {};

    objNewMenu.earningsCounter = 0;
    objNewMenu.slide = 0;
    objNewMenu.slideCounter = 0;
    objNewMenu.objMusic = objMusic.victory;
    objNewMenu.objScoreCount = objSounds.scoreCount;

    objNewMenu.render = function()
    {
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.fillRect(0, 0, 800, 600);

        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillStyle = colInactive;

        if(objNewMenu.slide == 0)
        {
            objCanvas.context.font = '50px Arial';
            objCanvas.context.fillText('Committing code...', 400, 225 + (objNewMenu.slideCounter));

            objNewMenu.slideCounter += 1;
            if(objNewMenu.slideCounter == 50)
            {
                objNewMenu.slide += 1;
                objNewMenu.slideCounter = 0;
            }
        }
        else if(objNewMenu.slide == 1)
        {
            objCanvas.context.font = '50px Arial';
            objCanvas.context.fillText('Committed!', 400, 275);

            objNewMenu.slideCounter += 1;
            if(objNewMenu.slideCounter == 20)
            {
                objNewMenu.slide += 1;
                objNewMenu.slideCounter = 0;
            }
        }
        else if(objNewMenu.slide == 2)
        {
            objCanvas.context.font = '50px Arial';
            objCanvas.context.fillText('Committed!', 400, 275);

            objCanvas.context.font = '18px Arial';
            objCanvas.context.fillText('level.earnings == ' + (Math.round(objLevel.earnings  * ((100 - objNewMenu.earningsCounter)/100))).toString(), 400, 350);
            objCanvas.context.fillText('player.budget == ' + (Math.round(objPlayer.earnings + (objLevel.earnings * (objNewMenu.earningsCounter / 100)))).toString(), 400, 375);
            objCanvas.context.fillText('player.score == ' + (Math.round(objPlayer.score + (objLevel.earnings * (objNewMenu.earningsCounter / 100)))).toString(), 400, 400);

            if(objNewMenu.earningsCounter < 100 && objNewMenu.slideCounter > 50)
            {
                objNewMenu.earningsCounter += 1;

                if(objNewMenu.earningsCounter % 5 == 0 && objNewMenu.earningsCounter < 95)
                {
                    objNewMenu.objScoreCount.playScore();
                }
                else if(objNewMenu.earningsCounter == 95)
                {
                    objNewMenu.objScoreCount.stop();
                    objSounds.purchase.play();
                }
            }

            objNewMenu.slideCounter += 1;
            if(objNewMenu.slideCounter == 160)
            {
                objNewMenu.slide += 1;
                objNewMenu.slideCounter = 0;
                objPlayer.earnings += objLevel.earnings;
                objPlayer.score += objLevel.earnings;
            }
        }
        else if(objNewMenu.slide == 3)
        {
            objCanvas.context.font = '50px Arial';
            objCanvas.context.fillText('Committed!', 400, 275);

            objCanvas.context.font = '18px Arial';
            objCanvas.context.fillText('level.earnings == 0', 400, 350);
            objCanvas.context.fillText('player.budget == ' + (objPlayer.earnings).toString(), 400, 375);
            objCanvas.context.fillText('player.score == ' + (objPlayer.score).toString(), 400, 400);
            objCanvas.context.fillText('Press Space or J', 400, 475);
        }
    };

    objNewMenu.pressedJ = function()
    {
        objGame.gameState = 'buildMenu';
        objGame.menuState = 'shop';
        objNewMenu.objMusic.stop();
        objGame.setInputSleeping();
    };

    objNewMenu.pressedSpace = function()
    {
        objGame.gameState = 'buildMenu';
        objGame.menuState = 'shop';
        objNewMenu.objMusic.stop();
        objGame.setInputSleeping();
    };

    return objNewMenu;
}

function buildShopMenu()
{
    var objNewMenu = {};

    objNewMenu.objBackground = objUILibrary.shopBackground.objImage;
    objNewMenu.objMusic = objMusic.shop;
    objNewMenu.objKeystroke = objSounds.keystroke;

    objNewMenu.flashBalance = 0;
    objNewMenu.flashLevel = 0;
    objNewMenu.activeMenu = 0;
    objNewMenu.subMenu = 0;
    objNewMenu.aryItems =
    [
        [
            {itemName: 'PTO', itemCode: 'pto', cost: 250, itemType: 'consumable', iconImage: objUILibrary.ptoShopIcon.objImage, quantityDescription: 'Days left: ', itemDescription: 'Keeps you going if bugs get you down'},
            {itemName: 'Nespresso Capsule', itemCode: 'nespresso', cost: 200, itemType: 'consumable', iconImage: objUILibrary.nespressoCapsuleIcon.objImage, quantityDescription: 'On Hand: ', itemDescription: 'Drink one of these for some pep in your step'},
            {itemName: 'Windows Updates', itemCode: 'windate', cost: 200, itemType: 'consumable', iconImage: objUILibrary.windowsUpdatesIcon.objImage, quantityDescription: 'Updates Installed: ', itemDescription: 'Has the side effect of making your laptop overheat faster'}
        ],
        [
            {itemName: 'Notepad', itemCode: 'notepad', cost: 200, itemType: 'IDE', iconImage: objUILibrary.notepadIcon.objImage, quantityDescription: 'Version: ', itemDescription: 'All developers start somewhere'},
            {itemName: 'Notepad++', itemCode: 'notepadplusplus', cost: 500, itemType: 'IDE', iconImage: objUILibrary.notepadplusplusIcon.objImage, quantityDescription: 'Version: ', itemDescription: 'A bit lacking but lightweight and easy to use.'},
            {itemName: 'Far', itemCode: 'far', cost: 800, itemType: 'IDE', iconImage: objUILibrary.farIcon.objImage, quantityDescription: 'Version: ', itemDescription: 'Multi-use and small but loved by a die-hard crowd.'}
        ],
        [
            {itemName: 'Eclipse', itemCode: 'eclipse', cost: 1200, itemType: 'IDE', iconImage: objUILibrary.eclipseIcon.objImage, quantityDescription: 'Version: ', itemDescription: 'Multi-faceted able to tackle a wide range of problems'},
            {itemName: 'Dreamweaver', itemCode: 'dreamweaver', cost: 1200, itemType: 'IDE', iconImage: objUILibrary.dreamweaverIcon.objImage, quantityDescription: 'Version: ', itemDescription: 'Very good at one thing but not good for much else'},
            {itemName: 'Mule Studio', itemCode: 'muleStudio', cost: 1500, itemType: 'IDE', iconImage: objUILibrary.muleStudioIcon.objImage, quantityDescription: 'Version: ', itemDescription: 'Great at tackling a single focus with a variety of tools'}
        ],
        [
            {itemName: 'IntelliJ', itemCode: 'intelliJ', cost: 1500, itemType: 'IDE', iconImage: objUILibrary.intelliJIcon.objImage, quantityDescription: 'Version: ', itemDescription: 'Extensible. Flexible.'},
            {itemName: 'Netbeans', itemCode: 'netbeans', cost: 1200, itemType: 'IDE', iconImage: objUILibrary.netbeansIcon.objImage, quantityDescription: 'Version: ', itemDescription: 'Not as flexible as others but not as focused as some.'}
        ]
    ];

    for(var i = 0; i < objNewMenu.aryItems.length; i++)
    {
        for(var j = 0; j < objNewMenu.aryItems[i].length; j++)
        {
            if(objNewMenu.aryItems[i][j].itemType == 'IDE' && objNewMenu.aryItems[i][j].itemCode != 'notepad' && objPlayer.IDE[objNewMenu.aryItems[i][j].itemCode].level > 0)
            {
                objNewMenu.aryItems[i][j].cost = objNewMenu.aryItems[i][j].cost * 0.1;
            }
        }
    }

    objNewMenu.render = function()
    {
        // General shop stuff not specific to a sub menu
        objCanvas.context.drawImage
        (
            objNewMenu.objBackground,
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
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.textAlign = 'right';
        objCanvas.context.fillText('Next Level - Press Space >', 780, 550);

        if(objGame.loggedIn)
        {
            objCanvas.context.textAlign = 'left';
            objCanvas.context.fillText('< Save and Exit - Press G', 20, 550);
        }

        objCanvas.context.font = '14px Arial';
        objCanvas.context.textAlign = 'left';
        objCanvas.context.fillStyle = "#FFFFFF";

        if(objNewMenu.flashBalance > 0)
        {
            objCanvas.context.fillStyle = "Red";
            objNewMenu.flashBalance -= 1;
        }

        objCanvas.context.font = '12px Arial';
        objCanvas.context.fillText('Budget: ' + objPlayer.earnings, 430, 278);

        objCanvas.context.fillStyle = "#FFFFFF";
        objCanvas.context.fillRect(75, 293 + (60 * objNewMenu.activeMenu), 10, 10);

        for(var i = 0; i < objNewMenu.aryItems[objNewMenu.subMenu].length; i++)
        {
            objCanvas.context.drawImage
            (
                objNewMenu.aryItems[objNewMenu.subMenu][i].iconImage,
                0,
                0,
                50,
                50,
                100,
                270 + (i * 60),
                50,
                50
            );

            objCanvas.context.fillText(objNewMenu.aryItems[objNewMenu.subMenu][i].itemName, 160, 302 + (i * 60));
        }

        // Item Title
        objCanvas.context.font = '22px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillText(objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemName, 578, 325);

        // Item Description
        objCanvas.context.font = '12px Arial';
        objCanvas.context.textAlign = 'left';
        objCanvas.context.fillText(objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemDescription, 430, 370);

        if(objNewMenu.flashLevel > 0)
        {
            objCanvas.context.fillStyle = "Red";
            objNewMenu.flashLevel -= 1;
        }

        // Quantity Description
        if(objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemType == 'consumable')
        {
            objCanvas.context.fillStyle = "#FFFFFF";
            objCanvas.context.fillText(objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].quantityDescription + objPlayer[objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemCode], 430, 405);
        }
        else
        {
            var textLevel = '';

            if(objPlayer.IDE[objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemCode].level == 10)
            {
                textLevel = 'MAX';
            }
            else
            {
                textLevel = objPlayer.IDE[objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemCode].level;
            }

            objCanvas.context.fillText(objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].quantityDescription + textLevel, 430, 405);
        }

        // Purchase Text
        var textUpgrade = '';
        objCanvas.context.fillStyle = "#FFFFFF";
        if(objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemType == 'IDE' && objPlayer.IDE[objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemCode].level >= 1 && objPlayer.IDE.active == objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemCode)
        {
            if(objPlayer.IDE[objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemCode].level == 10)
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
        else if(objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemType == 'IDE' && objPlayer.IDE[objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemCode].level >= 1 && objPlayer.IDE.active != objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemCode)
        {
            if(objPlayer.IDE[objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemCode].level == 10)
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
        objCanvas.context.fillText('Cost: ' + objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].cost, 740, 450);


        var trianglePath;

        if(objNewMenu.subMenu < 3)
        {
            trianglePath = new Path2D();
            trianglePath.moveTo(70, 440);
            trianglePath.lineTo(90, 440);
            trianglePath.lineTo(80, 450);
            objCanvas.context.fill(trianglePath);
        }

        if(objNewMenu.subMenu > 0)
        {
            trianglePath = new Path2D();
            trianglePath.moveTo(70, 280);
            trianglePath.lineTo(90, 280);
            trianglePath.lineTo(80, 270);
            objCanvas.context.fill(trianglePath);
        }
    };

    objNewMenu.pressedW = function()
    {
        if(objNewMenu.activeMenu == 0 && objNewMenu.subMenu > 0)
        {
            objNewMenu.activeMenu = 2;
            objNewMenu.subMenu -= 1;
        }
        else if(objNewMenu.activeMenu > 0)
        {
            objNewMenu.activeMenu -= 1;
        }

        objNewMenu.objKeystroke.play();
        objGame.setInputSleeping();
    };

    objNewMenu.pressedS = function()
    {
        if(objNewMenu.activeMenu == 2 && objNewMenu.subMenu < 3)
        {
            objNewMenu.activeMenu = 0;
            objNewMenu.subMenu += 1;
        }
        else if(objNewMenu.activeMenu < 2 && objNewMenu.subMenu != 3)
        {
            objNewMenu.activeMenu += 1;
        }
        else if(objNewMenu.activeMenu < 1 && objNewMenu.subMenu == 3)
        {
            objNewMenu.activeMenu += 1;
        }

        objNewMenu.objKeystroke.play();
        objGame.setInputSleeping();
    };

    objNewMenu.pressedJ = function()
    {
        var blnSuccess = objPlayer.purchase(objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemCode, objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].cost, objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemType);

        if(blnSuccess && objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemType == 'IDE' && objPlayer.IDE[objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemCode].level == 1)
        {
            objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].cost = objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].cost * 0.1;
        }

        objGame.setInputSleeping(300);
    };

    objNewMenu.pressedK = function()
    {
        objPlayer.equip(objNewMenu.aryItems[objNewMenu.subMenu][objNewMenu.activeMenu].itemCode);
        objGame.setInputSleeping();
    };

    objNewMenu.pressedSpace = function()
    {
        objGame.gameState = 'nextLevel';
        objGame.menuState = 'none';
        objNewMenu.objMusic.stop();
        objGame.setInputSleeping();
    };

    objNewMenu.pressedG = function()
    {
        saveGame();
        objGame.gameState = 'buildMenu';
        objGame.menuState = 'splash';
    };

    return objNewMenu;
}

function buildExplanationMenu()
{
    var objNewMenu = {};

    objNewMenu.player = buildSprite('player');
    objNewMenu.lowBug = buildSprite('lowBug');
    objNewMenu.mediumBug = buildSprite('mediumBug');
    objNewMenu.highBug = buildSprite('highBug');
    objNewMenu.todayBug = buildSprite('todayBug');
    objNewMenu.bullet = buildSprite('bullet');
    objNewMenu.laptop = buildSprite('laptop');

    objNewMenu.objMusic = objMusic.explanation;

    objNewMenu.slide = 0;
    objNewMenu.slideCounter = 0;
    objNewMenu.alphaCounter = 0;
    objNewMenu.alphaOut = 100;
    objNewMenu.moveCounter = 0;

    objNewMenu.render = function()
    {
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.fillRect(0, 0, 800, 600);

        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillStyle = colInactive;

        if(objNewMenu.slide == 0)
        {
            objNewMenu.slideCounter += 1;

            if(objNewMenu.slideCounter == 30)
            {
                objNewMenu.slideCounter = 0;
                objNewMenu.slide += 1;
            }
        }
        else if(objNewMenu.slide == 1)
        {
            objCanvas.context.globalAlpha = (objNewMenu.alphaCounter / 100);
            objCanvas.context.font = '22px Arial';
            objCanvas.context.fillText('This is you. Developer of Jagged Peak.', 400, 300);
            objNewMenu.player.render(375,325);
            objCanvas.context.globalAlpha = 1;

            objNewMenu.slideCounter += 1;

            if(objNewMenu.slideCounter == 100)
            {
                objNewMenu.slideCounter = 0;
                objNewMenu.slide += 1;
                objNewMenu.alphaCounter = 0;
            }
            else if(objNewMenu.alphaCounter < 100)
            {
                objNewMenu.alphaCounter += 2;
            }
        }
        else if(objNewMenu.slide == 2)
        {
            objNewMenu.player.render(375,325 + (225 * (objNewMenu.moveCounter / 100)));

            objCanvas.context.globalAlpha = (objNewMenu.alphaOut / 100);
            objCanvas.context.font = '22px Arial';
            objCanvas.context.fillText('This is you. Developer of Jagged Peak.', 400, 300);

            objCanvas.context.globalAlpha = (objNewMenu.alphaCounter / 100);
            objCanvas.context.fillStyle = "#323232";
            objCanvas.context.fillRect(300, 130, 200, 300);
            objCanvas.context.fillStyle = colInactive;
            objNewMenu.lowBug.render(425,146);
            objNewMenu.mediumBug.render(425,206);
            objNewMenu.highBug.render(425,266);
            objNewMenu.todayBug.render(425,326);
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

            objNewMenu.slideCounter += 1;

            if(objNewMenu.slideCounter == 280)
            {
                objNewMenu.slideCounter = 0;
                objNewMenu.slide += 1;
                objNewMenu.alphaCounter = 0;
                objNewMenu.alphaOut = 100;
                objNewMenu.moveCounter = 0;
            }
            else if(objNewMenu.alphaOut > 0)
            {
                objNewMenu.alphaOut -= 2;
                objNewMenu.moveCounter += 2;
            }
            else if(objNewMenu.alphaOut <= 0 && objNewMenu.alphaCounter < 100)
            {
                objNewMenu.alphaCounter += 2;
            }
        }
        else if(objNewMenu.slide == 3)
        {
            objCanvas.context.fillStyle = "#323232";
            objCanvas.context.fillRect(300 - (275 * (objNewMenu.moveCounter / 100)), 130, 200, 300);
            objCanvas.context.fillStyle = colInactive;
            objNewMenu.player.render(375,550);
            objNewMenu.lowBug.render(425 - (275 * (objNewMenu.moveCounter / 100)),146);
            objNewMenu.mediumBug.render(425 - (275 * (objNewMenu.moveCounter / 100)),206);
            objNewMenu.highBug.render(425 - (275 * (objNewMenu.moveCounter / 100)),266);
            objNewMenu.todayBug.render(425 - (275 * (objNewMenu.moveCounter / 100)),326);
            objCanvas.context.font = '38px Arial Bold';
            objCanvas.context.textAlign = 'left';
            objCanvas.context.fillText('?',430 - (275 * (objNewMenu.moveCounter / 100)),416);
            objCanvas.context.font = '16px Arial';
            objCanvas.context.textAlign = 'right';
            objCanvas.context.fillText('Low', 390 - (275 * (objNewMenu.moveCounter / 100)), 170);
            objCanvas.context.fillText('Medium', 390 - (275 * (objNewMenu.moveCounter / 100)), 230);
            objCanvas.context.fillText('High', 390 - (275 * (objNewMenu.moveCounter / 100)), 290);
            objCanvas.context.fillText('Today', 390 - (275 * (objNewMenu.moveCounter / 100)), 350);
            objCanvas.context.fillText('Tombstone', 390 - (275 * (objNewMenu.moveCounter / 100)), 408);
            objCanvas.context.textAlign = 'center';

            objCanvas.context.globalAlpha = (objNewMenu.alphaOut / 100);
            objCanvas.context.fillText('These are the bugs. Ruiners of all perfect deployments.', 400, 25);

            objCanvas.context.globalAlpha = (objNewMenu.alphaCounter / 100);
            objCanvas.context.fillStyle = "#323232";
            objCanvas.context.fillRect(300, 130, 200, 120);
            objCanvas.context.fillStyle = colInactive;
            objNewMenu.bullet.render(434,158);
            objNewMenu.laptop.render(425,202);
            objCanvas.context.font = '16px Arial';
            objCanvas.context.fillText('Use your powerful Laptop and faithful IDE to destroy them.', 400, 25);
            objCanvas.context.textAlign = 'right';
            objCanvas.context.fillText('IDE (J)', 390, 170);
            objCanvas.context.fillText('Laptop (K)', 390, 220);

            objCanvas.context.globalAlpha = 1;

            objNewMenu.slideCounter += 1;

            if(objNewMenu.slideCounter == 280)
            {
                objNewMenu.slideCounter = 0;
                objNewMenu.slide += 1;
                objNewMenu.alphaCounter = 0;
                objNewMenu.alphaOut = 100;
                objNewMenu.moveCounter = 0;
            }
            else if(objNewMenu.alphaOut > 0)
            {
                objNewMenu.alphaOut -= 2;
                objNewMenu.moveCounter += 2;
            }
            else if(objNewMenu.slideCounter > 70 && objNewMenu.alphaCounter < 100)
            {
                objNewMenu.alphaCounter += 2;
            }
        }
        else if(objNewMenu.slide == 4)
        {
            objCanvas.context.fillStyle = "#323232";
            objCanvas.context.fillRect(25, 130, 200, 300);
            objCanvas.context.fillRect(300 + (275 * (objNewMenu.moveCounter / 100)), 130, 200, 120);
            objCanvas.context.fillStyle = colInactive;
            objNewMenu.player.render(375,550);
            objNewMenu.lowBug.render(150,146);
            objNewMenu.mediumBug.render(150,206);
            objNewMenu.highBug.render(150,266);
            objNewMenu.todayBug.render(150,326);
            objNewMenu.bullet.render(434 + (275 * (objNewMenu.moveCounter / 100)),158);
            objNewMenu.laptop.render(425 + (275 * (objNewMenu.moveCounter / 100)),202);
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
            objCanvas.context.fillText('IDE (J)', 390 + (275 * (objNewMenu.moveCounter / 100)), 170);
            objCanvas.context.fillText('Laptop (K)', 390 + (275 * (objNewMenu.moveCounter / 100)), 220);
            objCanvas.context.textAlign = 'center';

            objCanvas.context.globalAlpha = (objNewMenu.alphaOut / 100);
            objCanvas.context.fillText('Use your powerful Laptop and faithful IDE to destroy them.', 400, 25);

            objCanvas.context.globalAlpha = (objNewMenu.alphaCounter / 100);
            objCanvas.context.fillText('Press Space or J to begin.', 400, 300);

            objCanvas.context.globalAlpha = 1;

            objNewMenu.slideCounter += 1;

            if(objNewMenu.alphaOut > 0)
            {
                objNewMenu.alphaOut -= 2;
                objNewMenu.moveCounter += 2;
            }
            else if(objNewMenu.slideCounter > 70 && objNewMenu.alphaCounter < 100)
            {
                objNewMenu.alphaCounter += 2;
            }
        }
    };

    objNewMenu.pressedJ = function()
    {
        objGame.gameState = 'newGame';
        objGame.menuState = 'none';
        objNewMenu.objMusic.stop();
    };

    objNewMenu.pressedSpace = function()
    {
        objGame.gameState = 'newGame';
        objGame.menuState = 'none';
        objNewMenu.objMusic.stop();
    };

    return objNewMenu;
}

function buildOptionsMenu()
{
    var objNewMenu = {};

    objNewMenu.objBackground = objUILibrary.optionsBackground.objImage;
    objNewMenu.objOptionOff = objUILibrary.optionOff.objImage;
    objNewMenu.objOptionOn = objUILibrary.optionOn.objImage;
    objNewMenu.objMusic = objMusic.shop;
    objNewMenu.objKeystroke = objSounds.keystroke;
    objNewMenu.objEquip = objSounds.equip;

    objNewMenu.menuSelection = 0;

    objNewMenu.render = function()
    {
        objCanvas.context.drawImage
        (
            objNewMenu.objBackground,
            0,
            0,
            800,
            600,
            0,
            0,
            800,
            600
        );



        objCanvas.context.globalAlpha = 0.6;
        objCanvas.context.fillStyle = '#000000';
        objCanvas.context.fillRect(100, 20, 600, 560);

        objCanvas.context.globalAlpha = 0.2;
        objCanvas.context.fillStyle = '#FFFFFF';
        objCanvas.context.fillRect(150, 157 + (50 * objNewMenu.menuSelection), 500, 30);
        objCanvas.context.globalAlpha = 1;

        objCanvas.context.font = '50px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillText('Options ', 400, 70);

        objCanvas.context.font = '23px Arial';
        objCanvas.context.textAlign = 'right';
        objCanvas.context.fillText('Enable Music: ', 430, 180);
        objCanvas.context.fillText('Enable Sound Effects: ', 430, 230);

        if(!objGame.enableMusic)
        {
            objCanvas.context.drawImage
            (
                objNewMenu.objOptionOff,
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
                objNewMenu.objOptionOn,
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

        if(!objGame.enableSound)
        {
            objCanvas.context.drawImage
            (
                objNewMenu.objOptionOff,
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
                objNewMenu.objOptionOn,
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

    objNewMenu.pressedW = function()
    {
        if(objNewMenu.menuSelection == 0)
        {
            objNewMenu.menuSelection = 1;
        }
        else
        {
            objNewMenu.menuSelection = 0;
        }

        objNewMenu.objKeystroke.play();
        objGame.setInputSleeping();
    };

    objNewMenu.pressedS = function()
    {
        if(objNewMenu.menuSelection == 1)
        {
            objNewMenu.menuSelection = 0;
        }
        else
        {
            objNewMenu.menuSelection = 1;
        }

        objNewMenu.objKeystroke.play();
        objGame.setInputSleeping();
    };

    objNewMenu.pressedJ = function()
    {
        if(objNewMenu.menuSelection == 0)
        {
            objGame.enableMusic = !objGame.enableMusic;

            if(objGame.enableMusic)
            {
                objNewMenu.objMusic.playMusic();
            }
            else
            {
                objNewMenu.objMusic.stop();
            }

            if(objGame.loggedIn)
            {
                updateSettingData('enableMusic', objGame.enableMusic);
            }
        }
        else if(objNewMenu.menuSelection == 1)
        {
            objGame.enableSound = !objGame.enableSound;

            if(objGame.loggedIn)
            {
                updateSettingData('enableSound', objGame.enableSound);
            }
        }

        objNewMenu.objEquip.play();
        objGame.setInputSleeping();
    };

    objNewMenu.pressedK = function()
    {
        objNewMenu.objMusic.stop();
        objNewMenu.objKeystroke.play();
        objGame.setInputSleeping();
        objGame.gameState = 'buildMenu';
        objGame.menuState = 'title';
    };

    objNewMenu.pressedSpace = function()
    {
        if(objNewMenu.menuSelection == 0)
        {
            objGame.enableMusic = !objGame.enableMusic;

            if(objGame.enableMusic)
            {
                objNewMenu.objMusic.playMusic();
            }
            else
            {
                objNewMenu.objMusic.stop();
            }

        }
        else if(objNewMenu.menuSelection == 1)
        {
            objGame.enableSound = !objGame.enableSound;
        }

        objNewMenu.objEquip.play();
        objGame.setInputSleeping();
    };

    return objNewMenu
}