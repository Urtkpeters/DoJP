var aryAssetLoader;
var intLoadStep = 0;
var intLoadedFiles = 0;
var blnIsLoading = false;

function initAssetLoader()
{
    aryAssetLoader =
    [
        {title: 'MenuImages', text: 'Loading menus...', barWidth: 0, loadFunction: function() {loadImages()}, loadArray: aryUILibrary},
        {title: 'SpriteJSON', text: 'Loading sprite data...', barWidth: 30, loadFunction: function() {loadJSON()}, loadArray: arySpriteLibrary},
        {title: 'SpriteImages', text: 'Loading sprite images...', barWidth: 110, loadFunction: function() {loadImages()}, loadArray: arySpriteLibrary},
        {title: 'SoundEffects', text: 'Loading sound effects...', barWidth: 270, loadFunction: function() {loadSounds()}, loadArray: arySoundLibrary},
        {title: 'LevelJSON', text: 'Loading level data...', barWidth: 350, loadFunction: function() {loadJSON()}, loadArray: aryLevelLibrary},
        {title: 'End', barWidth: 400, loadFunction: function() {finishedLoading()}}
    ];
}

function loadGameAssets()
{
    objCanvas.context.fillStyle = '#191970';
    objCanvas.context.fillRect(0,0,800,600);

    objCanvas.context.font = '30px Arial';
    objCanvas.context.textAlign = 'center';
    objCanvas.context.fillStyle = '#FFFFFF';
    objCanvas.context.fillText(aryAssetLoader[intLoadStep].text, 400, 200);

    objCanvas.context.fillStyle = '#000000';
    objCanvas.context.fillRect(200,300,400,18);
    objCanvas.context.fillStyle = '#FFFFFF';
    objCanvas.context.fillRect(200,300,aryAssetLoader[intLoadStep].barWidth,18);

    if(blnIsLoading == false)
    {
        aryAssetLoader[intLoadStep].loadFunction();
    }
}

function loadJSON()
{
    if(blnIsLoading == false)
    {
        blnIsLoading = true;

        $.each(aryAssetLoader[intLoadStep].loadArray, function(index, value)
        {
            $.ajaxSetup({cache:false});
            $.getJSON(value.rawJSON, function(json)
            {
                value.parsedJSON = json;

                $(window).trigger('loadedJSON');
            });
        });
    }
}

function loadImages()
{
    if(blnIsLoading == false)
    {
        blnIsLoading = true;

        for (var i = 0; i < aryAssetLoader[intLoadStep].loadArray.length; i++)
        {
            aryAssetLoader[intLoadStep].loadArray[i].objImage = new Image();
            aryAssetLoader[intLoadStep].loadArray[i].objImage.src = aryAssetLoader[intLoadStep].loadArray[i].filePath;
            aryAssetLoader[intLoadStep].loadArray[i].objImage.addEventListener('load', checkAssets());
        }
    }
}

function loadSounds()
{
    if(blnIsLoading == false)
    {
        blnIsLoading = true;

        for (var i = 0; i < aryAssetLoader[intLoadStep].loadArray.length; i++)
        {
            aryAssetLoader[intLoadStep].loadArray[i].objSound = new Audio();
            aryAssetLoader[intLoadStep].loadArray[i].objSound.src = aryAssetLoader[intLoadStep].loadArray[i].filePath;
            aryAssetLoader[intLoadStep].loadArray[i].objSound.addEventListener('load', checkAssets());
        }
    }
}

function checkAssets()
{
    intLoadedFiles += 1;

    if(intLoadedFiles == aryAssetLoader[intLoadStep].loadArray.length)
    {
        setTimeout(function() {
            intLoadedFiles = 0;
            intLoadStep += 1;
            blnIsLoading = false;
        }, 150);
    }
}

function finishedLoading()
{
    buildSounds();
    buildUILibrary();
    buildPlayer();

    objGame.gameState = 'buildMenu';
}

$(window).on('loadedJSON', function()
{
    checkAssets('loadedJSON');
});