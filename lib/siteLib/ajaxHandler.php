<?php
    $strRequest = $_GET['request'];
    $objRequestResponse = array
    (
        'blnSuccess' => false,
        'strMessage' => 'Error processing request.'
    );

    if($strRequest == 'login' || $strRequest == 'logout' || $strRequest == 'register')
    {
        require 'loginHandler.php';

        if($strRequest == 'login')
        {
            $objRequestResponse = $clsLoginHandler->login();
        }
        else if($strRequest == 'logout')
        {
            $objRequestResponse = $clsLoginHandler->logout();
        }
        else if($strRequest == 'register')
        {
            $objRequestResponse = $clsLoginHandler->register();
        }
    }
    else if($strRequest == 'getGameData' || $strRequest == 'getSettingValues' || $strRequest == 'setSettingValue' || $strRequest == 'submitScore' || $strRequest == 'saveGame' || $strRequest == 'loadGame')
    {

        require 'gameHandler.php';

        if($strRequest == 'getGameData')
        {
            $objRequestResponse = $clsGameHandler->getGameData();
        }
        else if($strRequest == 'getSettingValues')
        {
            $objRequestResponse = $clsGameHandler->getSettingValues();
        }
        else if($strRequest == 'setSettingValue')
        {
            $objRequestResponse = $clsGameHandler->setSettingValue();
        }
        else if($strRequest == 'submitScore')
        {
            $objRequestResponse = $clsGameHandler->submitScore();
        }
        else if($strRequest == 'saveGame')
        {
            $objRequestResponse = $clsGameHandler->saveGame();
        }
        else if($strRequest == 'loadGame')
        {
            $objRequestResponse = $clsGameHandler->loadGame();
        }
    }

    echo json_encode($objRequestResponse);
?>