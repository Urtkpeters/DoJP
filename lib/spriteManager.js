var arySpriteLibrary =
[
    { assetName: 'player', rawJSON: 'sprites/playerChar.json', filePath: 'sprites/playerChar.png', ticksPerFrame: 8},
    { assetName: 'entityBullet', rawJSON: 'sprites/entityBullet.json', filePath: 'sprites/entityBullet.png', ticksPerFrame: 8},
    { assetName: 'bullet', rawJSON: 'sprites/bullet.json', filePath: 'sprites/bullet.png', ticksPerFrame: 8},
    { assetName: 'bulletLeft', rawJSON: 'sprites/bulletLeft.json', filePath: 'sprites/bulletLeft.png', ticksPerFrame: 8},
    { assetName: 'bulletRight', rawJSON: 'sprites/bulletRight.json', filePath: 'sprites/bulletRight.png', ticksPerFrame: 8},
    { assetName: 'bulletUpperLeft', rawJSON: 'sprites/bulletUpperLeft.json', filePath: 'sprites/bulletUpperLeft.png', ticksPerFrame: 8},
    { assetName: 'bulletUpperRight', rawJSON: 'sprites/bulletUpperRight.json', filePath: 'sprites/bulletUpperRight.png', ticksPerFrame: 8},
    { assetName: 'bulletBig', rawJSON: 'sprites/bulletBig.json', filePath: 'sprites/bulletBig.png', ticksPerFrame: 8},
    { assetName: 'laptop', rawJSON: 'sprites/laptop.json', filePath: 'sprites/laptop.png', ticksPerFrame: 8},
    { assetName: 'explosion', rawJSON: 'sprites/explosion.json', filePath: 'sprites/explosion.png', ticksPerFrame: 8},
    { assetName: 'lowBug', rawJSON: 'sprites/lowBug.json', filePath: 'sprites/lowBug.png', ticksPerFrame: 8},
    { assetName: 'mediumBug', rawJSON: 'sprites/mediumBug.json', filePath: 'sprites/mediumBug.png', ticksPerFrame: 8},
    { assetName: 'highBug', rawJSON: 'sprites/highBug.json', filePath: 'sprites/highBug.png', ticksPerFrame: 8},
    { assetName: 'todayBug', rawJSON: 'sprites/todayBug.json', filePath: 'sprites/todayBug.png', ticksPerFrame: 8},
    { assetName: 'tombstoneBug', rawJSON: 'sprites/tombstoneBug.json', filePath: 'sprites/tombstoneBug.png', ticksPerFrame: 8},
    { assetName: 'lowBugDeath', rawJSON: 'sprites/lowBugDeath.json', filePath: 'sprites/lowBugDeath.png', ticksPerFrame: 6},
    { assetName: 'mediumBugDeath', rawJSON: 'sprites/mediumBugDeath.json', filePath: 'sprites/mediumBugDeath.png', ticksPerFrame: 6},
    { assetName: 'highBugDeath', rawJSON: 'sprites/highBugDeath.json', filePath: 'sprites/highBugDeath.png', ticksPerFrame: 6},
    { assetName: 'todayBugDeath', rawJSON: 'sprites/todayBugDeath.json', filePath: 'sprites/todayBugDeath.png', ticksPerFrame: 6},
    { assetName: 'tombstoneBugDeath', rawJSON: 'sprites/tombstoneBugDeath.json', filePath: 'sprites/tombstoneBugDeath.png', ticksPerFrame: 6},
    { assetName: 'floor', rawJSON: 'sprites/floor.json', filePath: 'sprites/floor.png', ticksPerFrame: 8},
    { assetName: 'pitfall', rawJSON: 'sprites/pitfall.json', filePath: 'sprites/pitfall.png', ticksPerFrame: 8},
    { assetName: 'leftTombstoneAttack', rawJSON: 'sprites/leftTombstoneAttack.json', filePath: 'sprites/leftTombstoneAttack.png', ticksPerFrame: 0},
    { assetName: 'rightTombstoneAttack', rawJSON: 'sprites/rightTombstoneAttack.json', filePath: 'sprites/rightTombstoneAttack.png', ticksPerFrame: 0},
    { assetName: 'centerTombstoneAttack', rawJSON: 'sprites/centerTombstoneAttack.json', filePath: 'sprites/centerTombstoneAttack.png', ticksPerFrame: 0},
    { assetName: 'playerSleeping', rawJSON: 'sprites/playerSleeping.json', filePath: 'sprites/playerSleeping.png', ticksPerFrame: 8}
];

function buildSprite(whichSprite)
{
    var objSprite = {};
    var objSpriteData = {};

    for(var i = 0; i < arySpriteLibrary.length; i++)
    {
        if(whichSprite == arySpriteLibrary[i].assetName)
        {
            objSprite.assetName = arySpriteLibrary[i].assetName;
            objSpriteData = arySpriteLibrary[i];
            break;
        }
    }

    var frame0 = Object.keys(objSpriteData.parsedJSON.frames)[0];

    objSprite.context = objCanvas.canvas.getContext("2d");
    objSprite.image = objSpriteData.objImage;
    objSprite.width = objSpriteData.parsedJSON.frames[frame0].frame.w;
    objSprite.height = objSpriteData.parsedJSON.frames[frame0].frame.h;
    objSprite.numberOfFrames = Object.keys(objSpriteData.parsedJSON.frames).length - 1;
    objSprite.ticksPerFrame = objSpriteData.ticksPerFrame;

    if(objSprite.assetName == 'leftTombstoneAttack' || objSprite.assetName == 'rightTombstoneAttack' || objSprite.assetName == 'centerTombstoneAttack')
    {
        objSprite.originalHeight = objSpriteData.parsedJSON.frames[frame0].frame.h;
        objSprite.stage = 0;
        objSprite.stageCounter = 0;
    }

    objSprite.frameIndex = 0;
    objSprite.tickCount = 0;

    objSprite.render = function(positionX, positionY)
    {
        objSprite.tickCount += 1;

        if(objSprite.tickCount > objSprite.ticksPerFrame)
        {
            objSprite.tickCount = 0;

            if(objSprite.frameIndex < objSprite.numberOfFrames)
            {
                objSprite.frameIndex += 1;
            }
            else
            {
                objSprite.frameIndex = 0;
            }
        }

        objSprite.context.drawImage
        (
            objSprite.image,
            0,
            objSprite.height * objSprite.frameIndex,
            objSprite.width,
            objSprite.height,
            positionX,
            positionY,
            objSprite.width,
            objSprite.height
        );
    };

    return objSprite;
}