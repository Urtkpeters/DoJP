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
                require 'lib/siteLib/event/gameHandler.php';

                $leaderboardResults = $clsGameHandler->getLeaderboardData();

                foreach($leaderboardResults as $row)
                {
                    echo
                        '
                        <tr class="leaderRow">
                            <td>' . $row['rank'] . '</td>
                            <td>' . $row['levelNumber'] . '</td>
                            <td>' . $row['Username'] . '</td>
                            <td>' . $row['Score'] . '</td>
                        </tr>
                    ';
                }
            ?>
        </tbody>
    </table>
</div>
