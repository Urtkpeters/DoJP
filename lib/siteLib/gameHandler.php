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

            $qryInsertUser = $db->prepare(
            "
              update Settings sts
                join Sessions ses on ses.userId = sts.userId
              set sts.SettingValue = :settingValue
              where ses.SessionId = :sessionId
                and sts.SettingCode = :settingCode
            ");

            $qryInsertUser->execute(array(':settingValue' => $blnSettingValue, ':sessionId' => $intSessionId, ':settingCode' => $strSettingCode));

            $objResponse = array
            (
                'blnSuccess' => true,
                'strMessage' => 'Success pushing settings.'
            );

            return $objResponse;
        }
    }

    $clsGameHandler = new gameHandler();
?>