<div id="apiShell" class="apiShell">
    <?php
    require_once 'lib/siteLib/event/dotaAPIHandler.php';

    $matches = $clsDotaAPIHandler->getMatches();
    $matchIndex = 0;

    foreach($matches as $match)
    {
        ?>
        <div class="matchShell">
            <div><?=$match['MatchId']?></div>
            <div>
                <?php
                foreach($match['MatchLines'] as $matchLine)
                {
                    ?>
                    <div class="matchLine"><?=$matchLine['HeroName']?></div>
                    <?php
                }
                ?>
            </div>
        </div>
        <?php
    }
    ?>
</div>