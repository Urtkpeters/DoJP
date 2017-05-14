<?php
    abstract class databaseHandler
    {
        /** @var  PDO */
        var $db;

        function __construct()
        {
            // ASO Server Info = odinaryn_odonen - Oo!97324865
            $this->db = new PDO('mysql:host=localhost;dbname=odinaryn_DoJP;charset=utf8mb4', 'root', '');
        }
    }
?>