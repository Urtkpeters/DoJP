var arySoundLibrary =
[
    {assetName: 'fire', filePath: 'media/sounds/playerFire.wav', volume: 0.3},
    {assetName: 'hit', filePath: 'media/sounds/playerHit.mp3', volume: 0.5},
    {assetName: 'falling', filePath: 'media/sounds/falling.wav', volume: 0.5},
    {assetName: 'explosion', filePath: 'media/sounds/explosion.wav', volume: 0.5},
    {assetName: 'throw', filePath: 'media/sounds/throw.ogg', volume: 0.5},
    {assetName: 'energyBar', filePath: 'media/sounds/energyBar.wav', volume: 0.8},
    {assetName: 'bugDeath', filePath: 'media/sounds/bugDeath.wav', volume: 0.5},
    {assetName: 'keystroke', filePath: 'media/sounds/keystroke.wav', volume: 0.5},
    {assetName: 'purchase', filePath: 'media/sounds/purchase.wav', volume: 0.5},
    {assetName: 'scoreCount', filePath: 'media/sounds/scoreCount.wav', volume: 0.5},
    {assetName: 'tombstoneAttack', filePath: 'media/sounds/tombstoneAttack.wav', volume: 0.5},
    {assetName: 'tombstoneDeath', filePath: 'media/sounds/tombstoneDeath.wav', volume: 0.75},
    {assetName: 'tombstoneHit', filePath: 'media/sounds/tombstoneHit.flac', volume: 0.5},
    {assetName: 'tombstoneRoar', filePath: 'media/sounds/tombstoneRoar.flac', volume: 0.5},
    {assetName: 'gameover', filePath: 'media/sounds/gameover.mp3', volume: 0.5},
    {assetName: 'intro', filePath: 'media/sounds/intro.mp3', volume: 0.5},
    {assetName: 'credits', filePath: 'media/sounds/credits.mp3', volume: 0.5},
    {assetName: 'boss', filePath: 'media/sounds/boss.mp3', volume: 0.45},
    {assetName: 'shop', filePath: 'media/sounds/shop.mp3', volume: 0.35},
    {assetName: 'level1', filePath: 'media/sounds/level1.m4a', volume: 0.30},
    {assetName: 'level2', filePath: 'media/sounds/level2.m4a', volume: 0.30},
    {assetName: 'level3', filePath: 'media/sounds/level3.m4a', volume: 0.30},
    {assetName: 'victory', filePath: 'media/sounds/victory.wav', volume: 0.5},
    {assetName: 'explanation', filePath: 'media/sounds/explanation.mp3', volume: 0.5},
    {assetName: 'noMoney', filePath: 'media/sounds/noMoney.mp3', volume: 0.5},
    {assetName: 'equip', filePath: 'media/sounds/equip.wav', volume: 0.5}
];

var objSounds = {};

function buildSounds()
{
    for(var i = 0; i < arySoundLibrary.length; i++)
    {
        objSounds[arySoundLibrary[i].assetName] = buildSound(arySoundLibrary[i].objSound, arySoundLibrary[i].volume);
    }
}

function buildSound(loadedSound, volume)
{
    var objSound = {};

    objSound.sound = loadedSound;
    objSound.sound.volume = volume;
    objSound.paused = false;
    objSound.musicPlaying = false;
    objSound.scoreCounter = 12;

    objSound.play = function()
    {
        if(!objGame.soundEffectsOff)
        {
            objSound.sound.pause();
            objSound.sound.currentTime = 0.0;
            objSound.sound.play();
        }
    };

    objSound.playMusic = function()
    {
        if(!objGame.musicOff && objSound.musicPlaying == false)
        {
            objSound.sound.play();
            objSound.musicPlaying = true;
        }
    };

    objSound.playScore = function()
    {
        objSound.scoreCounter += 1;
        if(!objGame.soundEffectsOff && objSound.scoreCounter >= 8)
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
        if(objSound.paused == false)
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

    return objSound;
}