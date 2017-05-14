<div id="gameDiv" class="gameDiv">
    <canvas id="gameCanvas" class="gameCanvas"></canvas>
</div>
<div id="madeDiv" class="madeDiv">
    <label>Curious how it was made? Click here to find out.</label>
</div>
<div id="gameLightbox" class="lightboxShell">
    <div id="madeLightbox" class="madeLightbox">
        <p>This game was written entirely in Javascript and HTML5 Canvas. The artwork was all created on a web based application called Piskel and the sound effects were all gathered off of FreeSound.</p>
        <p class="imgP"><a href="http://www.piskel.com/"><img src="media/site/PiskelLogo.png" /></a></p>
        <p class="imgP"><a href="http://www.freesound.org/"><img src="media/site/FreeSoundLogo.png" /></a></p>
        <p>To see a blow-by-blow on how this project was created please see my GitHub link below.</p>
        <p class="imgP"><a href="https://github.com/Urtkpeters/DoJP/"><img src="media/site/GitHubLogo2.png" /></a></p>
    </div>
</div>
<script>
    $('#madeDiv').click(function()
    {
        $.fancybox.open({src: '#madeLightbox'});
        $('.fancybox-slide').click(function(){$.fancybox.close();});
        $('#madeLightbox').click(function(event){event.stopPropagation();})
    });
</script>
<script data-main="game/config.js" src="js/require.js"></script>