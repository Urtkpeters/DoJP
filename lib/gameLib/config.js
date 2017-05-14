require.config(
{
    baseUrl: '/lib/gameLib',
    urlArgs: 'bust=' + (new Date()).getTime()
});

require(['assetLoader','entityManager','gameManager','inputListener','levelManager','menuManager','movementManager','playerManager','soundManager','spriteManager','AJAXManager'], function()
{
    initializeGame();
});