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
    else if($strRequest == 'getGameData')
    {
        require 'gameHandler.php';

        $objRequestResponse = $clsGameHandler->getGameData();
    }

    echo json_encode($objRequestResponse);
?>