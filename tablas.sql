CREATE TABLE dash_pro.productos_dash (
	id_producto INT auto_increment NOT NULL,
	nombre_producto varchar(256) NULL,
	descripcion_corta_producto varchar(256) NULL,
	categoria_producto CHAR(1) NULL,
	img_producto varchar(256) NULL,
	destacados_producto CHAR(1) DEFAULT '0' NULL,
	estado_producto CHAR(1) DEFAULT '1' NULL,
	CONSTRAINT productos_dash_pk PRIMARY KEY (producto_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;



CREATE TABLE dash_pro.detalle_producto_dash (
	id_detalle_producto INT auto_increment NOT NULL,
	id_producto INT NULL,
	componentes_detalle_producto varchar(256) NULL,
	uso_detalle_producto varchar(256) NULL,
	certificaciones_detalle_producto varchar(256) NULL,
	recomendaciones_detalle_producto varchar(256) NULL,
	descripcion_completa_detalle_producto varchar(256) NULL,
	estado_detalle_producto CHAR(1) DEFAULT '1' NULL,
	producto_id int(11) NULL,
	CONSTRAINT detalle_producto_pk PRIMARY KEY (id_detalle_producto),
	CONSTRAINT detalle_producto_productos_dash_FK FOREIGN KEY (id_producto) REFERENCES dash_pro.productos_dash(id_producto)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;



CREATE TABLE dash_pro.presentacion_prodcuto_dash (
	id_presentacion_producto INT auto_increment NOT NULL,
	id_producto INT NULL,
	tamanio_presentacion_prodcuto varchar(100) NULL,
	precio_venta_presentacion_producto INT NULL,
	estado_presentacion_producto CHAR(1) DEFAULT '1' NULL,
	CONSTRAINT presentacion_prodcuto_dash_pk PRIMARY KEY (id_presentacion_producto),
	CONSTRAINT presentacion_prodcuto_dash_productos_dash_FK FOREIGN KEY (id_producto) REFERENCES dash_pro.productos_dash(id_producto)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
















