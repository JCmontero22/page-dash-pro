<?php 

    require_once('../config/conexion.php');
    $db = new conexion();

    $query = "SELECT * FROM categorias_dash WHERE estado_categoria = 1";

    $categorias = $db->select($query);

    echo json_encode($categorias);