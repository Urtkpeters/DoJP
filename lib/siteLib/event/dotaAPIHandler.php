<?php
// 2505773584450FF3BDCD8F3C514E9CE1

require_once 'lib/siteLib/event/databaseHandler.php';

class dotaAPI extends databaseHandler
{
    function executeGet($url)
    {
        $response = file_get_contents($url);

        return $response;
    }

    function getPlayerData()
    {
        $url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=2505773584450FF3BDCD8F3C514E9CE1&steamids=76561197977943068,76561197964315182,76561198048218230,76561198048643444,76561198080968832,76561198140012652';
        $playerData = (object)[];

        $response = $this->executeGet($url);

        foreach(json_decode($response) as $value)
        {
            foreach($value as $key2 => $value2)
            {
                foreach($value2 as $key3 => $value3)
                {
                    $currentId = 0;

                    foreach($value3 as $key4 => $value4)
                    {
                        if($key4 == 'steamid')
                        {
                            $currentId = $value4;

                            $playerData->$currentId = (object)[];
                            $playerData->$currentId->steamId64 = $currentId;
                            $playerData->$currentId->steamId32 = substr($currentId, 3) - 61197960265728;
                        }
                        else if($key4 == 'personaname')
                        {
                            $playerData->$currentId->playerName = $value4;
                        }
                        else if($key4 == 'avatar')
                        {
                            $playerData->$currentId->icon = $value4;
                        }
                        else if($key4 == 'avatarmedium')
                        {
                            $playerData->$currentId->iconMedium = $value4;
                        }
                        else if($key4 == 'avatarfull')
                        {
                            $playerData->$currentId->iconFull = $value4;
                        }
                    }
                }
            }
        }

        return $playerData;
    }

    function syncMatchData($matchId, $playerData)
    {
        $url = 'http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1?key=2505773584450FF3BDCD8F3C514E9CE1&match_id='.$matchId;

        $matchResponse = $this->executeGet($url);

        $victoryTeam = 'radiant';
        $matchData = (object)[];
        $matchData->matchId = $matchId;
        $matchData->duration = 0;
        $matchData->startDate = 0;
        $matchData->lobbyType = '';
        $matchData->gameMode = '';
        $matchData->playerTeam = 'radiant';
        $matchData->playerTeamVictory = false;
        $matchData->matchLineData = (object)[];

        foreach(json_decode($matchResponse) as $value)
        {
            foreach($value as $key2 => $value2)
            {
                if($key2 == 'radiant_win' && !$value2)
                {
                    $victoryTeam == 'dire';
                }
                else if($key2 == 'duration')
                {
                    $matchData->duration = $value2;
                }
                else if($key2 == 'start_time')
                {
                    $dateTime = new DateTime("@$value2");
                    $matchData->startDate = $dateTime->format('Y-m-d H:i:s');
                }
                else if($key2 == 'match_id')
                {
                    $matchData->matchId = $value2;
                }
                else if($key2 == 'lobby_type')
                {
                    switch($value2)
                    {
                        case -1:
                            $matchData->lobbyType = 'Invalid';
                            break;
                        case 0:
                            $matchData->lobbyType = 'Public Matchmaking';
                            break;
                        case 1:
                            $matchData->lobbyType = 'Practice';
                            break;
                        case 2:
                            $matchData->lobbyType = 'Tournament';
                            break;
                        case 3:
                            $matchData->lobbyType = 'Tutorial';
                            break;
                        case 4:
                            $matchData->lobbyType = 'Co-op with Bots';
                            break;
                        case 5:
                            $matchData->lobbyType = 'Team match';
                            break;
                        case 6:
                            $matchData->lobbyType = 'Solo Queue';
                            break;
                        case 7:
                            $matchData->lobbyType = 'Ranked';
                            break;
                        case 8:
                            $matchData->lobbyType = '1v1 Mid';
                            break;
                    }
                }
                else if($key2 == 'game_mode')
                {
                    switch($value2)
                    {
                        case 0:
                            $matchData->gameMode = 'None';
                            break;
                        case 1:
                            $matchData->gameMode = 'All Pick';
                            break;
                        case 2:
                            $matchData->gameMode = 'Captains Mode';
                            break;
                        case 3:
                            $matchData->gameMode = 'Random Draft';
                            break;
                        case 4:
                            $matchData->gameMode = 'Single Draft';
                            break;
                        case 5:
                            $matchData->gameMode = 'All Random';
                            break;
                        case 6:
                            $matchData->gameMode = 'Intro';
                            break;
                        case 7:
                            $matchData->gameMode = 'Diretide';
                            break;
                        case 8:
                            $matchData->gameMode = 'Reverse Captains Mode';
                            break;
                        case 9:
                            $matchData->gameMode = 'The Greeviling';
                            break;
                        case 10:
                            $matchData->gameMode = 'Tutorial';
                            break;
                        case 11:
                            $matchData->gameMode = 'Mid Only';
                            break;
                        case 12:
                            $matchData->gameMode = 'Least Played';
                            break;
                        case 13:
                            $matchData->gameMode = 'New Player Pool';
                            break;
                        case 14:
                            $matchData->gameMode = 'Compendium Matchmaking';
                            break;
                        case 15:
                            $matchData->gameMode = 'Co-op vs Bots';
                            break;
                        case 16:
                            $matchData->gameMode = 'Captains Draft';
                            break;
                        case 17:
                            $matchData->gameMode = 'Ability Draft';
                            break;
                        case 18:
                            $matchData->gameMode = 'All Random Deathmatch';
                            break;
                        case 20:
                            $matchData->gameMode = 'All Random Deathmatch';
                            break;
                        case 21:
                            $matchData->gameMode = '1v1 Mid Only';
                            break;
                        case 22:
                            $matchData->gameMode = 'Ranked Matchmaking';
                            break;
                    }
                }
                else if($key2 == 'players')
                {
                    foreach($value2 as $key3 => $value3)
                    {
                        $accountId = 0;
                        $accountId64 = 0;
                        $playerName = 'Rando';
                        $playerSlot = 0;

                        foreach($value3 as $key4 => $value4)
                        {
                            if($key4 == 'account_id')
                            {
                                $accountId = $value4;

                                if($accountId == '17677340' || $accountId == '120703104' || $accountId == '4049454' || $accountId == '87952502' || $accountId == '88377716' || $accountId == '179746924')
                                {
                                    if($playerSlot == '5' || $playerSlot == '6' || $playerSlot == '7' || $playerSlot == '8' || $playerSlot == '9')
                                    {
                                        $playerTeam = 'dire';
                                    }

                                    foreach($playerData as $playerId => $player)
                                    {
                                        if($accountId == $player->steamId32)
                                        {
                                            $accountId64 = $player->steamId64;
                                            $accountId = $player->steamId32;
                                            $playerName = $player->playerName;
                                        }
                                    }
                                }
                            }
                            else if($key4 == 'player_slot')
                            {
                                $playerSlot = $value4;

                                $matchData->matchLineData->$playerSlot = (object)[];
                                $matchData->matchLineData->$playerSlot->accountId64 = $accountId64;
                                $matchData->matchLineData->$playerSlot->accountId32 = $accountId;
                                $matchData->matchLineData->$playerSlot->playerName = $playerName;

                                if($playerSlot == '0' || $playerSlot == '1' || $playerSlot == '2' || $playerSlot == '3' || $playerSlot == '4')
                                {
                                    $matchData->matchLineData->$playerSlot->currentTeam = 'radiant';
                                }
                                else
                                {
                                    $matchData->matchLineData->$playerSlot->currentTeam = 'dire';
                                }
                            }
                            else if($key4 == 'hero_id')
                            {
                                $matchData->matchLineData->$playerSlot->heroId = $value4;
                            }
                            else if($key4 == 'kills')
                            {
                                $matchData->matchLineData->$playerSlot->kills = $value4;
                            }
                            else if($key4 == 'deaths')
                            {
                                $matchData->matchLineData->$playerSlot->deaths = $value4;
                            }
                            else if($key4 == 'assists')
                            {
                                $matchData->matchLineData->$playerSlot->assists = $value4;
                            }
                            else if($key4 == 'level')
                            {
                                $matchData->matchLineData->$playerSlot->level = $value4;
                            }
                            else if($key4 == 'gold_spent')
                            {
                                $matchData->matchLineData->$playerSlot->gold = $value4;
                            }
                            else if($key4 == 'last_hits')
                            {
                                $matchData->matchLineData->$playerSlot->lastHits = $value4;
                            }
                            else if($key4 == 'denies')
                            {
                                $matchData->matchLineData->$playerSlot->denies = $value4;
                            }
                            else if($key4 == 'gold_per_min')
                            {
                                $matchData->matchLineData->$playerSlot->goldPerMinute = $value4;
                            }
                            else if($key4 == 'xp_per_min')
                            {
                                $matchData->matchLineData->$playerSlot->xpPerMinute = $value4;
                            }
                            else if($key4 == 'hero_damage')
                            {
                                $matchData->matchLineData->$playerSlot->heroDamage = $value4;
                            }
                            else if($key4 == 'tower_damage')
                            {
                                $matchData->matchLineData->$playerSlot->buildingDamage = $value4;
                            }
                            else if($key4 == 'hero_healing')
                            {
                                $matchData->matchLineData->$playerSlot->healing = $value4;
                            }
                            else if($key4 == 'item_0')
                            {
                                $matchData->matchLineData->$playerSlot->item0 = $value4;
                            }
                            else if($key4 == 'item_1')
                            {
                                $matchData->matchLineData->$playerSlot->item1 = $value4;
                            }
                            else if($key4 == 'item_2')
                            {
                                $matchData->matchLineData->$playerSlot->item2 = $value4;
                            }
                            else if($key4 == 'item_3')
                            {
                                $matchData->matchLineData->$playerSlot->item3 = $value4;
                            }
                            else if($key4 == 'item_4')
                            {
                                $matchData->matchLineData->$playerSlot->item4 = $value4;
                            }
                            else if($key4 == 'item_5')
                            {
                                $matchData->matchLineData->$playerSlot->item5 = $value4;
                            }
                            else if($key4 == 'backpack_0')
                            {
                                $matchData->matchLineData->$playerSlot->item6 = $value4;
                            }
                            else if($key4 == 'backpack_1')
                            {
                                $matchData->matchLineData->$playerSlot->item7 = $value4;
                            }
                            else if($key4 == 'backpack_2')
                            {
                                $matchData->matchLineData->$playerSlot->item8 = $value4;
                            }
                        }
                    }
                }
            }
        }

        if($matchData->playerTeam == $victoryTeam)
        {
            $matchData->playerTeamVictory == true;
        }

        return $matchData;
    }

    function syncMatches()
    {
        $playerData = $this->getPlayerData();
        $accountIds = ['17677340','120703104','4049454','87952502','88377716','179746924'];

        foreach($accountIds as $accountId)
        {
            $getMore = true;

            while($getMore)
            {
                $url = 'http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key=2505773584450FF3BDCD8F3C514E9CE1&matches_requested=10&account_id='.$accountId;

                $matchList = $this->executeGet($url);

                //Get the most recent match id from the DB

                foreach(json_decode($matchList) as $key => $value)
                {
                    foreach($value as $key2 => $value2)
                    {
                        if($key2 == 'matches')
                        {
                            foreach($value2 as $key3 => $value3)
                            {
                                foreach($value3 as $key4 => $value4)
                                {
                                    if($key4 == 'match_id')
                                    {
                                        //if the match doesn't already exist in the DB
                                        $matchDetails = $this->syncMatchData($value4, $playerData);
                                        var_dump($matchDetails);
                                        //insert the match header into the DB
                                        //insert the match lines into the DB
                                        //else
                                        $getMore = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        $objRequestResponse = array
        (
            'blnSuccess' => true,
            'strMessage' => 'Dota API get successful.'
        );

        return $objRequestResponse;
    }

    function getMatches()
    {
        $matchIds = '';
        $matches = [];

        $qryMatchHeaders =
        "
            select MatchId,
                MatchDate,
                Duration,
                LobbyType,
                GameMode,
                PlayerTeam,
                PlayerVictory
            from MatchHeader
            limit 10
        ";

        foreach($this->db->query($qryMatchHeaders) as $row)
        {
            $matchId = $row['MatchId'];
            $matchIds .= $matchId.',';

            $matches[$matchId] = [];
            $matches[$matchId]['MatchId'] = $row['MatchId'];
            $matches[$matchId]['MatchDate'] = $row['MatchDate'];
            $matches[$matchId]['Duration'] = $row['Duration'];
            $matches[$matchId]['LobbyType'] = $row['LobbyType'];
            $matches[$matchId]['GameMode'] = $row['GameMode'];
            $matches[$matchId]['PlayerTeam'] = $row['PlayerTeam'];
            $matches[$matchId]['PlayerVictory'] = $row['PlayerVictory'];
            $matches[$matchId]['MatchLines'] = [];
        }

        // Remove the last comma so it is not trailing.
        $matchIds = substr($matchIds, 0, -1);

        $qryMatchLines =
        "
            select mh.MatchId,
                ml.PlayerName,
                ml.Team,
                h.HeroName,
                ml.Kills,
                ml.Deaths,
                ml.Assists,
                ml.Level,
                ml.Networth,
                ml.LastHits,
                ml.Denies,
                ml.GPM,
                ml.XPM,
                ml.HeroDamage,
                ml.Healing,
                ml.BuildingDamage,
                i1.ItemName as 'Item1',
                i2.ItemName as 'Item2',
                i3.ItemName as 'Item3',
                i4.ItemName as 'Item4',
                i5.ItemName as 'Item5',
                i6.ItemName as 'Item6',
                i7.ItemName as 'Item7',
                i8.ItemName as 'Item8',
                i9.ItemName as 'Item9'
            from MatchHeader mh
                join MatchLine ml on ml.MatchId = mh.MatchId
                join Heroes h on h.HeroId = ml.HeroId
                join Items i1 on i1.ItemId = ml.ItemId1
                join Items i2 on i2.ItemId = ml.ItemId2
                join Items i3 on i3.ItemId = ml.ItemId3
                join Items i4 on i4.ItemId = ml.ItemId4
                join Items i5 on i5.ItemId = ml.ItemId5
                join Items i6 on i6.ItemId = ml.ItemId6
                join Items i7 on i7.ItemId = ml.ItemId7
                join Items i8 on i8.ItemId = ml.ItemId8
                join Items i9 on i9.ItemId = ml.ItemId9
            where mh.MatchId in (".$matchIds.")
            order by mh.MatchId
        ";

        $matchId = 0;
        $playerIndex = 0;

        foreach($this->db->query($qryMatchLines) as $row)
        {
            if($matchId != $row['MatchId'])
            {
                $matchId = $row['MatchId'];
                $playerIndex = 0;
            }

            $matches[$matchId]['MatchLines'][$playerIndex]['PlayerName'] = $row['PlayerName'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Team'] = $row['Team'];
            $matches[$matchId]['MatchLines'][$playerIndex]['HeroName'] = $row['HeroName'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Kills'] = $row['Kills'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Deaths'] = $row['Deaths'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Assists'] = $row['Assists'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Level'] = $row['Level'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Networth'] = $row['Networth'];
            $matches[$matchId]['MatchLines'][$playerIndex]['LastHits'] = $row['LastHits'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Denies'] = $row['Denies'];
            $matches[$matchId]['MatchLines'][$playerIndex]['GPM'] = $row['GPM'];
            $matches[$matchId]['MatchLines'][$playerIndex]['XPM'] = $row['XPM'];
            $matches[$matchId]['MatchLines'][$playerIndex]['HeroDamage'] = $row['HeroDamage'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Healing'] = $row['Healing'];
            $matches[$matchId]['MatchLines'][$playerIndex]['BuildingDamage'] = $row['BuildingDamage'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Item1'] = $row['Item1'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Item2'] = $row['Item2'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Item3'] = $row['Item3'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Item4'] = $row['Item4'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Item5'] = $row['Item5'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Item6'] = $row['Item6'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Item7'] = $row['Item7'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Item8'] = $row['Item8'];
            $matches[$matchId]['MatchLines'][$playerIndex]['Item9'] = $row['Item9'];

            $playerIndex += 1;
        }

        return $matches;
    }

    function getLandingData()
    {
        $landingData = [];
        $qryLandingData =
        "
            select 
                (select count(PlayerVictory) from MatchHeader where GameMode != 'Ability Draft') as 'AllTotal',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'All Pick') as 'APTotal',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'Captains Mode') as 'CMTotal',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'Random Draft') as 'RDTotal',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'Single Draft') as 'SDTotal',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'All Random') as 'ARTotal',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'Least Played') as 'LPTotal',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'Captains Draft') as 'CDTotal',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'Ability Draft') as 'ADTotal',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'All Random Deathmatch') as 'ARDTotal',
                (select count(PlayerVictory) from MatchHeader where GameMode != 'Ability Draft' and PlayerVictory = 1) as 'AllWins',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'All Pick' and PlayerVictory = 1) as 'APWins',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'Captains Mode' and PlayerVictory = 1) as 'CMWins',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'Random Draft' and PlayerVictory = 1) as 'RDWins',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'Single Draft' and PlayerVictory = 1) as 'SDWins',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'All Random' and PlayerVictory = 1) as 'ARWins',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'Least Played' and PlayerVictory = 1) as 'LPWins',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'Captains Draft' and PlayerVictory = 1) as 'CDWins',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'Ability Draft' and PlayerVictory = 1) as 'ADWins',
                (select count(PlayerVictory) from MatchHeader where GameMode = 'All Random Deathmatch' and PlayerVictory = 1) as 'ARDWins',
                (select count(PlayerVictory) from MatchHeader where GameMode != 'Ability Draft' and PlayerTeam = 'Radiant') as 'RadiantTotal',
                (select count(PlayerVictory) from MatchHeader where GameMode != 'Ability Draft' and PlayerTeam = 'Dire') as 'DireTotal',
                (select count(PlayerVictory) from MatchHeader where GameMode != 'Ability Draft' and PlayerTeam = 'Radiant' and PlayerVictory = 1) as 'RadiantWins',
                (select count(PlayerVictory) from MatchHeader where GameMode != 'Ability Draft' and PlayerTeam = 'Dire' and PlayerVictory = 1) as 'DireWins';
        ";

        foreach($this->db->query($qryLandingData) as $row)
        {
            $landingData['AllTotal'] = $row['AllTotal'];
            $landingData['APTotal'] = $row['APTotal'];
            $landingData['CMTotal'] = $row['CMTotal'];
            $landingData['RDTotal'] = $row['RDTotal'];
            $landingData['SDTotal'] = $row['SDTotal'];
            $landingData['ARTotal'] = $row['ARTotal'];
            $landingData['LPTotal'] = $row['LPTotal'];
            $landingData['CDTotal'] = $row['CDTotal'];
            $landingData['ADTotal'] = $row['ADTotal'];
            $landingData['ARDTotal'] = $row['ARDTotal'];

            $landingData['AllWins'] = $row['AllWins'];
            $landingData['APWins'] = $row['APWins'];
            $landingData['CMWins'] = $row['CMWins'];
            $landingData['RDWins'] = $row['RDWins'];
            $landingData['SDWins'] = $row['SDWins'];
            $landingData['ARWins'] = $row['ARWins'];
            $landingData['LPWins'] = $row['LPWins'];
            $landingData['CDWins'] = $row['CDWins'];
            $landingData['ADWins'] = $row['ADWins'];
            $landingData['ARDWins'] = $row['ARDWins'];

            $landingData['AllLosses'] = $row['AllTotal'] - $row['AllWins'];
            $landingData['APLosses'] = $row['APTotal'] - $row['APWins'];
            $landingData['CMLosses'] = $row['CMTotal'] - $row['CMWins'];
            $landingData['RDLosses'] = $row['RDTotal'] - $row['RDWins'];
            $landingData['SDLosses'] = $row['SDTotal'] - $row['SDWins'];
            $landingData['ARLosses'] = $row['ARTotal'] - $row['ARWins'];
            $landingData['LPLosses'] = $row['LPTotal'] - $row['LPWins'];
            $landingData['CDLosses'] = $row['CDTotal'] - $row['CDWins'];
            $landingData['ADLosses'] = $row['ADTotal'] - $row['ADWins'];
            $landingData['ARDLosses'] = $row['ARDTotal'] - $row['ARDWins'];

            $landingData['AllPercentage'] = round((($row['AllWins'] / $row['AllTotal']) * 100), 2);
            $landingData['APPercentage'] = round((($row['APWins'] / $row['APTotal']) * 100), 2);
            $landingData['CMPercentage'] = round((($row['CMWins'] / $row['CMTotal']) * 100), 2);
            $landingData['RDPercentage'] = round((($row['RDWins'] / $row['RDTotal']) * 100), 2);
            $landingData['SDPercentage'] = round((($row['SDWins'] / $row['SDTotal']) * 100), 2);
            $landingData['ARPercentage'] = round((($row['ARWins'] / $row['ARTotal']) * 100), 2);
            $landingData['LPPercentage'] = round((($row['LPWins'] / $row['LPTotal']) * 100), 2);
            $landingData['CDPercentage'] = round((($row['CDWins'] / $row['CDTotal']) * 100), 2);
            $landingData['ADPercentage'] = round((($row['ADWins'] / $row['ADTotal']) * 100), 2);
            $landingData['ARDPercentage'] = round((($row['ARDWins'] / $row['ARDTotal']) * 100), 2);

            $landingData['RadiantTotal'] = $row['RadiantTotal'];
            $landingData['DireTotal'] = $row['DireTotal'];
            $landingData['RadiantWins'] = $row['RadiantWins'];
            $landingData['DireWins'] = $row['DireWins'];
            $landingData['RadiantLosses'] = $row['RadiantTotal'] - $row['RadiantWins'];
            $landingData['DireLosses'] = $row['DireTotal'] - $row['DireWins'];
        }

        return $landingData;
    }
}

$clsDotaAPIHandler = new dotaAPI();