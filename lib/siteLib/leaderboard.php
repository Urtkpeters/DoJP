<div id="leaderboard" class="leaderboard">
    <div class="leaderboardTitle">Leaderboard</div>
    <table class="leaderboardTable">
        <tbody>
            <tr class="headerRow">
                <td class="rankColumn">Rank</td>
                <td class="levelColumn">Level</td>
                <td class="userColumn">User</td>
                <td class="scoreColumn">Score</td>
            </tr>
            <?php
                require 'databaseHandler.php';

                $qryLeaderboard =
                '
                    select *,
                      @rank:=@rank+1 as rank
                    from
                    (
                      select usr.Username,
                        lb.Score,
                        lh.levelNumber
                      from leaderboard lb
                        join Users usr on usr.UserId = lb.UserId
                        join levelHeader lh on lh.LevelHeaderId = lb.LevelHeaderId
                      order by Score desc, levelNumber desc
                      limit 25
                    ) as sub;
                ';

                $intRank = 1;

                foreach($db->query($qryLeaderboard) as $row)
                {
                    echo
                    '
                        <tr class="leaderRow">
                            <td>' . $intRank . '</td>
                            <td>' . $row['levelNumber'] . '</td>
                            <td>' . $row['Username'] . '</td>
                            <td>' . $row['Score'] . '</td>
                        </tr>
                    ';

                    $intRank += 1;
                }
            ?>
        </tbody>
    </table>
</div>
