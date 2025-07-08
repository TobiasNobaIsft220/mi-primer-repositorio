Instrucciones del carrito de compras:

1. Abrir la consola con ctrl + ñ y escribir "npm init -y" para inicializar el proyecto con npm.

2. Instalar las dependencias escribiendo "npm i".

3. Compilar el codigo escribiendo "npx tsc".

4. Ejecutar el codigo escribiendo "node src/examen-carrito.js".

5. El programa dara la bienvenida, apareceran los productos disponibles con su stock y precio correspondiente y mas abajo, un menu de opciones con las sigueintes opciones.
    1. Agregar producto al carrito.
    2. Modificar producto del carrito.
    3. Ver carrito de compras.
    4. Comprar carrito de compras.
    0. Salir del programa.

    Agregar producto al carrito: Pide que elijas el producto y la cantidad y la agrega al carrito.

    Modificar producto del carrito: Pide que elijas el producto a modificar y la cantidad de productos a agregar o quitar. Para quitar productos se debe poner un numero negativo en el momento que te pide la cantidad de productos.

    Ver carrito de compras: Muestra toda la informacion de los productos que estan guardados en tu carrito.

    Comprar carrito de compras: Muestra la informacion del carrito de compras como el profesor indico en el documento adjunto al examen, mostrando: los productos con sus cantidades y precios, el subtotal, el descuento si es que lo requiere, el IVA, y el total.

    Salir del programa: Luego de seleccionar esta opcion, se sale del programa automaticamente.

Prompts utilizados en la IA ChatGPT:

1. buenas tardes chat gpt, me podes explicar como habilitar la ejecucion de scripts en windows por favor?

2. Muchas gracias chatgpt, ahora necesito que me digas como puedo ingresar datos a variables en typescript durante la ejecucion de mi programa, similar a el "cin" en c++

3. me podes explicar mas sobre como funciona el modulo readline de node.js?
como lo importo? como paso datos a una variable con el?

4. me podes explicar como puedo pasar el valor de una variable string a number en typescript por favor?

5. me podes explicar como puedo evaluar que a un array se le agrego una posicion mas?

6. gracias por todo chatgpt

7. buenas tardes chat gpt, me podes explicar como puedo hacer para modificar un atributo de un array en especifico y sumarlo a mi array? no debe ser solamente el ultimo

8. como elimino una posicion en especifica de un array, no necesariamente la ultima

9. como puedo validar si un array tiene el valor especifico que yo le pido en un condicional?

10. y en el caso de que si esté el valor que necesito, como puedo modificar esa posicion del array, en este caso utilizando el metodo some para un objeto

11. no puedo hacerlo con un foreach y evaluando si el valor de alguna posicion es el mismo que yo le ingreso?

12. Tengo esta funcion, la cual debe evaluar si el producto que se le pide al usuario existe o no, si la cantidad no se pasa del stock que hay y que evalua que si ya existe en el array carrito un objeto con el productoId igual al ingresado por el usuario, se modifique este mismo en vez de agregar uno nuevo con el push, el problema es que ahora sin importar que numeros de id o cantidad ponga, siempre me da el error de PRODUCTO NO ENCONTRADO, me podes explicar que esta mal por favor?

function agregarProductos(): void{
    let validacionAgregarProducto: number = 0;
    let idProductoSolicitado: number;
    let nombreProducto: string;
    let cantidadProducto: number;
    let cantidadProductoSolicitado: number;
    let agregarProductoCarrito: interfazCarrito[];

    mostrarProductosDisponibles();

    variableReadline.question(`Elija el numero del producto que desee agregar al carrito: `, (producto:number)=>{
        variableReadline.question(`Elija la cantidad de productos Numero ${producto} que desee comprar: `, (cantidad:number)=>{

            idProductoSolicitado = Number(producto);

            productosDisponibles.forEach((productosDisponibles, i)=>{
                carrito.forEach((carritoForeach, i)=>{

                    if(productosDisponibles.id === Number(producto)){
                        validacionAgregarProducto = 1;
    
                        nombreProducto = productosDisponibles.nombre;
                        cantidadProducto = productosDisponibles.stock;
                        cantidadProductoSolicitado = cantidad;
    
                        if(Number(cantidad) <= 0){
                            validacionAgregarProducto = 2;
                        }
    
                        if(productosDisponibles.stock >= Number(cantidad) && Number(cantidad) > 0){
    
                            validacionAgregarProducto = 3;
                            
                            if(carritoForeach.productoId == Number(producto)){

                                carrito = [
                                    {
                                        productoId: productosDisponibles.id,
                                        nombre: productosDisponibles.nombre,
                                        precio: productosDisponibles.precio,
                                        cantidad: Number(cantidad),
                                        subtotal: productosDisponibles.precio * Number(cantidad)
                                    }
                                ];
                                productosDisponibles.stock -= Number(cantidad);
        
                                console.log(``);
                                console.log(`PRODUCTO AGREGADO AL CARRITO`);
                                console.log(`${productosDisponibles.nombre} x${cantidad} agregado al carrito.\n`);
                                procesarCarrito();
                            }else{

                                agregarProductoCarrito = [
                                    {
                                        productoId: productosDisponibles.id,
                                        nombre: productosDisponibles.nombre,
                                        precio: productosDisponibles.precio,
                                        cantidad: Number(cantidad),
                                        subtotal: productosDisponibles.precio * Number(cantidad)
                                    }
                                ];
                                productosDisponibles.stock -= Number(cantidad);
        
                                carrito.push(agregarProductoCarrito[0]);
                                console.log(``);
                                console.log(`PRODUCTO AGREGADO AL CARRITO`);
                                console.log(`${productosDisponibles.nombre} x${cantidad} agregado al carrito.\n`);
                                procesarCarrito();
                            }
                        }
                    }
                });
                
                if(validacionAgregarProducto === 1){
                    console.log(``);
                    console.log(`ERROR DE STOCK`);
                    console.log(`No hay suficiente stock. Disponible: ${cantidadProducto}. Solicitado: ${cantidadProductoSolicitado}.\n`);
                    procesarCarrito();
                }else if(validacionAgregarProducto === 2){
                    console.log(``);
                    console.log(`ERROR DE STOCK`);
                    console.log(`Se solicito menos de lo esperado. Disponible: ${cantidadProducto}. Solicitado: ${cantidadProductoSolicitado}.\n`);
                    procesarCarrito();
                }else if(validacionAgregarProducto === 0){
                    console.log(``);
                    console.log(`PRODUCTO NO ENCONTRADO`);
                    console.log(`El producto con la ID ${idProductoSolicitado} no existe dentro del catalogo.\n`);
                    procesarCarrito();
                }
            });
                    

        });
    });
    
}

13. muchas gracias chat gpt, ahora necesito que utilizando itemCarrito y el metodo find, encontremos los porductos que tengan en la clave de cantidad, 0 o menos para borrarlos del array, como puedo hacer eso?

14. Tengo esta funcion, la cual escribe en consola mi carrito de compras, cuando la cantidad de un objeto es 0 o menor, lo borra del array, pero aunque este con cantidad 0, lo escribe una vez mas antes de borrarlo, como lo puedo solucionar?

function verCarrito(): void{
    console.log(``);
    console.log(`Tu carrito de compras:\n`);
    
    if(carrito.length <= 0){
        console.log(`Tu carrito de compras esta vacio.\n`);
    }else{
        carrito.forEach((carritoForeach, i) =>{
            if(carritoForeach.cantidad <= 0){
                carrito.splice(i, 1);
            }
            console.log(`Producto N${i +1}:`);
            console.log(`ID del producto: ${carritoForeach.productoId}.`);
            console.log(`Nombre del producto: ${carritoForeach.nombre}.`);
            console.log(`Precio del producto: ${carritoForeach.precio}`);
            console.log(`Cantidad del producto: ${carritoForeach.cantidad}`);
            console.log(`Subtotal del producto: ${carritoForeach.subtotal}\n`);
        });
    }
}

15. mil gracias de nuevo chat gpt, ahora necesito saber como calcular un descuento del 10% a mi subtotal, me podes explicar como se hace?

16. el metodo lenght para saber la longitud de un array, comienza en la posicion 0 cierto?

17. mil gracias

18. tengo una funcion que debe llamar a otra y al volver a la anterior, el usuario debe poder ingresar un dato, no tengo cerrada la variable del readline en ningun momento, pero de todos modos se termina mi programa, alguna idea o solucion de que puede ser?

19. como puedo hacer un switch para que cuando le ingrese 0 salga del programa y cierre la variable readline, pero sin interferir en el resto del codigo?

20. mi problema es que yo tengo un switch asi como me mostras, pero aunque nunca ingrese 0, interfiere con mi funcion que te mencione anteriormente y sale del programa, me podes explicar que esta pasando?

21. Mil gracias por toda la ayuda chat gpt