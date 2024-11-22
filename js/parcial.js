'use strict';
/* GUTIERREZ, LUDMILA */

const productos = [
    {
        id: 1,
        nombre: 'Vinilo Flock',
        descripcion: 'Material de acabado aterciopelado con efecto tridimensional',
        detalle: 'Material de acabado aterciopelado, ideal para personalizar prendas con un aspecto suave y elegante. Con un efecto tridimensional y una textura similar al terciopelo, este vinilo es perfecto para crear diseños destacados en camisetas, sudaderas y otras prendas.',
        precio: 8000,
        imagen: 'flock3.jpg',
        categoria: 'Vinilo',
    },
    {
        id: 2,
        nombre: 'Vinilo Foil',
        descripcion: 'Material de capa metálica con acabado Brillante',
        detalle: 'Vinilo de capa metálica con acabado brillante. Se utiliza para dar un efecto espejo o metálico en diseños y personalización de prendas. Se puede aplicar con calor, utilizando una prensa térmica.',
        precio: 7000,
        imagen: 'foil2.jpg',
        categoria: 'Vinilo',
    },
    {
        id: 3,
        nombre: 'Vinilo Holográfico',
        descripcion: 'Material de acabado iridiscente',
        detalle: 'Vinilo de acabado iridiscente que cambia de color dependiendo del ángulo de la luz. Es ideal para crear efectos visuales llamativos en ropa, accesorios y otros productos.',
        precio: 12000,
        imagen: 'holo1.jpg',
        categoria: 'Vinilo',
    },
    {
        id: 4,
        nombre: 'Vinilo Fosforescente',
        descripcion: 'Material que brilla en la oscuridad',
        detalle: 'Este vinilo es capaz de brillar en la oscuridad después de haber estado expuesto a la luz. Es ideal para diseños de seguridad, moda nocturna o efectos especiales.',
        precio: 11700,
        imagen: 'fosfo.jpg',
        categoria: 'Vinilo',
    },
    {
        id: 5,
        nombre: 'Rollo DTF 60cm',
        descripcion: 'Descripción del producto',
        detalle: 'El rollo DTF es el material sobre el que se realiza la impresión DTF. Sirve para transferir el diseño a cualquier tipo de superficie mediante calor.',
        precio: 11200,
        imagen: 'rollodtf.jpg',
        categoria: 'Insumos DTF',
    },
    {
        id: 6,
        nombre: 'Tinta blanca DTF 100ml',
        descripcion: 'Descripción del producto',
        detalle: 'Tinta blanca AQX 100 ml para imprimir sobre el rollo DTF. De alta calidad, al ser la base de la impresión garantiza colores vivos y duraderos.',
        precio: 13000,
        imagen: 'tintadtf.jpg',
        categoria: 'Insumos DTF',
    },
    {
        id: 7,
        nombre: 'Poliuretano para DTF 1kg',
        descripcion: 'Descripción del producto',
        detalle: 'Poliuretano AQX x1kg, material de transferencia de DTF. Es flexible, duradero y adecuado para ser utilizado en prendas de algodón, poliéster y mezclas. Se adhiere a las telas de forma resistente y es de alta calidad.',
        precio: 48000,
        imagen: 'polvodtf.jpg',
        categoria: 'Insumos DTF',
    },
    {
        id: 8,
        nombre: 'Hilo poliéster 130gr',
        descripcion: 'Descripción del producto',
        detalle: 'El poliéster es conocido por su resistencia al desgaste, la humedad y la exposición a la luz, lo que lo convierte en una opción popular para bordados y costuras industriales.',
        precio: 2000,
        imagen: 'poliester.jpg',
        categoria: 'Hilos y tiras',
    },
    {
        id: 9,
        nombre: 'Hilo algodón',
        descripcion: 'Descripción del producto',
        detalle: 'El hilo de algodón es suave y natural, utilizado en bordados y costuras. Aunque no es tan resistente, es ideal para aplicaciones en las que se busca un acabado suave y cómodo al tacto.',
        precio: 1800,
        imagen: 'algodon.jpg',
        categoria: 'Hilos y tiras',
    },
];

function crearEtiqueta(etiqueta, atributos = {}, contenido = '') {
    const elemento = document.createElement(etiqueta);
    for (const atributo in atributos) {
        elemento.setAttribute(atributo, atributos[atributo])
    }
    if (contenido !== '') {
        elemento.textContent = contenido;
    }
    return elemento;
}

const $ulProd = crearEtiqueta('ul', { id: 'productos' });
const $contenedor = document.getElementById('contenedor');
$contenedor.prepend($ulProd);

const $verCarrito =  document.querySelector('#mini-carrito button');
$verCarrito.addEventListener('click', () => carrito.mostrarCarrito());

function agregarProductosHtml(producto, agregarBtn = true) {
    const $li = crearEtiqueta('li');
    const $img = crearEtiqueta('img', { src: `assets/img/${producto.imagen}`, alt: producto.descripcion });
    const $div = crearEtiqueta('div', { id: 'infoProducto' });
    const $h3 = crearEtiqueta('h3', {}, producto.nombre);
    const $descripcion = crearEtiqueta('p', {class: 'descripcion'}, producto.descripcion);
    const $detalle = crearEtiqueta('p', { class: 'ocultarDetalle' }, producto.detalle);
    const $precio = crearEtiqueta('p', {}, `$${producto.precio}`);
    const $categoria = crearEtiqueta('p', {}, `Categoria: ${producto.categoria}`);
    const $btnAgregar = crearEtiqueta('button', { class: 'btnAgregar', 'data-id': producto.id }, 'Agregar');

    $li.append($img, $div);
    $div.append($h3, $descripcion, $detalle, $precio, $categoria, $btnAgregar);
    $ulProd.append($li);


    if (agregarBtn) {
        const $btnDetalle = crearEtiqueta('button', { class: 'btnDetalle', 'data-id': producto.id }, 'Detalle');

        $div.append($btnDetalle);

        $btnDetalle.addEventListener('click', evento => {
           const  productoSeleccionado = productos.find(p => p.id === +(evento.currentTarget.dataset.id));;
            mostrarDetalle(productoSeleccionado);
        });
    }

    $btnAgregar.addEventListener('click', function (evento) {
        const productoSeleccionado = productos.find(p => p.id === +(evento.currentTarget.dataset.id));
        carrito.agregarCarrito(productoSeleccionado);
        carrito.calcularTotal();
        carrito.mostrarResumen();
    });

    return $li;
}

for (const producto of productos) {
    const $producto = agregarProductosHtml(producto);
    $ulProd.appendChild($producto);
}

function mostrarDetalle(producto) {
    let $contenedorModal = document.getElementById('modal');

    const $dialog = crearEtiqueta('dialog', { class: 'modal' });
    const $divInfoModal = crearEtiqueta('div', { class: 'detalle' });

    const $infoProducto = agregarProductosHtml(producto, false);
    $divInfoModal.append($infoProducto);

    $divInfoModal.querySelector('.ocultarDetalle').classList.remove('ocultarDetalle');
    $divInfoModal.querySelector('.descripcion').classList.add('ocultarDetalle');

    $dialog.appendChild($divInfoModal);
    $contenedorModal.appendChild($dialog);
    $dialog.showModal();

    const $btnCerrar = crearEtiqueta('button', { class: 'cerrarModal' }, 'Cerrar');
    $divInfoModal.append($btnCerrar);
    cerrarModal($dialog);
}

const carrito = {
    items: [],
    total: 0,
    cantidad: 0,
    calcularTotal() {
        this.total = 0;
        for (const item of this.items) {
           this.total += item.cantidad * item.precio;
        }
        return this.total;
    },
    calcularCantidad(){
        let cantProducto = 0;
        for (const item of this.items) {
            cantProducto += item.cantidad;
        }
        this.cantidad = cantProducto;
        return this.cantidad;
    },
    agregarCarrito(producto){
        const productoExistente = this.items.find(item => item.id === producto.id);
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            this.items.push({id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1});
        }
    },
    mostrarCarrito() {
        this.calcularCantidad();
        let $contenedorModal = document.getElementById('modal');
    
        const $dialogCarrito = crearEtiqueta('dialog', { class: 'modal' });
        const $divCarrito = crearEtiqueta('div', { class: 'carrito' });
        const $headerCarrito = crearEtiqueta('header');
        const $headerSpanProducto = crearEtiqueta('span', {id: 'spanProducto'});
        const $headerSpanTotal = crearEtiqueta('span', {id: 'spanTotal'}, `Total: $${carrito.total}`);
        const $ulCarrito = crearEtiqueta('ul', {class: 'ulCarrito'});

        for (const item of this.items) {
            const totalPrecio = item.cantidad * item.precio;
            const $liCarrito = crearEtiqueta('li', {class: 'liProd-Item'});
            const $spanNombre = crearEtiqueta('span', {class: 'nombreProd'}, `${item.nombre}`);
            const $spanCant = crearEtiqueta('span', {class: 'cantProd'}, ` - Cantidad: ${item.cantidad} `);
            const $spanTotal = crearEtiqueta('span', {class: 'totProd'}, ` - Subtotal: $${totalPrecio} `);
            const $aCarrito = crearEtiqueta('a', {href: '#', class: 'eliminarItem', 'data-id': item.id}, 'Eliminar');
            $ulCarrito.append($liCarrito);
            $liCarrito.append($spanNombre, $spanCant, $spanTotal, $aCarrito);

            $aCarrito.addEventListener('click', (evento) => {
                this.eliminarItem(evento);
            });
        }
        
        const $footerCarrito = crearEtiqueta('footer');
        const $btnCerrar = crearEtiqueta('button', {class: 'cerrarModal'}, 'Cerrar');
        const $btnVaciar = crearEtiqueta('button', {id: 'vaciarCarrito'}, 'Vaciar');

        $contenedorModal.append($dialogCarrito);
        $dialogCarrito.showModal();
        $dialogCarrito.append($divCarrito);
        $divCarrito.prepend($headerCarrito, $ulCarrito, $footerCarrito);
            if (carrito.items.length === 0) {
                $headerSpanProducto.textContent = 'El carrito está vacío';
                $headerCarrito.prepend($headerSpanProducto);
            } else{
                $headerSpanProducto.textContent = `Productos: ${carrito.cantidad} `;
                $headerCarrito.prepend($headerSpanProducto, $headerSpanTotal);
            }
        $footerCarrito.prepend($btnCerrar, $btnVaciar);

        $btnVaciar.addEventListener('click', this.vaciarCarrito);

        cerrarModal($dialogCarrito);
    },
    mostrarResumen(){
        const $cantMiniCarrito =  Array.from(document.querySelectorAll('#mini-carrito p span'));
        this.calcularCantidad();
        this.calcularTotal();
        $cantMiniCarrito[0].textContent = `${this.cantidad}`;
        $cantMiniCarrito[1].textContent = `${this.total}`;
    },
    eliminarItem(evento){
        const $itemId = +(evento.currentTarget.dataset.id);
        const i = this.items.findIndex(item => $itemId === item.id);

        const spanProducto = document.querySelector('#spanProducto');
        const spanTotal = document.querySelector('#spanTotal');
        const $liProd = evento.currentTarget.parentElement;

        if (i !== -1) {
            if (this.items[i].cantidad === 1) {
                this.items.splice(i, 1); 
                $liProd.remove();
                if (this.items.length === 0) {
                    spanProducto.textContent = 'El carrito está vacío';
                    spanTotal.remove();
                    this.mostrarResumen();
                }else {
                    this.calcularCantidad();
                    this.calcularTotal();
                    this.mostrarResumen();
                    spanProducto.textContent = `Productos: ${this.cantidad}`;
                    spanTotal.textContent = ` Total: $${this.total}`;
                }
            } else {
                this.items[i].cantidad -= 1;
                const $cantidad = $liProd.querySelector('.cantProd');
                const $total = $liProd.querySelector('.totProd');
    
                $cantidad.textContent = ` - Cantidad: ${this.items[i].cantidad}`;
                $total.textContent = ` - Subtotal: $${this.items[i].cantidad * this.items[i].precio} `;
    
                this.calcularCantidad();
                this.calcularTotal();
                this.mostrarResumen();
                spanProducto.textContent = ` Productos: ${this.cantidad}`;
                spanTotal.textContent = ` Total: $${this.total}`;
            }
        }
    },
    vaciarCarrito(){
        const $ulProd = document.querySelector('.ulCarrito');
        const spanProducto = document.querySelector('#spanProducto');
        const spanTotal = document.querySelector('#spanTotal');

        if (carrito.items.length === 0) {
            return;
        } else {
            carrito.items.length = 0;
            spanProducto.textContent = 'El carrito está vacío';
            spanTotal.remove();
            $ulProd.remove();
            carrito.mostrarResumen();
        }
    }
}

function cerrarModal($dialog){
    const $btnCerrar = document.querySelector('.cerrarModal');
    $btnCerrar.addEventListener('click', () => $dialog.remove());
    $dialog.addEventListener('close', (evento) => {
        evento.currentTarget.remove();
    })
}
