<?php 

    require_once('../config/conexion.php');

    $db = new conexion();

    $categoria = (isset($_GET['categoriaId']) && $_GET['categoriaId'] != 0) ? ' AND p.id_categoria =' . (int)$_GET['categoriaId'] : '';

    $query = "SELECT  
                    p.id_producto   AS producto_id,
                    p.nombre_producto,
                    p.descripcion_corta_producto,
                    p.id_categoria,
                    p.img_producto,
                    p.destacados_producto,
                    p.estado_producto,

                    dpd.id_detalle_producto,
                    dpd.componentes_detalle_producto,
                    dpd.uso_detalle_producto,
                    dpd.certificaciones_detalle_producto,
                    dpd.recomendaciones_detalle_producto,
                    dpd.descripcion_completa_detalle_producto,
                    dpd.estado_detalle_producto,

                    ppd.id_presentacion_producto,
                    ppd.tamanio_presentacion_prodcuto,
                    ppd.precio_venta_presentacion_producto,
                    ppd.estado_presentacion_producto 
                FROM productos_dash p
                LEFT JOIN detalle_producto_dash dpd  ON p.id_producto = dpd.id_producto 
                LEFT JOIN presentacion_prodcuto_dash ppd  ON p.id_producto = ppd.id_producto
                WHERE p.estado_producto = 1" . $categoria;
    
    $productosCatalogo = $db->select($query);

    echo json_encode($productosCatalogo);