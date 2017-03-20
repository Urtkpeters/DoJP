var objSpriteImageLibrary = {};
var objSpriteJSONLibrary = {};

function buildSprite(whichSprite)
{
    var objSprite = {};

    objSprite.frame0 = Object.keys(objSpriteJSONLibrary[whichSprite + 'JSON'].parsedJSON.frames)[0];
    objSprite.assetName = objSpriteImageLibrary[whichSprite].FileName;
    objSprite.context = objCanvas.canvas.getContext("2d");
    objSprite.image = objSpriteImageLibrary[whichSprite].objImage;
    objSprite.width = objSpriteJSONLibrary[whichSprite + 'JSON'].parsedJSON.frames[objSprite.frame0].frame.w;
    objSprite.height = objSpriteJSONLibrary[whichSprite + 'JSON'].parsedJSON.frames[objSprite.frame0].frame.h;
    objSprite.numberOfFrames = Object.keys(objSpriteJSONLibrary[whichSprite + 'JSON'].parsedJSON.frames).length - 1;
    objSprite.ticksPerFrame = objSpriteJSONLibrary[whichSprite + 'JSON'].TicksPerFrame;

    if(objSprite.assetName == 'leftTombstoneAttack' || objSprite.assetName == 'rightTombstoneAttack' || objSprite.assetName == 'centerTombstoneAttack')
    {
        objSprite.originalHeight = objSpriteJSONLibrary[whichSprite + 'JSON'].parsedJSON.frames[objSprite.frame0].frame.h;
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