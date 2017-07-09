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
                select LevelHeaderId, 
                  LevelName,
                  LevelCode,
                  MultiplierTier1,
                  MultiplierTier2,
                  MultiplierTier3,
                  MultiplierTier4,
                  fil.FileName
                from LevelHeader lh
                  join Files fil on fil.fileid = lh.Music_fileid
            ';

            foreach($this->db->query($qryGetLevelHeaders) as $row)
            {
                $levelHeaderId = $row['LevelHeaderId'];
                $levelCode = $row['LevelCode'];

                $objGameData[$levelCode] = array();
                $objGameData[$levelCode]['levelName'] = $row['LevelName'];
                $objGameData[$levelCode]['levelCode'] = $levelCode;
                $objGameData[$levelCode]['levelMusic'] = $row['FileName'];
                $objGameData[$levelCode]['MultiplierTier1'] = $row['MultiplierTier1'];
                $objGameData[$levelCode]['MultiplierTier2'] = $row['MultiplierTier2'];
                $objGameData[$levelCode]['MultiplierTier3'] = $row['MultiplierTier3'];
                $objGameData[$levelCode]['MultiplierTier4'] = $row['MultiplierTier4'];
                $objGameData[$levelCode]['levelEntities'] = array();

                $qryGetLevelEntities = '
                    select Type,
                        EntityName,
                        Movement,
                        Timing,
                        WaveNumber
                    from LevelEntities le
                        join Entities ent on ent.EntityId = le.EntityId
                    where LevelHeaderId = ' . $levelHeaderId;

                $intRowCounter = 0;
                foreach($this->db->query($qryGetLevelEntities) as $row2)
                {
                    $objGameData[$levelCode]['levelEntities']['entity' . $intRowCounter] = array();
                    $objGameData[$levelCode]['levelEntities']['entity' . $intRowCounter]['type'] = $row2['Type'];
                    $objGameData[$levelCode]['levelEntities']['entity' . $intRowCounter]['entityName'] = $row2['EntityName'];
                    $objGameData[$levelCode]['levelEntities']['entity' . $intRowCounter]['movement'] = $row2['Movement'];
                    $objGameData[$levelCode]['levelEntities']['entity' . $intRowCounter]['timing'] = $row2['Timing'];
                    $objGameData[$levelCode]['levelEntities']['entity' . $intRowCounter]['waveNumber'] = $row2['WaveNumber'];

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
                select EntityName, 
                  EntityType,
                  HP,
                  Speed,
                  AttackType,
                  Cooldown,
                  ifnull(SpawnSound, 'none') as SpawnSound,
                  Bounty
                from Entities
            ";

            foreach($this->db->query($qryGetEntities) as $row)
            {
                $objLevelData[$row['EntityName']] = array();

                $objLevelData[$row['EntityName']]['entityName'] = $row['EntityName'];
                $objLevelData[$row['EntityName']]['entityType'] = $row['EntityType'];
                $objLevelData[$row['EntityName']]['hp'] = $row['HP'];
                $objLevelData[$row['EntityName']]['speed'] = $row['Speed'];
                $objLevelData[$row['EntityName']]['attackType'] = $row['AttackType'];
                $objLevelData[$row['EntityName']]['cooldown'] = $row['Cooldown'];
                $objLevelData[$row['EntityName']]['spawnSound'] = $row['SpawnSound'];
                $objLevelData[$row['EntityName']]['bounty'] = $row['Bounty'];
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
                  Volume
                from Files
                where FileType = 'sound';
            ";

            foreach($this->db->query($qryGetSounds) as $row)
            {
                $objSoundData[$row['FileName']] = array();

                $objSoundData[$row['FileName']]['FilePath'] = $row['FilePath'];
                $objSoundData[$row['FileName']]['FileType'] = $row['FileType'];
                $objSoundData[$row['FileName']]['FileName'] = $row['FileName'];
                $objSoundData[$row['FileName']]['volume'] = $row['Volume'];
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
                  Volume
                from Files
                where FileType = 'music';
            ";

            foreach($this->db->query($qryGetMusic) as $row)
            {
                $objMusicData[$row['FileName']] = array();

                $objMusicData[$row['FileName']]['FilePath'] = $row['FilePath'];
                $objMusicData[$row['FileName']]['FileType'] = $row['FileType'];
                $objMusicData[$row['FileName']]['FileName'] = $row['FileName'];
                $objMusicData[$row['FileName']]['volume'] = $row['Volume'];
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
                    SettingValue+0 as SettingValue
                from Sessions ses
                    join Settings sts on sts.UserId = ses.UserId
                where ses.SessionId = 
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
                join Sessions ses on ses.UserId = sts.UserId
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
                    where LevelCode = :level;
                    
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
                where SessionId = :sessionId;
            ");

            $qryDeleteSaves->execute(array(':sessionId' => $sessionId));

            $qrySaveGame = $this->db->prepare(
            "
                insert into SavedGames (UserId, NextLevel, Earnings, Score, PTO, Windate, Nespresso, ActiveIDE, Notepad, NotepadPlusPlus, Far, Eclipse, Dreamweaver, MuleStudio, IntelliJ, Netbeans, PurchasedPTO)
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
                  PurchasedPTO
                from SavedGames sg
                  join Sessions ses on ses.UserId = sg.UserId
                where ses.SessionId = 
            " . $sessionId . ";
                delete sg
                from SavedGames sg
                  join Sessions ses on ses.UserId = sg.UserId
                where SessionId = ". $sessionId;

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
                $objResponse['purchasedPTO'] = $row['PurchasedPTO'];

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
                    lh.LevelNumber
                  from Leaderboard lb
                    join Users usr on usr.UserId = lb.UserId
                    join LevelHeader lh on lh.LevelHeaderId = lb.LevelHeaderId
                  order by Score desc, LevelNumber desc
                  limit 25
                ) as sub;
            ');

            $qryLeaderboard->execute();
            return $qryLeaderboard->fetchAll();
        }

        function checkForSave($sessionId)
        {
            $objResponse = array
            (
                'blnSuccess' => true,
                'strMessage' => ''
            );

            $qryCheckForSave =
            "
                select SavedGameId
                from SavedGames sg
                  join Sessions ses on ses.UserId = sg.UserId
                where ses.SessionId = " . $sessionId . ";
            ";

            foreach($this->db->query($qryCheckForSave) as $row)
            {
                $objResponse['blnSuccess'] = true;
                $objResponse['strMessage'] = $row['SavedGameId'];
            }

            return $objResponse;
        }

        function submitLevelStats($levelCode, $levelTiming, $playerEarnings, $playerPTO, $playerIDE)
        {
            $objResponse = array
            (
                'blnSuccess' => true,
                'strMessage' => ''
            );

            $qrySubmitLevelStats = $this->db->prepare
            ('
                insert into LevelStats(LevelHeaderId, CreateDate, LevelTiming, PlayerEarnings, PlayerPTO, PlayerIDE)
                  select LevelHeaderId,
                    now(),
                    :levelTiming,
                    :playerEarnings,
                    :playerPTO,
                    :playerIDE
                  from LevelHeader
                  where LevelCode = :levelCode;
            ');

            $qrySubmitLevelStats->execute(array(':levelCode' => $levelCode,':levelTiming' =>  $levelTiming,':playerEarnings' =>  $playerEarnings,':playerPTO' =>  $playerPTO,':playerIDE' =>  $playerIDE));

            return $objResponse;
        }
    }

    $clsGameHandler = new gameHandler();