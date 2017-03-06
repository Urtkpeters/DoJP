requirejs.config(
{
    baseURL: 'lib',
    urlArgs: 'bust=' + (new Date()).getTime()
});

require(['gameManager','assetLoader','inputListener','spriteManager','entityManager','menuManager','levelManager','movementManager','playerManager','soundManager'], function()
{
    initializeGame();
});