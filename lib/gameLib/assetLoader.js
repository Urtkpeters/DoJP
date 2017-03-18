var aryAssetLoader;
var intLoadStep = 0;
var intLoadedFiles = 0;
var blnIsLoading = false;

function initAssetLoader()
{
    aryAssetLoader =
    [
        {title: 'GameData', text: 'Loading game data...', barWidth: 0, loadFunction: function() {loadData()}},
        {title: 'MenuImages', text: 'Loading UI...', barWidth: 220, loadFunction: function() {loadImages2()}, loadArray: objUILibrary},
        {title: 'SpriteJSON', text: 'Loading sprite data...', barWidth: 240, loadFunction: function() {loadJSON()}, loadArray: arySpriteLibrary},
        {title: 'SpriteImages', text: 'Loading sprite images...', barWidth: 280, loadFunction: function() {loadImages()}, loadArray: arySpriteLibrary},
        {title: 'SoundEffects', text: 'Loading sound effects...', barWidth: 330, loadFunction: function() {loadSounds()}, loadArray: objSoundLibrary},
        {title: 'Music', text: 'Loading music...', barWidth: 360, loadFunction: function() {loadSounds()}, loadArray: objMusicLibrary},
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

function loadImages2()
{
    if(blnIsLoading == false)
    {
        blnIsLoading = true;

        $.each(aryAssetLoader[intLoadStep].loadArray, function()
        {
            this.objImage = new Image();
            this.objImage.src = this.FilePath;
            this.objImage.addEventListener('load', checkAssets());
        });
    }
}

function loadSounds()
{
    if(blnIsLoading == false)
    {
        blnIsLoading = true;

        $.each(aryAssetLoader[intLoadStep].loadArray, function()
        {
            this.objSound = new Audio();
            this.objSound.src = this.FilePath;
            this.objSound.addEventListener('load', checkAssets());
        });
    }
}

function loadData()
{
    if(blnIsLoading == false)
    {
        blnIsLoading = true;

        aryAssetLoader[intLoadStep].targetObject = function()
        {
            $.ajax
            ({
                url: '/lib/siteLib/ajaxHandler.php?request=getGameData',
                cache: false,
                dataType: 'json',
                success: function(responseData)
                {
                    if(responseData.blnSuccess == true)
                    {
                        setTimeout(function()
                        {
                            objEntityLibrary = responseData.entityData;
                            objLevelLibrary = responseData.levelData;
                            objUILibrary = responseData.UIData;
                            objSoundLibrary = responseData.soundData;
                            objMusicLibrary = responseData.musicData;

                            aryAssetLoader[1].loadArray = responseData.UIData;
                            aryAssetLoader[4].loadArray = responseData.soundData;
                            aryAssetLoader[5].loadArray = responseData.musicData;

                            intLoadStep += 1;
                            blnIsLoading = false;
                        }, 150);
                    }
                    else
                    {
                        $('#messages').text(responseData.strMessage);
                    }
                }
            });
        }()
    }
}

function checkAssets()
{
    intLoadedFiles += 1;

    if(intLoadedFiles == Object.keys(aryAssetLoader[intLoadStep].loadArray).length)
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
    buildPlayer();
    checkLogin();

    objGame.gameState = 'buildMenu';
}

$(window).on('loadedJSON', function()
{
    checkAssets('loadedJSON');
});