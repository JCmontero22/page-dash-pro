function init(){
     AOS.init( {
        duration: 1000,
        once: true,
    } );
    scroll();
    desplazamientoEnlaces();
    conssultaProductosDestacados();
}

function scroll() {
     // Efecto de sombra en la barra de navegación al hacer scroll
    $( window ).scroll( function () {
        if ( $( this ).scrollTop() > 50 ) {
            $( ".navbar" ).addClass( "shadow-sm" );
        } else {
            $( ".navbar" ).removeClass( "shadow-sm" );
        }
    } );
}

function desplazamientoEnlaces() {
    // Desplazamiento suave para los enlaces de navegación
    $( ".nav-link" ).on( "click", function ( event ) {
        if ( this.hash !== "" ) {
            // Prevenir el comportamiento de anclaje por defecto
            event.preventDefault();
            var hash = this.hash;
            // Animar el desplazamiento
            $( "html, body" ).animate(
                {
                    scrollTop: $( hash ).offset().top - 70, // Ajustar por la barra de navegación fija
                },
                800,
            );
        }
    } );
}

function conssultaProductosDestacados() {
    $.ajax( {
        url: './ajax/consultaProductosDestacados.php',
        method: 'GET',
        success: function ( data ) {
            data = JSON.parse( data );
            console.log(data);
            
            data.forEach(element => {
                $("#productos-destacados").append(`
                    <div class="col-lg-4 col-md-6" data-aos="fade-up">
                        <div class="card product-card h-100">
                            <img src="${element.img_producto}" class="card-img-center"
                                alt="Producto Multi-usos" />
                            <div class="card-body">
                                <h5 class="card-title">
                                    ${element.nombre_producto}
                                </h5>
                                <p class="card-text">
                                    ${element.descripcion_corta_producto}
                                </p>
                                
                            </div>
                        </div>
                    </div>`);
            });

                                 {/* <div class="product-rating mb-2">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                                class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                                </div><p class="fw-bold fs-5">$12.500</p>  */}
            
        }
    });
                
}


init();