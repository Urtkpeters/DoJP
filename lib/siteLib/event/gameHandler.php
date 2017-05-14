<?php
    require_once 'databaseHandler.php';

    class gameHandler extends databaseHandler
    {
        function getGameData()
        {
            $objResponse = array
            (
                'blnSuccess' => false,
                'strMessage' => 'Error getting game data.'
            );

            $objResponse['entityData'] = $this->getEntityData();
            $objResponse['levelData'] = $this->getLevelData();
            $objResponse['UIData'] = $this->getUIData();
            $objResponse['SpriteImageData'] = $this->getSpriteImageData();
            $objResponse['SpriteJSONData'] = $this->getSpriteJSONData();
            $objResponse['soundData'] = $this->getSoundData();
            $objResponse['musicData'] = $this->getMusicData();

            if(count($objResponse['entityData']) > 0 && count($objResponse['levelData']) > 0)
            {
                $objResponse['blnSuccess'] = true;
                $objResponse['strMessage'] = 'Success in retrieving module data.';
            }

            return $objResponse;
        }

        function getLevelData()
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
                  join Files fil on fil.fileid = lh.Music_fileid
            ';

            foreach($this->db->query($qryGetLevelHeaders) as $row)
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
                foreach($this->db->query($qryGetLevelEntities) as $row2)
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

        function getEntityData()
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

            foreach($this->db->query($qryGetEntities) as $row)
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

        function getSoundData()
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

            foreach($this->db->query($qryGetSounds) as $row)
            {
                $objSoundData[$row['FileName']] = array();

                $objSoundData[$row['FileName']]['FilePath'] = $row['FilePath'];
                $objSoundData[$row['FileName']]['FileType'] = $row['FileType'];
                $objSoundData[$row['FileName']]['FileName'] = $row['FileName'];
                $objSoundData[$row['FileName']]['volume'] = $row['volume'];
            }

            return $objSoundData;
        }

        function getMusicData()
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

            foreach($this->db->query($qryGetMusic) as $row)
            {
                $objMusicData[$row['FileName']] = array();

                $objMusicData[$row['FileName']]['FilePath'] = $row['FilePath'];
                $objMusicData[$row['FileName']]['FileType'] = $row['FileType'];
                $objMusicData[$row['FileName']]['FileName'] = $row['FileName'];
                $objMusicData[$row['FileName']]['volume'] = $row['volume'];
            }

            return $objMusicData;
        }

        function getUIData()
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

            foreach($this->db->query($qryGetUI) as $row)
            {
                $objUIData[$row['FileName']] = array();

                $objUIData[$row['FileName']]['FilePath'] = $row['FilePath'];
                $objUIData[$row['FileName']]['FileType'] = $row['FileType'];
                $objUIData[$row['FileName']]['FileName'] = $row['FileName'];
            }

            return $objUIData;
        }

        function getSpriteImageData()
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

            foreach($this->db->query($qryGetSpriteImages) as $row)
            {
                $objSpriteImageData[$row['FileName']] = array();

                $objSpriteImageData[$row['FileName']]['FilePath'] = $row['FilePath'];
                $objSpriteImageData[$row['FileName']]['FileType'] = $row['FileType'];
                $objSpriteImageData[$row['FileName']]['FileName'] = $row['FileName'];
            }

            return $objSpriteImageData;
        }

        function getSpriteJSONData()
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

            foreach($this->db->query($qryGetSpriteJSON) as $row)
            {
                $objSpriteJSONData[$row['FileName']] = array();

                $objSpriteJSONData[$row['FileName']]['FilePath'] = $row['FilePath'];
                $objSpriteJSONData[$row['FileName']]['FileType'] = $row['FileType'];
                $objSpriteJSONData[$row['FileName']]['FileName'] = $row['FileName'];
                $objSpriteJSONData[$row['FileName']]['TicksPerFrame'] = $row['TicksPerFrame'];
            }

            return $objSpriteJSONData;
        }

        function getSettingValues($sessionId)
        {
            $objResponse = array
            (
                'blnSuccess' => false,
                'strMessage' => 'Error retrieving settings.'
            );

            $qryGetSettingValues =
            "
                select SettingCode,
                    SettingValue
                from Sessions ses
                    join Settings sts on sts.UserId = ses.UserId
                where ses.sessionId = 
            " . $sessionId;

            foreach ($this->db->query($qryGetSettingValues) as $row) {
                $objResponse[$row['SettingCode']] = $row['SettingValue'];
                $objResponse['blnSuccess'] = true;
                $objResponse['strMessage'] = 'Settings successfully retrieved.';
            }

            return $objResponse;
        }

        function setSettingValue($sessionId, $settingCode, $settingValue)
        {
            if($settingValue == 'true')
            {
                $settingValue = true;
            }
            else
            {
                $settingValue = false;
            }

            $qrySetSetting = $this->db->prepare(
            "
              update Settings sts
                join Sessions ses on ses.userId = sts.userId
              set sts.SettingValue = :settingValue
              where ses.SessionId = :sessionId
                and sts.SettingCode = :settingCode
            ");

            $qrySetSetting->execute(array(':settingValue' => $settingValue, ':sessionId' => $sessionId, ':settingCode' => $settingCode));

            $objResponse = array
            (
                'blnSuccess' => true,
                'strMessage' => 'Success pushing settings.'
            );

            return $objResponse;
        }

        function submitScore($sessionId, $score, $level)
        {
            $objResponse = array
            (
                'blnSuccess' => false,
                'strMessage' => 'Error submitting score.'
            );

            if(isset($sessionId) && isset($score) && isset($level))
            {
                $level = 'level' . $_GET['level'];

                $qrySubmitScore = $this->db->prepare(
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

                $qrySubmitScore->execute(array(':level' => $level, ':sessionId' => $sessionId, ':score' => $score));

                $objResponse = array
                (
                    'blnSuccess' => true,
                    'strMessage' => 'Success submitting score.'
                );
            }

            return $objResponse;
        }

        function saveGame($sessionId, $level, $earnings, $score, $pto, $windate, $nespresso,
                          $activeide, $notepad, $notepadplusplus, $far, $eclipse, $dreamweaver, $muleStudio, $intelliJ, $netbeans, $purchasedPTO)
        {
            $qryDeleteSaves = $this->db->prepare(
            "
                delete sg
                from SavedGames sg
                  join Sessions ses on ses.UserId = sg.UserId
                where sessionId = :sessionId;
            ");

            $qryDeleteSaves->execute(array(':sessionId' => $sessionId));

            $qrySaveGame = $this->db->prepare(
            "
                insert into SavedGames (UserId, NextLevel, Earnings, Score, PTO, Windate, Nespresso, ActiveIDE, Notepad, NotepadPlusPlus, Far, Eclipse, Dreamweaver, MuleStudio, IntelliJ, Netbeans, purchasedPTO)
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
                    :netbeans,
                    :purchasedPTO
                  from Sessions
                  where SessionId = :sessionId
                    and SessionActive = 1;
            ");

            $qrySaveGame->execute(array(':level' => $level, ':sessionId' => $sessionId, ':score' => $score, ':earnings' => $earnings, ':pto' => $pto, ':windate' => $windate,
                ':nespresso' => $nespresso, ':activeIDE' => $activeide, ':notepad' => $notepad, ':notepadplusplus' => $notepadplusplus, ':far' => $far, ':eclipse' => $eclipse, ':dreamweaver' => $dreamweaver,
                ':muleStudio' => $muleStudio, ':intelliJ' => $intelliJ, ':netbeans' => $netbeans, ':purchasedPTO' => $purchasedPTO));

            $objResponse = array
            (
                'blnSuccess' => true,
                'strMessage' => 'Success saving game.'
            );

            return $objResponse;
        }

        function loadGame($sessionId)
        {
            $objResponse = array
            (
                'blnSuccess' => false,
                'strMessage' => 'Failed loading game.'
            );

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
                  Netbeans,
                  purchasedPTO
                from SavedGames sg
                  join Sessions ses on ses.UserId = sg.UserId
                where ses.SessionId = 
            " . $sessionId . ";
                delete sg
                from SavedGames sg
                  join Sessions ses on ses.UserId = sg.UserId
                where sessionId = ". $sessionId;

            foreach($this->db->query($qryGetSavedGame) as $row)
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
                $objResponse['purchasedPTO'] = $row['purchasedPTO'];

                $objResponse['blnSuccess'] = true;
                $objResponse['strMessage'] = 'Game successfully loaded.';
            }

            return $objResponse;
        }

        function getLeaderboardData()
        {
            $this->db->exec("set @rank = 0;");

            $qryLeaderboard = $this->db->prepare
            ('
                select *,
                  @rank:=@rank+1 as rank
                from
                (
                  select usr.Username,
                    lb.Score,
                    lh.levelNumber
                  from Leaderboard lb
                    join Users usr on usr.UserId = lb.UserId
                    join LevelHeader lh on lh.LevelHeaderId = lb.LevelHeaderId
                  order by Score desc, levelNumber desc
                  limit 25
                ) as sub;
            ');

            $qryLeaderboard->execute();
            return $qryLeaderboard->fetchAll();
        }
    }

    $clsGameHandler = new gameHandler();