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
                  levelMusic
                from LevelHeader
            ';

            foreach($db->query($qryGetLevelHeaders) as $row)
            {
                $levelHeaderId = $row['levelHeaderId'];
                $levelCode = $row['levelCode'];

                $objGameData[$levelCode] = array();
                $objGameData[$levelCode]['levelName'] = $row['levelName'];
                $objGameData[$levelCode]['levelCode'] = $levelCode;
                $objGameData[$levelCode]['levelMusic'] = $row['levelMusic'];
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
    }

    $clsGameHandler = new gameHandler();
?>