CREATE TABLE dash_pro.categorias_dash (
	id_categoria INT auto_increment NOT NULL,
	nombre_categoria varchar(100) NULL,
	estado_categoria CHAR(1) DEFAULT '1' NULL,
	CONSTRAINT categorias_pk PRIMARY KEY (id_categoria)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;



CREATE TABLE dash_pro.productos_dash (
	id_producto INT auto_increment NOT NULL,
	nombre_producto varchar(100) NULL,
	descripcion_corta_producto varchar(256) NULL,
	id_categoria INT NULL,
	img_producto varchar(256) NULL,
	destacados_producto CHAR(1) DEFAULT '0' NULL,
	estado_producto CHAR(1) DEFAULT '1' NULL,
	CONSTRAINT productos_dash_pk PRIMARY KEY (id_producto),
	CONSTRAINT productos_dash_categorias_FK FOREIGN KEY (id_categoria) REFERENCES dash_pro.categorias_dash(id_categoria)
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




-- ********************************************** INSERTS *******************************************************

INSERT INTO dash_pro.categorias (nombre_categoria,estado_categoria) VALUES
	 ('Linea Esponjas','1'),
	 ('Linea Liquidos DAHS PRO','1'),
	 ('Multiusos','1'),
	 ('Aromatizantes','1'),
	 ('Linea Escobas Traperos y Otros','1'),
	 ('Banda','1'),
	 ('Linea Guantes','1'),
	 ('Linea Papel Toallas','1');



-- PRINCIPALES PRODUCTOS

INSERT INTO dash_pro.productos_dash (nombre_producto,descripcion_corta_producto,id_categoria,img_producto,estado_producto,destacados_producto) VALUES(
	'Desengrasante Multiusos',
	'El limpiador desengrasante estáformulado para una limpieza profunda y eficiente de superficies con acumulaciónde grasa.',
	'3',
	'assets/img/productos/desengrasante.png',
	'1',
	'1'
),
(	
	'Detergente Liquido',
	'El detergente líquido para ropa es ideal para la limpieza eficaz y el cuidado de prendas y textiles.',
	'2',
	'assets/img/productos/detergenteLiquido.png',
	'1',
	'1'
),
(	
	'Lavaloza',
	'El lavaloza es un producto líquido de uso doméstico, formulado para limpiar eficazmente utensilios de cocina como platos, vasos, cubiertos, ollas y sartenes.',
	'3',
	'assets/img/productos/lavaloza.png',
	'1',
	'1'
);



INSERT INTO dash_pro.presentacion_prodcuto_dash (id_producto,tamanio_presentacion_prodcuto,precio_venta_presentacion_producto,estado_presentacion_producto) VALUES
	 (2,'2 Litro',20000,'1'),
	 (2,'3.8 Litros',27000,'1');






