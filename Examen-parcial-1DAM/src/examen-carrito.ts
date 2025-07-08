
//Declaracion del modulo readline que se utiliza para poder ingresar texto desde la consola.
const readline = require(`readline`);

//Declaracion de la variable readline.
const variableReadline = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Declaracion de la interfaz para los productos disponibles
interface interfazProductos{
    id: number,
    nombre: string,
    precio: number,
    stock: number,
    categoria: string
};

//Declaracion de la interfaz para el carrito.
interface interfazCarrito {
    productoId: number,
    nombre: string,
    precio: number,
    cantidad: number,
    subtotal: number
};

//Declaracion de la variable productosDisponibles.
const productosDisponibles: interfazProductos[] = [
    {
        id: 1,
        nombre: "Notebook Lenovo",
        precio: 450000,
        stock: 5,
        categoria: "Tecnologia"
    },
    {
        id: 2,
        nombre: "Mouse Inalambrico",
        precio: 15000,
        stock: 20,
        categoria: "Tecnologia"
    },
    {
        id: 3,
        nombre: "Zapatilla Nike",
        precio: 80000,
        stock: 10,
        categoria: "Deportes"
    },
    {
        id: 4,
        nombre: "Remera Algodon",
        precio: 12000,
        stock: 0,
        categoria: "Ropa"
    }
];

//Declaracion de la variable carrito(En este momento vacia).
let carrito: interfazCarrito[] = [];

//Declaracion de la funcion para mostrar los productos disponibles.
function mostrarProductosDisponibles(): void{

    //Codigo para mostrar los productos de la variable productosDisponibles.
    console.log(`Productos disponibles:`);

    //Foreach para recorrer productosDisponibles.
    productosDisponibles.forEach((productosDisponibles, i) => {

        //Validacion para solo mostrar los productos con stock mayor a 0.
        if(productosDisponibles.stock >0){
            console.log(`${productosDisponibles.id}. ${productosDisponibles.nombre}-$${productosDisponibles.precio}(Stock:${productosDisponibles.stock})`);
        }
    });
}

//Declaracion de la funcion para agregar productos al carrito.
function agregarProductos(): void{

    //Declaracion de variables necesarias para la validacion.
    let validacionAgregarProducto: number = 0;
    let idProductoSolicitado: number;
    let nombreProducto: string;
    let cantidadProducto: number;
    let cantidadProductoSolicitado: number;
    let agregarProductoCarrito: interfazCarrito[];

    //Llamado de la funcion para mostrar los productos disponibles.
    mostrarProductosDisponibles();

    //Question para que el usuario elija el numero del producto que desee agregar al carrito.
    variableReadline.question(`Elija el numero del producto que desee agregar al carrito: `, (producto:number)=>{

        //Question para que el usuario elija la cantidad del producto que desea agregar al carrito.
        variableReadline.question(`Elija la cantidad de productos Numero ${producto} que desee comprar: `, (cantidad:number)=>{

            //Declaracion del paso a number del producto solicitado (Casi ni la use).
            idProductoSolicitado = Number(producto);

            //Foreach para recorrer productosDisponibles.
            productosDisponibles.forEach((productosDisponibles, i)=>{
                
                //Validacion para cuando el producto existe o no en productosDisponibles.
                if(productosDisponibles.id === Number(producto)){

                    //Cambio de valor de la variable para una validacion mas adelante.
                    validacionAgregarProducto = 1;

                    //Guardado de algunos datos del producto solicitado.
                    nombreProducto = productosDisponibles.nombre;
                    cantidadProducto = productosDisponibles.stock;
                    cantidadProductoSolicitado = cantidad;

                    //Validacion para cuando la cantidad ingresada es menor o igual a 0.
                    if(Number(cantidad) <= 0){

                        //Cambio de valor de la variable para una validacion mas adelante.                        
                        validacionAgregarProducto = 2;
                    }

                    //Validacion para cuando el stock del producto es menor o igual a 0.
                    if(productosDisponibles.stock <= 0){
                        validacionAgregarProducto = 3;
                    }

                    //Validacion para cuando el stock es mayor que la cantidad solicitada y la cantidad solicitada es mayor que 0.
                    if(productosDisponibles.stock >= Number(cantidad) && Number(cantidad) > 0){

                        //Cambio de valor de la variable para una validacion mas adelante.
                        validacionAgregarProducto = 4;
                        
                        //Esta linea guarda en una variable si en el carrito hay un producto con la ID del producto solicitado.
                        const itemCarrito = carrito.find(c=> c.productoId === Number(producto));

                        //Validacion de si en el carrito hay un producto con la ID del producto solicitado.
                        if(itemCarrito){

                            //Modificacion de los datos del producto existentes en el carrito.
                            itemCarrito.cantidad += Number(cantidad);
                            itemCarrito.subtotal = productosDisponibles.precio * itemCarrito.cantidad;

                            //Modificacion del stock del producto.
                            productosDisponibles.stock -= Number(cantidad);
    
                            //Codigo para cuando se pudo agregar (en este caso modificar) el producto en el carrito.
                            console.log(`\nPRODUCTO AGREGADO AL CARRITO`);
                            console.log(`${productosDisponibles.nombre} x${cantidad} agregado al carrito.\n`);

                            //Llamado de la funcion para procesar carrito.
                            procesarCarrito();
                        }else{

                            //asignacion de los datos del producto solicitados a una variable flotante (Para luego agregar los datos en la original).
                            agregarProductoCarrito = [
                                {
                                    productoId: productosDisponibles.id,
                                    nombre: productosDisponibles.nombre,
                                    precio: productosDisponibles.precio,
                                    cantidad: Number(cantidad),
                                    subtotal: productosDisponibles.precio * Number(cantidad)
                                }
                            ];

                            //Modificacion del stock del producto.
                            productosDisponibles.stock -= Number(cantidad);
    
                            //Push de la variable flotante a la variable carrito.
                            carrito.push(agregarProductoCarrito[0]);

                            //Codigo para cuando se pudo agregar el producto en el carrito.
                            console.log(`\nPRODUCTO AGREGADO AL CARRITO`);
                            console.log(`${productosDisponibles.nombre} x${cantidad} agregado al carrito.\n`);

                            //Llamado de la funcion para procesar carrito.
                            procesarCarrito();
                        }
                    }
                }
            });

            //Todas las validaciones de error al intentar agregar un producto
            if(validacionAgregarProducto === 1){

                //Codigo para cuando se le solicita mas stock que el disponible.
                console.log(`\nERROR DE STOCK`);
                console.log(`No hay suficiente stock. Disponible: ${cantidadProducto}. Solicitado: ${cantidadProductoSolicitado}.\n`);

                //Llamado de la funcion para procesar carrito.
                procesarCarrito();

            }else if(validacionAgregarProducto === 2){

                //Codigo para cuando se le solicita la cantidad 0 o menos.
                console.log(`\nERROR DE STOCK`);
                console.log(`Se solicito menos de lo esperado. Disponible: ${cantidadProducto}. Solicitado: ${cantidadProductoSolicitado}.\n`);

                //Llamado de la funcion para procesar carrito.
                procesarCarrito();
            }else if(validacionAgregarProducto === 3){

                //Codigo para cuando no hay stock del producto.
                console.log(`\nPRODUCTO SIN STOCK`);
                console.log(`El producto no tiene stock disponible.\n`);

                //Llamado de la funcion para procesar carrito.
                procesarCarrito();
            }else if(validacionAgregarProducto === 0){

                //Codigo para cuando no se enceuntra la ID solicitada dentro de productosDisponibles.
                console.log(`\nPRODUCTO NO ENCONTRADO`);
                console.log(`El producto con la ID ${idProductoSolicitado} no existe dentro del catalogo.\n`);

                //Llamado de la funcion para procesar carrito.
                procesarCarrito();
            }
        });
    }); 
}

//Declaracion de la funcion para modificar carrito.
function modificarProductos(): void{

    //Declaracion de una variable necesaria para la validacion.
    let validacionModificarProducto:number = 0;

    //Llamado de la funcion para ver carrito para que el usuario vea las modificaciones hechas en su carrito.
    verCarrito();

    //Validacion de si el carrito esta vacio o no.
    if(carrito.length > 0){

        //Question para que el usuario elija el producto a modifcar la cantidad
        variableReadline.question(`Elija la ID del producto que quiera modificar: `, (producto:number)=>{

            //Question para que el usuario elija la cantidad que va a agregar o quitar del producto que desee.
            variableReadline.question(`Elija la cantidad que quiera agregar o eliminar a este producto: `, (cantidad:number)=>{

                //Foreach para recorrer carrito.
                carrito.forEach((carrito, i)=>{

                    //Foreach para recorrer productosDisponibles.
                    productosDisponibles.forEach((productosDisponibles, i)=>{

                        //Validacion para saber si existe un producto con la id ingresada por el usuario, tanto en carrito como en productosDisponibles.
                        if(carrito.productoId === Number(producto) && productosDisponibles.id === Number(producto)){

                            //La variable cambia de valor para posteriormente hacer la validacion.
                            validacionModificarProducto = 1;

                            //Validacion de que el numero de cantidad ingresado no sea mayor que el disponible en el stock.
                            if(productosDisponibles.stock >= Number(cantidad)){

                                //Codigo de modificacion de los valores del producto.
                                carrito.cantidad += Number(cantidad);
                                productosDisponibles.stock -= Number(cantidad);
                                carrito.subtotal = carrito.precio * carrito.cantidad;

                                //Codigo para cuando el producto es modificado correctamente.
                                console.log(`PRODUCTO MODIFICADO CORRECTAMENTE`);
                                console.log(`tiene ${Number(cantidad)} del producto con la ID ${Number(producto)}\n`);

                            }else{

                                //Codigo para cuando el stock es menor que la cantidad solicitada por el usuario.
                                console.log(`\nERROR DE STOCK`);
                                console.log(`No hay suficiente stock. Disponible: ${productosDisponibles.stock}. Solicitado: ${cantidad}.\n`);
                            }
                        }
                    });
                });

                //Validacion para cuando el producto no es encontrado dentro del carrito.
                if(validacionModificarProducto === 0){
                    console.log(``);
                    console.log(`PRODUCTO NO ENCONTRADO`);
                    console.log(`El producto con la ID ${producto} no existe dentro del carrito.\n`);
                }
                //Llamado de la funcion para ver carrito.
                verCarrito();

                //Question para que pueda ver el carrito hasta que presione la tecla enter.
                variableReadline.question(`Presione la tecla Enter para salir del carrito de compras.`, (salir:boolean)=>{

                    //Mensaje vacio para dejar un espacio.
                    console.log(``);
                    //Llamado de la funcion para procesar carrito.
                    procesarCarrito();
                });
            });
        });
    }else{

        //Codigo para cuando el carrito esta vacio.
        console.log(`\nNo podes modificar tu carrito porque esta vacio.\n`);

        //Llamado de la funcion para procesar carrito.
        procesarCarrito();
    }
}

//Declaracion de la funcion para ver el carrito.
function verCarrito(): void{
    console.log(`\nTu carrito de compras:\n`);

    //Esta linea borra los elementos del carrito que tengan la cantidad 0 o menor, guardandola en la misma variable.
    carrito = carrito.filter(productoCantidad0 => productoCantidad0.cantidad > 0);
    
    //Valida si el carrito esta vacio (Esta vez hice la validacion al reves).
    if(carrito.length === 0){

        //Codigo para cuando el carrito esta vacio.
        console.log(`Tu carrito de compras esta vacio.\n`);
    }else{

        //Foreach para mostrar el carrito cuando no esta vacio.
        carrito.forEach((carritoForeach, i) =>{
            console.log(`Producto N${i +1}:`);
            console.log(`ID del producto: ${carritoForeach.productoId}.`);
            console.log(`Nombre del producto: ${carritoForeach.nombre}.`);
            console.log(`Precio del producto: ${carritoForeach.precio}`);
            console.log(`Cantidad del producto: ${carritoForeach.cantidad}`);
            console.log(`Subtotal del producto: ${carritoForeach.subtotal}\n`);
        });
    }
}

//Declaracion de la funcion descuentos
function descuentos(subtotalFinalFuncion:number):number{

    //Declaracion de variable necesaria para la validacion.
    let validacionDescuento: number = 0;

    //Foreach para recorrer la cantidad de los productos del carrito.
    carrito.forEach((carritoForeach, i)=>{

        //Validacion de los diferentes descuentos.
        if(carritoForeach.cantidad >= 3){
            validacionDescuento = 1;
        }else if(subtotalFinalFuncion > 500000 && validacionDescuento != 1){
            validacionDescuento = 2;
        }else if(subtotalFinalFuncion > 100000 && subtotalFinalFuncion < 500000 && validacionDescuento !=1){
            validacionDescuento = 3;
        }
    });

    //Devolucion de los diferentes descuentos (No funcionaba bien dentro del foreach, por eso lo hice fuera).
    if(validacionDescuento === 1){
        return 10;
    }else if(validacionDescuento === 2){
        return 8;
    }else if(validacionDescuento === 3){
        return 5;
    }
    return 0;
}

//Declaracion de la funcion para comprar el carrito.
function comprarCarrito(): void{

    //Definicion de variables necesarias en esta funcion.
    let porcentajeDescuento: number = 0;
    let descuento:number = 0;
    let iva:number = 0;
    let subtotalFinal:number = 0;
    let subtotalFinalDescuento:number = 0;
    let total: number = 0;

    //Validacion para que si el carrito este vacio, no se pueda comprar.
    if(carrito.length > 0){

        //Codigo para cuando se compra el carrito.
        console.log(`\nCARRITO ACTUAL`);

        //Foreach para recorrer carrito y mostrar los productos.
        carrito.forEach((carritoForeach, i)=>{
            console.log(`- ${carritoForeach.nombre} x${carritoForeach.cantidad} = $${carritoForeach.subtotal}`);
            subtotalFinal += carritoForeach.subtotal;
        });
        //Llamado y devolucion de la funcion descuentos.
        porcentajeDescuento = descuentos(subtotalFinal);
        console.log(`- Subtotal: $${subtotalFinal}`);

        //Validacion para el descuento requerido.
        if(porcentajeDescuento === 10){
            descuento = subtotalFinal * 0.10;
            subtotalFinalDescuento = subtotalFinal - descuento;
            console.log(`- Descuento (10%): -$${descuento}`);
        }else if(porcentajeDescuento === 8){
            descuento = subtotalFinal * 0.08;
            subtotalFinalDescuento = subtotalFinal - descuento;
            console.log(`- Descuento (8%): -$${descuento}`);
        }else if(porcentajeDescuento === 5){
            descuento = subtotalFinal * 0.05;
            subtotalFinalDescuento = subtotalFinal - descuento;
            console.log(`- Descuento (5%): -$${descuento}`);
        }else if(porcentajeDescuento === 0){
            subtotalFinalDescuento = subtotalFinal;
        }
        iva = subtotalFinalDescuento * 0.21;
        total = subtotalFinalDescuento + iva;
        console.log(`- IVA (21%): $${iva}`);
        console.log(`- TOTAL: $${total}`);
        variableReadline.close();
    }else{

        //Codigo para cuando el carrito esta vacio.
        console.log(`No podes comprar tu carrito de compras porque esta vacio.\n`);

        //Llamado de la funcion para procesar carrito.
        procesarCarrito();
    }
    
}

//Declaracion de la funcion para procesar carrito.
function procesarCarrito(): void{

    //Llamado a la funcion para mostrar los productos disponibles.
    mostrarProductosDisponibles();

    //Muestra las opciones del menu.
    console.log(`\nOpciones:`)
    console.log(`1. Agregar productos al carrito de compras.`);
    console.log(`2. Modificar productos del carrito de compras.`);
    console.log(`3. Ver carrito de compras.`);
    console.log(`4. Comprar carrito de compras.`);
    console.log(`0. salir del programa.\n`);

    //Crea una question para que el usuario pueda ingresar la opcion que desee.
    variableReadline.question(`Elija una opcion: `, (opcion:string) =>{

        //switch para el menu de opciones.
        switch(Number(opcion)){
            case 1:

                //Validacion para cuando se haya ingresado 1 en el menu.
                if(Number(opcion) === 1 && variableReadline){

                    //Llamado a la funcion para agregar productos.
                    agregarProductos();
                }
                break;
            case 2:

                //Validacion para cuando se haya ingresado 2 en el menu.
                if(Number(opcion) === 2 && variableReadline){

                    //Llamado a la funcion para modificar productos.
                    modificarProductos();
                }
                break;
            case 3:

                //Validacion para cuando se haya ingresado 3 en el menu.
                if(Number(opcion) === 3 && variableReadline){

                    //Llamado a la funcion para ver el carrito.
                    verCarrito();
    
                    //Question para que pueda ver el carrito hasta que presione la tecla enter.
                    variableReadline.question(`Presione la tecla Enter para salir del carrito de compras.`, (salir:boolean)=>{
                        
                        //Mensaje vacio para dejar un espacio.
                        console.log(``);
    
                        //Llammado a la funcion para procesar carrito.
                        procesarCarrito();
                    });
                } 
                break;
            case 4:

                //Validacion para cuando se haya ingresado 4 en el menu.
                if(Number(opcion) === 4 && variableReadline){

                    //Llammado a la funcion para comprar carrito.
                    comprarCarrito();
                }
            case 0:

                //Validacion para cuando se haya ingresado 0 en el menu (Me daba error si no lo ponia).
                if(Number(opcion) === 0 && variableReadline){

                    //Cerrado de la variableReadline y cierre del programa.
                    variableReadline.close();
                    return;
                }
                break;
            default:

                //opcion cuando se ingresa una opcion incorrecta.
                console.log(`Opcion incorrecta\n`);

                //Llamado a la funcion para procesar carrito.
                procesarCarrito();
                break;
        }
            
    });
}

//Inicio del programa.
console.log(`=`.repeat(3), `SIMULADOR DE CARRITO DE COMPRAS`, `=`.repeat(3));

//Llammado a la funcion para procesar carrito.
procesarCarrito();