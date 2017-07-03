<?php

require_once 'lib/siteLib/event/databaseHandler.php';

class buildHandler extends databaseHandler
{
    function getBuilds()
    {
        $aryBuilds = array();
        $aryLines = array();
        $qryGetBuildHeader =
        "
          select abh.ArcBuildHeaderId,
            abh.BuildTitle,
            abh.BuildType,
            abh.Description,
            cusr.Username as CreateUsername,
            date_format(abh.CreateDate, '%m/%d/%Y %H:%i') as CreateDate,
            ifNull(musr.Username, '-') as ModifiedUsername,
            ifNull(date_format(abh.ModifiedDate, '%m/%d/%Y %H:%i'), '-') as ModifiedDate
          from ArcBuildHeader abh
            join Users cusr on cusr.UserId = abh.CreateUserId
            left outer join Users musr on musr.UserId = abh.ModifiedUserId
        ";
        $qryGetBuildLines =
        "
            select ArcBuildHeaderId,
              Team,
              Hero,
              LanePosition,
              SortOrder
            from ArcBuildLine
        ";

        foreach($this->db->query($qryGetBuildLines) as $row)
        {
            $aryLines[$row['ArcBuildHeaderId']] = array();
            $aryLines[$row['ArcBuildHeaderId']]['ArcBuildHeaderId'] = $row['ArcBuildHeaderId'];
            $aryLines[$row['ArcBuildHeaderId']]['Team'] = $row['Team'];
            $aryLines[$row['ArcBuildHeaderId']]['Hero'] = $row['Hero'];
            $aryLines[$row['ArcBuildHeaderId']]['LanePosition'] = $row['LanePosition'];
            $aryLines[$row['ArcBuildHeaderId']]['SortOrder'] = $row['SortOrder'];
        }

        foreach($this->db->query($qryGetBuildHeader) as $row)
        {
            $aryBuilds[$row['ArcBuildHeaderId']] = array();
            $aryBuilds[$row['ArcBuildHeaderId']]['BuildTitle'] = $row['BuildTitle'];
            $aryBuilds[$row['ArcBuildHeaderId']]['BuildType'] = $row['BuildType'];
            $aryBuilds[$row['ArcBuildHeaderId']]['Description'] = $row['Description'];
            $aryBuilds[$row['ArcBuildHeaderId']]['CreateUsername'] = $row['CreateUsername'];
            $aryBuilds[$row['ArcBuildHeaderId']]['CreateDate'] = $row['CreateDate'];
            $aryBuilds[$row['ArcBuildHeaderId']]['ModifiedUsername'] = $row['ModifiedUsername'];
            $aryBuilds[$row['ArcBuildHeaderId']]['ModifiedDate'] = $row['ModifiedDate'];

            foreach($aryLines as $rowLine)
            {
                if($row['ArcBuildHeaderId'] == $rowLine['ArcBuildHeaderId'])
                {
                    $aryBuilds[$row['ArcBuildHeaderId']]['ArcBuildLines'] = $rowLine;
                }
            }
        }

        return $aryBuilds;
    }
}

$clsBuildHandler = new buildHandler();