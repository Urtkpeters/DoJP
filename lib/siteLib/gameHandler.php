<?php
    class gameHandler
    {
        function getGameData()
        {
            $objResponse = array
            (
                'blnSuccess' => false,
                'strMessage' => 'Error getting game data.'
            );

            require 'databaseHandler.php';

            $objResponse['entityData'] = $this->getEntityData($db);
            $objResponse['levelData'] = $this->getLevelData($db);
            $objResponse['UIData'] = $this->getUIData($db);
            $objResponse['SpriteImageData'] = $this->getSpriteImageData($db);
            $objResponse['SpriteJSONData'] = $this->getSpriteJSONData($db);
            $objResponse['soundData'] = $this->getSoundData($db);
            $objResponse['musicData'] = $this->getMusicData($db);

            if(count($objResponse['entityData']) > 0 && count($objResponse['levelData']) > 0)
            {
                $objResponse['blnSuccess'] = true;
                $objResponse['strMessage'] = 'Success in retrieving module data.';
            }

            return $objResponse;
        }

        function getLevelData($db)
        {
            $objGameData = array();

            $qryGetLevelHeaders =
            '
                select levelHeaderId, 
                  levelName,
                  levelCode,
                  MultiplierTier1,
                  MultiplierTier2,
                  MultiplierTier3,
                  MultiplierTier4,
                  MultiplierTier5,
                  fil.FileName
                from LevelHeader lh
                  join files fil on fil.fileid = lh.Music_fileid
            ';

            foreach($db->query($qryGetLevelHeaders) as $row)
            {
                $levelHeaderId = $row['levelHeaderId'];
                $levelCode = $row['levelCode'];

                $objGameData[$levelCode] = array();
                $objGameData[$levelCode]['levelName'] = $row['levelName'];
                $objGameData[$levelCode]['levelCode'] = $levelCode;
                $objGameData[$levelCode]['levelMusic'] = $row['FileName'];
                $objGameData[$levelCode]['MultiplierTier1'] = $row['MultiplierTier1'];
                $objGameData[$levelCode]['MultiplierTier2'] = $row['MultiplierTier2'];
                $objGameData[$levelCode]['MultiplierTier3'] = $row['MultiplierTier3'];
                $objGameData[$levelCode]['MultiplierTier4'] = $row['MultiplierTier4'];
                $objGameData[$levelCode]['MultiplierTier5'] = $row['MultiplierTier5'];
                $objGameData[$levelCode]['levelEntities'] = array();

                $qryGetLevelEntities = '
                    select type,
                        entityName,
                        position,
                        movement,
                        timing
                    from LevelEntities le
                        join Entities ent on ent.entityId = le.entityId
                    where levelHeaderId = ' . $levelHeaderId;

                $intRowCounter = 0;
                foreach($db->query($qryGetLevelEntities) as $row2)
                {
                    $objGameData[$levelCode]['levelEntities']['entity' . $intRowCounter] = array();
                    $objGameData[$levelCode]['levelEntities']['entity' . $intRowCounter]['type'] = $row2['type'];
                    $objGameData[$levelCode]['levelEntities']['entity' . $intRowCounter]['entityName'] = $row2['entityName'];
                    $objGameData[$levelCode]['levelEntities']['entity' . $intRowCounter]['position'] = $row2['position'];
                    $objGameData[$levelCode]['levelEntities']['entity' . $intRowCounter]['movement'] = $row2['movement'];
                    $objGameData[$levelCode]['levelEntities']['entity' . $intRowCounter]['timing'] = $row2['timing'];

                    $intRowCounter += 1;
                }
            }

            return $objGameData;
        }

        function getEntityData($db)
        {
            $objLevelData = array();

            $qryGetEntities =
            "
                select entityName, 
                  entityType,
                  hp,
                  speed,
                  attackType,
                  cooldown,
                  ifnull(spawnSound, 'none') as spawnSound,
                  bounty
                from Entities
            ";

            foreach($db->query($qryGetEntities) as $row)
            {
                $objLevelData[$row['entityName']] = array();

                $objLevelData[$row['entityName']]['entityName'] = $row['entityName'];
                $objLevelData[$row['entityName']]['entityType'] = $row['entityType'];
                $objLevelData[$row['entityName']]['hp'] = $row['hp'];
                $objLevelData[$row['entityName']]['speed'] = $row['speed'];
                $objLevelData[$row['entityName']]['attackType'] = $row['attackType'];
                $objLevelData[$row['entityName']]['cooldown'] = $row['cooldown'];
                $objLevelData[$row['entityName']]['spawnSound'] = $row['spawnSound'];
                $objLevelData[$row['entityName']]['bounty'] = $row['bounty'];
            }

            return $objLevelData;
        }

        function getSoundData($db)
        {
            $objSoundData = array();

            $qryGetSounds =
            "
                select FilePath,
                  FileType,
                  FileName,
                  volume
                from Files
                where FileType = 'sound';
            ";

            foreach($db->query($qryGetSounds) as $row)
            {
                $objSoundData[$row['FileName']] = array();

                $objSoundData[$row['FileName']]['FilePath'] = $row['FilePath'];
                $objSoundData[$row['FileName']]['FileType'] = $row['FileType'];
                $objSoundData[$row['FileName']]['FileName'] = $row['FileName'];
                $objSoundData[$row['FileName']]['volume'] = $row['volume'];
            }

            return $objSoundData;
        }

        function getMusicData($db)
        {
            $objMusicData = array();

            $qryGetMusic =
                "
                select FilePath,
                  FileType,
                  FileName,
                  volume
                from Files
                where FileType = 'music';
            ";

            foreach($db->query($qryGetMusic) as $row)
            {
                $objMusicData[$row['FileName']] = array();

                $objMusicData[$row['FileName']]['FilePath'] = $row['FilePath'];
                $objMusicData[$row['FileName']]['FileType'] = $row['FileType'];
                $objMusicData[$row['FileName']]['FileName'] = $row['FileName'];
                $objMusicData[$row['FileName']]['volume'] = $row['volume'];
            }

            return $objMusicData;
        }

        function getUIData($db)
        {
            $objUIData = array();

            $qryGetUI =
            "
                select FilePath,
                  FileType,
                  FileName
                from Files
                where FileType = 'UI';
            ";

            foreach($db->query($qryGetUI) as $row)
            {
                $objUIData[$row['FileName']] = array();

                $objUIData[$row['FileName']]['FilePath'] = $row['FilePath'];
                $objUIData[$row['FileName']]['FileType'] = $row['FileType'];
                $objUIData[$row['FileName']]['FileName'] = $row['FileName'];
            }

            return $objUIData;
        }

        function getSpriteImageData($db)
        {
            $objSpriteImageData = array();

            $qryGetSpriteImages =
            "
                select FileName,
                  FileType,
                  FilePath
                from Files
                where FileType = 'SpriteImage'
            ";

            foreach($db->query($qryGetSpriteImages) as $row)
            {
                $objSpriteImageData[$row['FileName']] = array();

                $objSpriteImageData[$row['FileName']]['FilePath'] = $row['FilePath'];
                $objSpriteImageData[$row['FileName']]['FileType'] = $row['FileType'];
                $objSpriteImageData[$row['FileName']]['FileName'] = $row['FileName'];
            }

            return $objSpriteImageData;
        }

        function getSpriteJSONData($db)
        {
            $objSpriteJSONData = array();

            $qryGetSpriteJSON =
                "
                select FileName,
                  FileType,
                  FilePath,
                  ifnull(TicksPerFrame, 0) as TicksPerFrame
                from Files
                where FileType = 'SpriteJSON'
            ";

            foreach($db->query($qryGetSpriteJSON) as $row)
            {
                $objSpriteJSONData[$row['FileName']] = array();

                $objSpriteJSONData[$row['FileName']]['FilePath'] = $row['FilePath'];
                $objSpriteJSONData[$row['FileName']]['FileType'] = $row['FileType'];
                $objSpriteJSONData[$row['FileName']]['FileName'] = $row['FileName'];
                $objSpriteJSONData[$row['FileName']]['TicksPerFrame'] = $row['TicksPerFrame'];
            }

            return $objSpriteJSONData;
        }

        function getSettingValues()
        {
            $objResponse = array
            (
                'blnSuccess' => false,
                'strMessage' => 'Error retrieving settings.'
            );

            $strSessionId = $_GET['sessionId'];
            require 'databaseHandler.php';

            $qryGetSettingValues =
            "
                select SettingCode,
                    SettingValue
                from Sessions ses
                    join Settings sts on sts.UserId = ses.UserId
                where ses.sessionId = 
            " . $strSessionId;

            foreach($db->query($qryGetSettingValues) as $row)
            {
                $objResponse[$row['SettingCode']] = $row['SettingValue'];
                $objResponse['blnSuccess'] = true;
                $objResponse['strMessage'] = 'Settings successfully retrieved.';
            }

            return $objResponse;
        }

        function setSettingValue()
        {
            $intSessionId = (int)$_GET['sessionId'];
            $strSettingCode = $_GET['settingCode'];
            $blnSettingValue = $_GET['settingValue'] === 'true' ? true : false;

            require 'databaseHandler.php';

            $qrySetSetting = $db->prepare(
            "
              update Settings sts
                join Sessions ses on ses.userId = sts.userId
              set sts.SettingValue = :settingValue
              where ses.SessionId = :sessionId
                and sts.SettingCode = :settingCode
            ");

            $qrySetSetting->execute(array(':settingValue' => $blnSettingValue, ':sessionId' => $intSessionId, ':settingCode' => $strSettingCode));

            $objResponse = array
            (
                'blnSuccess' => true,
                'strMessage' => 'Success pushing settings.'
            );

            return $objResponse;
        }

        function submitScore()
        {
            $intSessionId = (int)$_GET['sessionId'];
            $intScore = (int)$_GET['score'];
            $strLevel = 'level' . $_GET['level'];

            require 'databaseHandler.php';

            $qrySubmitScore = $db->prepare(
            "
                set @LevelHeaderId = 0;
                set @UserId = 0;
                set @AnoymousUserId = 0;
                
                select LevelHeaderId
                into @LevelHeaderId
                from LevelHeader
                where levelCode = :level;
                
                select UserId
                into @UserId
                from Sessions
                where SessionId = :sessionId;
                
                select UserId
                into @AnoymousUserId
                from Users
                where Username = 'Anonymous';
                
                insert into Leaderboard (LevelHeaderId, UserId, Score)
                  select @LevelHeaderId, 
                    if(@UserId > 0, @UserId, @AnoymousUserId),
                    :score;
            ");

            $qrySubmitScore->execute(array(':level' => $strLevel, ':sessionId' => $intSessionId, ':score' => $intScore));

            $objResponse = array
            (
                'blnSuccess' => true,
                'strMessage' => 'Success submitting score.'
            );

            return $objResponse;
        }

        function saveGame()
        {
            $intSessionId = (int)$_GET['sessionId'];
            $intLevel = (int)$_GET['level'];
            $intEarnings = (int)$_GET['earnings'];
            $intScore = (int)$_GET['score'];
            $intPTO = (int)$_GET['pto'];
            $intWindate = (int)$_GET['windate'];
            $intNespresso = (int)$_GET['nespresso'];
            $strActiveIDE = $_GET['activeide'];
            $intNotepad = (int)$_GET['notepad'];
            $intNotepadPlusPlus = (int)$_GET['notepadplusplus'];
            $intFar = (int)$_GET['far'];
            $intEclipse = (int)$_GET['eclipse'];
            $intDreamweaver = (int)$_GET['dreamweaver'];
            $intMuleStudio = (int)$_GET['muleStudio'];
            $intIntelliJ = (int)$_GET['intelliJ'];
            $intNetbeans = (int)$_GET['netbeans'];

            require 'databaseHandler.php';

            $qrySaveGame = $db->prepare(
            "
                delete sg
                from SavedGames sg
                  join Sessions ses on ses.UserId = sg.UserId
                where sessionId = :sessionId;
                
                insert into SavedGames (UserId, NextLevel, Earnings, Score, PTO, Windate, Nespresso, ActiveIDE, Notepad, NotepadPlusPlus, Far, Eclipse, Dreamweaver, MuleStudio, IntelliJ, Netbeans)
                  select UserId,
                    :level,
                    :earnings,
                    :score,
                    :pto,
                    :windate,
                    :nespresso,
                    :activeIDE,
                    :notepad,
                    :notepadplusplus,
                    :far,
                    :eclipse,
                    :dreamweaver,
                    :muleStudio,
                    :intelliJ,
                    :netbeans
                  from Sessions
                  where SessionId = :sessionId
                    and SessionActive = 1;
            ");

            $qrySaveGame->execute(array(':level' => $intLevel, ':sessionId' => $intSessionId, ':score' => $intScore, ':earnings' => $intEarnings, ':pto' => $intPTO, ':windate' => $intWindate,
                ':nespresso' => $intNespresso, ':activeIDE' => $strActiveIDE, ':notepad' => $intNotepad, ':notepadplusplus' => $intNotepadPlusPlus, ':far' => $intFar, ':eclipse' => $intEclipse, ':dreamweaver' => $intDreamweaver,
                ':muleStudio' => $intMuleStudio, ':intelliJ' => $intIntelliJ, ':netbeans' => $intNetbeans));

            $objResponse = array
            (
                'blnSuccess' => true,
                'strMessage' => 'Success saving game.'
            );

            return $objResponse;
        }

        function loadGame()
        {
            $objResponse = array
            (
                'blnSuccess' => false,
                'strMessage' => 'Failed loading game.'
            );

            $intSessionId = (int)$_GET['sessionId'];
            require 'databaseHandler.php';

            $qryGetSavedGame =
            "
                select NextLevel,
                  Earnings,
                  Score,
                  PTO,
                  WinDate,
                  Nespresso,
                  ActiveIDE,
                  Notepad,
                  NotepadPlusPlus,
                  Far,
                  Eclipse,
                  Dreamweaver,
                  MuleStudio,
                  IntelliJ,
                  Netbeans
                from SavedGames sg
                  join Sessions ses on ses.UserId = sg.UserId
                where ses.SessionId = 
            " . $intSessionId . ";
                delete sg
                from SavedGames sg
                  join Sessions ses on ses.UserId = sg.UserId
                where sessionId = ". $intSessionId;

            foreach($db->query($qryGetSavedGame) as $row)
            {
                $objResponse['level'] = $row['NextLevel'];
                $objResponse['earnings'] = $row['Earnings'];
                $objResponse['score'] = $row['Score'];
                $objResponse['pto'] = $row['PTO'];
                $objResponse['windate'] = $row['WinDate'];
                $objResponse['nespresso'] = $row['Nespresso'];
                $objResponse['activeIDE'] = $row['ActiveIDE'];
                $objResponse['notepad'] = $row['Notepad'];
                $objResponse['notepadPlusPlus'] = $row['NotepadPlusPlus'];
                $objResponse['far'] = $row['Far'];
                $objResponse['eclipse'] = $row['Eclipse'];
                $objResponse['dreamweaver'] = $row['Dreamweaver'];
                $objResponse['muleStudio'] = $row['MuleStudio'];
                $objResponse['intelliJ'] = $row['IntelliJ'];
                $objResponse['netbeans'] = $row['Netbeans'];

                $objResponse['blnSuccess'] = true;
                $objResponse['strMessage'] = 'Game successfully loaded.';
            }

            return $objResponse;
        }
    }

    $clsGameHandler = new gameHandler();
?>