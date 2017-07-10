var objSoundLibrary = {};
var objMusicLibrary = {};
var objSounds = {};
var objMusic = {};

function buildSounds()
{
    $.each(objSoundLibrary, function()
    {
        objSounds[this.FileName] = buildSound(this.objSound, this.volume);
    });

    $.each(objMusicLibrary, function()
    {
        objMusic[this.FileName] = buildSound(this.objSound, this.volume);
    });
}

function buildSound(loadedSound, volume)
{
    var objSound = {};

    objSound.sound = loadedSound;

    objSound.sound.volume = parseFloat(volume);
    objSound.paused = false;
    objSound.musicPlaying = false;
    objSound.scoreCounter = 12;

    if(objInterface.browser == 'chrome')
    {
        objSound.play = function()
        {
            if(objGame.enableSound && objSound.sound.readyState > 2)
            {
                objSound.sound.pause();
                objSound.sound.currentTime = 0.0;
                objSound.sound.play();
            }
        };

        objSound.playMusic = function()
        {
            if(objGame.enableMusic && objSound.musicPlaying == false && objSound.sound.readyState > 2)
            {
                objSound.sound.loop = true;
                objSound.sound.play();
                objSound.musicPlaying = true;
            }
        };

        objSound.playScore = function()
        {
            objSound.scoreCounter += 1;
            if(objGame.enableSound && objSound.scoreCounter >= 8 && objSound.sound.readyState > 2)
            {
                objSound.sound.pause();
                objSound.sound.currentTime = 0.0;
                objSound.sound.play();
                objSound.scoreCounter = 0;
            }
        };

        objSound.stop = function()
        {
            if(objSound.sound.currentTime > 0 && !objSound.sound.paused && !objSound.sound.ended && objSound.sound.readyState > 2)
            {
                objSound.sound.pause();
                objSound.sound.currentTime = 0.0;
                objSound.musicPlaying = false;
            }
        };

        objSound.pause = function()
        {
            if(objSound.sound.currentTime > 0 && !objSound.sound.paused && !objSound.sound.ended && objSound.sound.readyState > 2)
            {
                objSound.sound.pause();
                objSound.paused = true;
            }
            else
            {
                objSound.sound.play();
                objSound.paused = false;
            }
        };
    }
    else
    {
        objSound.play = function()
        {
            if(objGame.enableSound)
            {
                objSound.sound.pause();
                objSound.sound.currentTime = 0.0;
                objSound.sound.play();
            }
        };

        objSound.playMusic = function()
        {
            if(objGame.enableMusic && objSound.musicPlaying == false)
            {
                objSound.sound.loop = true;
                objSound.sound.play();
                objSound.musicPlaying = true;
            }
        };

        objSound.playScore = function()
        {
            objSound.scoreCounter += 1;
            if(objGame.enableSound && objSound.scoreCounter >= 8)
            {
                objSound.sound.pause();
                objSound.sound.currentTime = 0.0;
                objSound.sound.play();
                objSound.scoreCounter = 0;
            }
        };

        objSound.stop = function()
        {
            objSound.sound.pause();
            objSound.sound.currentTime = 0.0;
            objSound.musicPlaying = false;
        };

        objSound.pause = function()
        {
            if(!objSound.sound.paused)
            {
                objSound.sound.pause();
                objSound.paused = true;
            }
            else
            {
                objSound.sound.play();
                objSound.paused = false;
            }
        };
    }



    return objSound;
}