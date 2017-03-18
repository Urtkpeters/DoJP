require.config(
{
    baseUrl: '/lib/gameLib'
});

require(['assetLoader','entityManager','gameManager','inputListener','levelManager','menuManager','movementManager','playerManager','soundManager','spriteManager'], function()
{
    initializeGame();
});