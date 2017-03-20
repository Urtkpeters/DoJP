var intLoadStep = 0;
var intLoadedFiles = 0;
var blnIsLoading = false;
var aryAssetLoader = [];

function initAssetLoader()
{
    aryAssetLoader =
    [
        {title: 'GameData', text: 'Loading game data...', percentComplete: 0, loadFunction: function() {loadData()}},
        {title: 'MenuImages', text: 'Loading UI...', percentComplete: 30, loadFunction: function() {loadImages()}, loadArray: objUILibrary},
        {title: 'SpriteJSON', text: 'Loading sprite data...', percentComplete: 40, loadFunction: function() {loadJSON()}, loadArray: objSpriteJSONLibrary},
        {title: 'SpriteImages', text: 'Loading sprite images...', percentComplete: 60, loadFunction: function() {loadImages()}, loadArray: objSpriteImageLibrary},
        {title: 'SoundEffects', text: 'Loading sound effects...', percentComplete: 70, loadFunction: function() {loadSounds()}, loadArray: objSoundLibrary},
        {title: 'Music', text: 'Loading music...', percentComplete: 80, loadFunction: function() {loadSounds()}, loadArray: objMusicLibrary},
        {title: 'End', text: 'Finishing up...', percentComplete: 100, loadFunction: function() {finishedLoading()}}
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
    objCanvas.context.fillRect(200,300,400 * (aryAssetLoader[intLoadStep].percentComplete / 100),18);

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
            $.getJSON(value.FilePath, function(json)
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
                            objSpriteJSONLibrary = responseData.SpriteJSONData;
                            objSpriteImageLibrary = responseData.SpriteImageData;
                            objSoundLibrary = responseData.soundData;
                            objMusicLibrary = responseData.musicData;

                            aryAssetLoader[1].loadArray = responseData.UIData;
                            aryAssetLoader[2].loadArray = responseData.SpriteJSONData;
                            aryAssetLoader[3].loadArray = responseData.SpriteImageData;
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