<?php 

    require_once('../config/conexion.php');

    $db = new conexion();

    $query = "SELECT * FROM productos_dash WHERE destacados_producto = 1";
    
    $productosDestacados = $db->select($query);

    echo json_encode($productosDestacados);