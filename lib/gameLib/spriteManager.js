var arySpriteLibrary =
[
    { assetName: 'player', rawJSON: 'media/sprites/playerChar.json', filePath: 'media/sprites/playerChar.png', ticksPerFrame: 8},
    { assetName: 'entityBullet', rawJSON: 'media/sprites/entityBullet.json', filePath: 'media/sprites/entityBullet.png', ticksPerFrame: 8},
    { assetName: 'bullet', rawJSON: 'media/sprites/bullet.json', filePath: 'media/sprites/bullet.png', ticksPerFrame: 8},
    { assetName: 'bulletLeft', rawJSON: 'media/sprites/bulletLeft.json', filePath: 'media/sprites/bulletLeft.png', ticksPerFrame: 8},
    { assetName: 'bulletRight', rawJSON: 'media/sprites/bulletRight.json', filePath: 'media/sprites/bulletRight.png', ticksPerFrame: 8},
    { assetName: 'bulletUpperLeft', rawJSON: 'media/sprites/bulletUpperLeft.json', filePath: 'media/sprites/bulletUpperLeft.png', ticksPerFrame: 8},
    { assetName: 'bulletUpperRight', rawJSON: 'media/sprites/bulletUpperRight.json', filePath: 'media/sprites/bulletUpperRight.png', ticksPerFrame: 8},
    { assetName: 'bulletBig', rawJSON: 'media/sprites/bulletBig.json', filePath: 'media/sprites/bulletBig.png', ticksPerFrame: 8},
    { assetName: 'laptop', rawJSON: 'media/sprites/laptop.json', filePath: 'media/sprites/laptop.png', ticksPerFrame: 8},
    { assetName: 'explosion', rawJSON: 'media/sprites/explosion.json', filePath: 'media/sprites/explosion.png', ticksPerFrame: 8},
    { assetName: 'lowBug', rawJSON: 'media/sprites/lowBug.json', filePath: 'media/sprites/lowBug.png', ticksPerFrame: 8},
    { assetName: 'mediumBug', rawJSON: 'media/sprites/mediumBug.json', filePath: 'media/sprites/mediumBug.png', ticksPerFrame: 8},
    { assetName: 'highBug', rawJSON: 'media/sprites/highBug.json', filePath: 'media/sprites/highBug.png', ticksPerFrame: 8},
    { assetName: 'todayBug', rawJSON: 'media/sprites/todayBug.json', filePath: 'media/sprites/todayBug.png', ticksPerFrame: 8},
    { assetName: 'tombstoneBug', rawJSON: 'media/sprites/tombstoneBug.json', filePath: 'media/sprites/tombstoneBug.png', ticksPerFrame: 8},
    { assetName: 'lowBugDeath', rawJSON: 'media/sprites/lowBugDeath.json', filePath: 'media/sprites/lowBugDeath.png', ticksPerFrame: 6},
    { assetName: 'mediumBugDeath', rawJSON: 'media/sprites/mediumBugDeath.json', filePath: 'media/sprites/mediumBugDeath.png', ticksPerFrame: 6},
    { assetName: 'highBugDeath', rawJSON: 'media/sprites/highBugDeath.json', filePath: 'media/sprites/highBugDeath.png', ticksPerFrame: 6},
    { assetName: 'todayBugDeath', rawJSON: 'media/sprites/todayBugDeath.json', filePath: 'media/sprites/todayBugDeath.png', ticksPerFrame: 6},
    { assetName: 'tombstoneBugDeath', rawJSON: 'media/sprites/tombstoneBugDeath.json', filePath: 'media/sprites/tombstoneBugDeath.png', ticksPerFrame: 6},
    { assetName: 'floor', rawJSON: 'media/sprites/floor.json', filePath: 'media/sprites/floor.png', ticksPerFrame: 8},
    { assetName: 'pitfall', rawJSON: 'media/sprites/pitfall.json', filePath: 'media/sprites/pitfall.png', ticksPerFrame: 8},
    { assetName: 'leftTombstoneAttack', rawJSON: 'media/sprites/leftTombstoneAttack.json', filePath: 'media/sprites/leftTombstoneAttack.png', ticksPerFrame: 0},
    { assetName: 'rightTombstoneAttack', rawJSON: 'media/sprites/rightTombstoneAttack.json', filePath: 'media/sprites/rightTombstoneAttack.png', ticksPerFrame: 0},
    { assetName: 'centerTombstoneAttack', rawJSON: 'media/sprites/centerTombstoneAttack.json', filePath: 'media/sprites/centerTombstoneAttack.png', ticksPerFrame: 0},
    { assetName: 'playerSleeping', rawJSON: 'media/sprites/playerSleeping.json', filePath: 'media/sprites/playerSleeping.png', ticksPerFrame: 8}
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