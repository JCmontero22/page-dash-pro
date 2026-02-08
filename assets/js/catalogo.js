
const numeroWhatsApp = "573114915408";
const categoriaId = 0;
const productosAgrupados = [];
const listaDeProductos = $("#product-list");
var carritoDeCompras = [];

const detailModal = new bootstrap.Modal(
    document.getElementById("productDetailModal"),
);

const notificacionToastElemento =document.getElementById("liveToast");
const toast = new bootstrap.Toast(notificacionToastElemento);



function init() {

    AOS.init({ duration: 800, once: true });

    cargarCategorias();
    listadoProductos(categoriaId);

    $(document).on("change", ".presentation-select", function () {
        actualizarPresentacion(this);
    });

    $(document).on("change", "#detailModalPresentation", function () {
        actualizarPresentacionModal(this);
    });
    
    $(document).on("click", ".add-to-cart-btn", function () {
        const card = $(this).closest('.card-body');
        const productoId = $(this).data("id");
        const nombre = $(this).data("nombre");

        const select = card.find('.presentation-select');
        const presentacion = select.find(':selected').text();
        const precio = select.find(':selected').data('precio');
        const cantidad = card.find('.quantity-input').val();

        anadirAlCarrito(productoId, nombre, precio, cantidad, presentacion);
    });

    $(document).on("click", ".open-detail-modal", function () {
        const productoId = Number($(this).data("id"));

        const producto = productosAgrupados.find(
            (p) => Number(p.producto_id) === productoId
        );

        if (!producto) return;

        abrirModalProducto(producto);
    });
    $(document).on("input",".cart-quantity-input",actualizarCantidadesCarrito);

    $(document).on("click",".remove-from-cart-btn",eliminarProductoCarrito);

    $("#categoryFilter").on("change", function () {
        const categoriaSeleccionada = $(this).val();
        listadoProductos(categoriaSeleccionada);
    });

}


function cargarCategorias() {
    $.ajax({
        url: './ajax/consultaCategorias.php',
        method: 'GET',
        success: function (data) {
            data = JSON.parse(data);
            data.forEach(categoria => {
                $("#categoryFilter").append(`
                    <option value="${categoria.id_categoria}">${categoria.nombre_categoria}</option>
                `);
            });
        }
    });
}

function listadoProductos(categoriaId) {
    $.ajax({
        url: './ajax/consultaProductosCatalogo.php',
        method: 'GET',
        data: { categoriaId: categoriaId },
        success: function (data) {
            data = JSON.parse(data);
            data = agruparProductos(data);
            renderizarProductos(data);
        }
    });
}
                

function renderizarProductos(productosParaRenderizar) {
    listaDeProductos.empty();

    if (productosParaRenderizar.length === 0) {
        listaDeProductos.html(
            '<div class="col-12 text-center"><p class="lead">No se encontraron productos.</p></div>'
        );
        return;
    }

    productosParaRenderizar.forEach((producto) => {

        let presentationOptions = '';
        let precioInicial = 'Precio no disponible';

        if (producto.presentaciones.length > 0) {
            producto.presentaciones.forEach((p, index) => {
                presentationOptions += `
                    <option 
                        value="${p.id_presentacion_producto}" 
                        data-precio="${p.precio}">
                        ${p.tamanio}
                    </option>
                `;
                if (index === 0) {
                    precioInicial = '$' + Number(p.precio).toLocaleString('es-CO');
                }
            });
        } else {
            presentationOptions = `<option disabled>Sin presentaciones</option>`;
        }

        const productoHtml = `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card product-card h-100">
                <img src="${producto.img_producto}" class="card-img-top open-detail-modal" data-id="${producto.producto_id}" style="cursor: pointer;"/>
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre_producto}</h5>

                    <div class="my-3">
                        <select class="form-select form-select-sm presentation-select" data-producto="${producto.producto_id}">
                            ${presentationOptions}
                        </select>
                    </div>

                    <p class="fw-bold fs-4 product-price" data-producto="${producto.producto_id}">
                        ${precioInicial}
                    </p>

                    <div class="mt-auto d-flex justify-content-center align-items-center">
                        <input type="number" class="form-control quantity-input me-2" value="1" min="1" id="quantity-${producto.producto_id}" style="width: 80px;">
                        <button 
                            class="btn btn-sm btn-primary add-to-cart-btn"
                            data-id="${producto.producto_id}"
                            data-nombre="${producto.nombre_producto}"
                            data-precio="${producto.precio_venta_presentacion_producto}"
                            data-presentacion="${producto.tamanio_presentacion_prodcuto}">
                            Añadir
                        </button>

                    </div>
                </div>
            </div>
        </div>
        `;

        listaDeProductos.append(productoHtml);
    });
}


function agruparProductos(dataProductos) {

    productosAgrupados.length = 0;

    const productos = {};

    dataProductos.forEach(item => {
        const id = Number(item.producto_id);

        if (!productos[id]) {
            productos[id] = {
                producto_id: id,
                nombre_producto: item.nombre_producto,
                descripcion_corta_producto: item.descripcion_corta_producto,
                descripcion_completa_detalle_producto: item.descripcion_completa_detalle_producto,
                img_producto: item.img_producto,
                id_categoria: item.id_categoria,
                destacados_producto: item.destacados_producto,
                estado_producto: item.estado_producto,
                presentaciones: [],
                componentes_detalle_producto: item.componentes_detalle_producto,
                recomendaciones_detalle_producto: item.recomendaciones_detalle_producto,
                 uso_detalle_producto: item.uso_detalle_producto,
                 certificaciones_detalle_producto: item.certificaciones_detalle_producto
            };
        }

        // Si tiene presentación, la agregamos
        if (item.id_presentacion_producto) {
            productos[id].presentaciones.push({
                id_presentacion_producto: item.id_presentacion_producto,
                tamanio: item.tamanio_presentacion_prodcuto,
                precio: item.precio_venta_presentacion_producto
            });
        }
    });

    productosAgrupados.push(...Object.values(productos));
    return Object.values(productos);
}

function abrirModalProducto(producto) {
    
    $("#detailModalName").text(producto.nombre_producto);
    $("#detailModalImage").attr("src", producto.img_producto);
    $("#detailModalDescription").html(producto.descripcion_completa_detalle_producto ?? 'No disponible');

    $("#detailModalComponents").text(
        producto.componentes_detalle_producto ?? 'No disponible'
    );
    $("#detailModalUses").html(
        producto.uso_detalle_producto ?? 'No disponible'
    );
    /* $("#detailModalCerts").text(
        producto.certificaciones_detalle_producto ?? 'No disponible'
    ); */
    $("#detailModalRecommendations").html(
        producto.recomendaciones_detalle_producto ?? 'No disponible'
    );

    /* PRESENTACIONES */
    const presentationSelect = $("#detailModalPresentation");
    presentationSelect.empty();

    let precioInicial = 'Precio no disponible';

    if (producto.presentaciones.length > 0) {
        producto.presentaciones.forEach((p, index) => {
            presentationSelect.append(`
                <option 
                    value="${p.id_presentacion_producto}" 
                    data-precio="${p.precio}">
                    ${p.tamanio}
                </option>
            `);

            if (index === 0) {
                precioInicial = '$' + Number(p.precio).toLocaleString('es-CO');
            }
        });
    } else {
        presentationSelect.append(`<option disabled>Sin presentaciones</option>`);
    }

    $("#detailModalPrice").text(precioInicial);

    /* botón carrito del modal */
    $(".add-to-cart-from-modal")
        .data("id", producto.producto_id)
        .data("nombre", producto.nombre_producto);

    detailModal.show();
}


function actualizarPresentacion(select) {
    const precio = $(select).find(":selected").data("precio");
    const productoId = $(select).data("producto");

    if (!precio) return;

    $(`.product-price[data-producto="${productoId}"]`)
        .text('$' + Number(precio).toLocaleString('es-CO'));
}

function actualizarPresentacionModal(select) {
    const precio = $(select).find(':selected').data('precio');

    if (!precio) return;

    $("#detailModalPrice")
        .text('$' + Number(precio).toLocaleString('es-CO'));
}

function anadirAlCarrito(productoId, nombre, precio, cantidad, presentacion) {

    const uniqueId = `${productoId}_${presentacion}`;

    const existente = carritoDeCompras.find(
        item => item.uniqueId === uniqueId
    );

    if (existente) {
        existente.quantity += parseInt(cantidad);
    } else {
        carritoDeCompras.push({
            uniqueId,
            id: productoId,
            name: nombre,
            size: presentacion,
            price: precio,
            quantity: parseInt(cantidad),
        });
    }

    $("#toast-body-message").text(
        `'${nombre} (${presentacion})' x${cantidad} añadido.`
    );

    toast.show();
    actualizarInterfazCarrito();
}


function agregarDesdeModalDescripcion() {
    const boton = $(".add-to-cart-from-modal");

    const productoId = boton.data("id");
    const nombre = boton.data("nombre");
    const $select = $("#detailModalPresentation");
    const presentacionId = $select.val();
    const presentacionTexto = $select.find(':selected').text();

    const precio = $select.find(":selected").data("precio");

    const cantidad = parseInt($("#detailModalQuantity").val(), 10);
    if (!presentacionTexto || !precio || isNaN(cantidad) || cantidad < 1) return;

    anadirAlCarrito(productoId,nombre,precio,cantidad,presentacionTexto);
        
    $("#detailModalQuantity").val(1);
    detailModal.hide();
}

function actualizarInterfazCarrito() {
    const insigniaCarrito = $(".cart-badge");
    const contenedorItemsCarrito = $("#cart-items-container");
    let totalItems = 0;
    let totalGeneral = 0;

    if (carritoDeCompras.length === 0) {
        insigniaCarrito.addClass("d-none");
        contenedorItemsCarrito.html(
            "<p>Aún no has añadido productos a tu pedido.</p>"
        );
        $("#send-order-btn").prop("disabled", true);
        return;
    }

    contenedorItemsCarrito.html("");

    carritoDeCompras.forEach((item) => {
        totalItems += item.quantity;
        totalGeneral += item.price * item.quantity;

        const itemHtml = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <span class="fw-bold">${item.name}</span>
                    <small class="text-muted">  ${item.size}</small>
                    <small class="text-muted"> ($${item.price.toLocaleString('es-CO')})</small>
                </div>

                <div class="d-flex align-items-center">
                    <input 
                        type="number" 
                        class="form-control form-control-sm cart-quantity-input me-2" 
                        value="${item.quantity}" 
                        min="1" 
                        data-unique-id="${item.uniqueId}" 
                        style="width: 60px;"
                    >
                    <button 
                        class="btn btn-sm btn-outline-danger remove-from-cart-btn" 
                        data-unique-id="${item.uniqueId}"
                    >&times;</button>
                </div>
            </div>
        `;

        contenedorItemsCarrito.append(itemHtml);
    });

    // 👉 TOTAL DEL CARRITO
    contenedorItemsCarrito.append(`
        <hr>
        <div class="d-flex justify-content-between align-items-center fw-bold fs-5">
            <span>Total</span>
            <span>$${totalGeneral.toLocaleString('es-CO')}</span>
        </div>
    `);

    insigniaCarrito.text(totalItems).removeClass("d-none");
    $("#send-order-btn").prop("disabled", false);
}

function actualizarCantidadesCarrito() {
        const uniqueId = $(this).data("unique-id");
                const nuevaCantidad = parseInt($(this).val());
                const itemEnCarrito = carritoDeCompras.find(
                    (item) => item.uniqueId === uniqueId,
                );
                if (itemEnCarrito && nuevaCantidad > 0) {
                    itemEnCarrito.quantity = nuevaCantidad;
                } else {
                    carritoDeCompras = carritoDeCompras.filter(
                        (item) => item.uniqueId !== uniqueId,
                    );
                }
                actualizarInterfazCarrito();
}
               
function eliminarProductoCarrito() {
    const uniqueId = $(this).data("unique-id");
    carritoDeCompras = carritoDeCompras.filter(
        (item) => item.uniqueId !== uniqueId,
    );
    actualizarInterfazCarrito();
}

function enviarPedido() {
    if (carritoDeCompras.length === 0) return;
    let mensaje =
        "¡Hola! Quisiera hacer el siguiente pedido:\n\n";
    carritoDeCompras.forEach((item) => {
        mensaje += `- ${item.name} (${item.size}) - Cantidad: ${item.quantity}\n`;
    });
    mensaje += `\nTotal del pedido: $${carritoDeCompras.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('es-CO')}\n`;
    mensaje += "\n¡Gracias!";

    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, "_blank");
}

                

                
                
            


init();