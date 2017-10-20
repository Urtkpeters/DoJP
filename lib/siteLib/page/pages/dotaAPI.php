<?php
    require_once 'lib\siteLib\event\dotaAPIHandler.php';

    $landingData = $clsDotaAPIHandler->getLandingData();
?>
<div class="dotaLandingPage">
    <div class="statsShell">
        <div class="infoCell">
            <div class="titleCell">Win Percentage: </div>
            <div class="dataCell"><?=$landingData['AllPercentage']?>%</div>
        </div>
    </div>
</div>