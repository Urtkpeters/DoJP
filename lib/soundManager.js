var arySoundLibrary =
[
    {assetName: 'fire', filePath: 'sounds/playerFire.wav', volume: 0.3},
    {assetName: 'hit', filePath: 'sounds/playerHit.mp3', volume: 0.5},
    {assetName: 'falling', filePath: 'sounds/falling.wav', volume: 0.5},
    {assetName: 'explosion', filePath: 'sounds/explosion.wav', volume: 0.5},
    {assetName: 'throw', filePath: 'sounds/throw.ogg', volume: 0.5},
    {assetName: 'energyBar', filePath: 'sounds/energyBar.wav', volume: 0.8},
    {assetName: 'bugDeath', filePath: 'sounds/bugDeath.wav', volume: 0.5},
    {assetName: 'keystroke', filePath: 'sounds/keystroke.wav', volume: 0.5},
    {assetName: 'purchase', filePath: 'sounds/purchase.wav', volume: 0.5},
    {assetName: 'scoreCount', filePath: 'sounds/scoreCount.wav', volume: 0.5},
    {assetName: 'tombstoneAttack', filePath: 'sounds/tombstoneAttack.wav', volume: 0.5},
    {assetName: 'tombstoneDeath', filePath: 'sounds/tombstoneDeath.wav', volume: 0.75},
    {assetName: 'tombstoneHit', filePath: 'sounds/tombstoneHit.flac', volume: 0.5},
    {assetName: 'tombstoneRoar', filePath: 'sounds/tombstoneRoar.flac', volume: 0.5},
    {assetName: 'gameover', filePath: 'sounds/gameover.mp3', volume: 0.5},
    {assetName: 'intro', filePath: 'sounds/intro.mp3', volume: 0.5},
    {assetName: 'credits', filePath: 'sounds/credits.mp3', volume: 0.5},
    {assetName: 'boss', filePath: 'sounds/boss.mp3', volume: 0.45},
    {assetName: 'shop', filePath: 'sounds/shop.mp3', volume: 0.35},
    {assetName: 'level1', filePath: 'sounds/level1.m4a', volume: 0.30},
    {assetName: 'level2', filePath: 'sounds/level2.m4a', volume: 0.30},
    {assetName: 'level3', filePath: 'sounds/level3.m4a', volume: 0.30},
    {assetName: 'victory', filePath: 'sounds/victory.wav', volume: 0.5},
    {assetName: 'explanation', filePath: 'sounds/explanation.mp3', volume: 0.5},
    {assetName: 'noMoney', filePath: 'sounds/noMoney.mp3', volume: 0.5},
    {assetName: 'equip', filePath: 'sounds/equip.wav', volume: 0.5}
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