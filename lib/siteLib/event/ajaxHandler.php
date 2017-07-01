<?php
    parse_str($_SERVER["QUERY_STRING"]);
    
    $objRequestResponse = array
    (
        'blnSuccess' => false,
        'strMessage' => 'Error processing request.'
    );

    if(isset($eventTarget))
    {
        if($eventTarget == 'login' || $eventTarget == 'logout' || $eventTarget == 'register' || $eventTarget == 'setAccountValue' || $eventTarget == 'forgotPassword')
        {
            require 'loginHandler.php';

            if($eventTarget == 'login')
            {
                $objRequestResponse = $clsLoginHandler->login();
            }
            else if($eventTarget == 'logout')
            {
                $objRequestResponse = $clsLoginHandler->logout();
            }
            else if($eventTarget == 'register' && isset($emailAddress) && isset($username) && isset($password))
            {
                $objRequestResponse = $clsLoginHandler->register($emailAddress, $username, $password);
            }
            else if($eventTarget == 'setAccountValue' && isset($sessionId) && isset($accountCode) && isset($accountValue))
            {
                $objRequestResponse = $clsLoginHandler->setAccountValue($sessionId, $accountCode, $accountValue);
            }
            else if($eventTarget == 'forgotPassword' && isset($username) && isset($email))
            {
                $objRequestResponse = $clsLoginHandler->forgotPassword($username, $email);
            }
        }
        else if($eventTarget == 'getGameData' || $eventTarget == 'getSettingValues' || $eventTarget == 'setSettingValue' || $eventTarget == 'submitScore' ||
            $eventTarget == 'saveGame' || $eventTarget == 'loadGame' || $eventTarget == 'checkForSave' || $eventTarget == 'submitLevelStats')
        {
            require 'gameHandler.php';

            if($eventTarget == 'getGameData')
            {
                $objRequestResponse = $clsGameHandler->getGameData();
            }
            else if($eventTarget == 'getSettingValues' && isset($sessionId))
            {
                $objRequestResponse = $clsGameHandler->getSettingValues($sessionId);
            }
            else if($eventTarget == 'setSettingValue' && isset($sessionId) && isset($settingCode) && isset($settingValue))
            {
                $objRequestResponse = $clsGameHandler->setSettingValue($sessionId, $settingCode, $settingValue);
            }
            else if($eventTarget == 'submitScore' && isset($sessionId) && isset($score) && isset($level))
            {
                $objRequestResponse = $clsGameHandler->submitScore($sessionId, $score, $level);
            }
            else if($eventTarget == 'saveGame' && isset($sessionId) && isset($level) && isset($earnings) && isset($score) && isset($pto) && isset($windate) && isset($nespresso) &&
                isset($activeide) && isset($notepad) && isset($notepadplusplus) && isset($far) && isset($eclipse) && isset($dreamweaver) && isset($mulestudio) && isset($intelliJ) && isset($netbeans) && isset($purchasedPTO))
            {
                $objRequestResponse = $clsGameHandler->saveGame($sessionId, $level, $earnings, $score, $pto, $windate, $nespresso,
                    $activeide, $notepad, $notepadplusplus, $far, $eclipse, $dreamweaver, $mulestudio, $intelliJ, $netbeans, $purchasedPTO);
            }
            else if($eventTarget == 'loadGame' && isset($sessionId))
            {
                $objRequestResponse = $clsGameHandler->loadGame($sessionId);
            }
            else if($eventTarget == 'checkForSave' && isset($sessionId))
            {
                $objRequestResponse = $clsGameHandler->checkForSave($sessionId);
            }
            else if($eventTarget == 'submitLevelStats')
            {
                $objRequestResponse = $clsGameHandler->submitLevelStats($levelCode, $levelTiming, $playerEarnings, $playerPTO, $playerIDE);
            }
        }
    }

    echo json_encode($objRequestResponse);