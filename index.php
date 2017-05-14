<?php
$requestTarget = '';
$eventTarget = '';

if(isset($_GET['requestTarget']))
{
    $pathComponents = explode('/', $_GET['requestTarget']);

    $requestTarget = $pathComponents[0];

    if(isset($pathComponents[1]))
    {
        $eventTarget = $pathComponents[1];
    }
}

if($requestTarget == 'event')
{
    require 'lib/siteLib/event/ajaxHandler.php';
}
else
{
    require 'lib/siteLib/page/layout.php';
}