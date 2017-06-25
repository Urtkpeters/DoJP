require.config(
{
    baseUrl: '/lib/gameLib',
    urlArgs: 'bust=' + (new Date()).getTime()
});

require(['assetLoader','entityManager','gameManager','genericMovements','inputListener','interfaceManager','levelManager','menuManager','movementManager','playerManager','soundManager','spriteManager','ajaxManager'], function()
{
    initializeGame();
});