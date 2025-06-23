import * as fs from "fs";

interface cliente{
    nombre:string,
    mail:string,
    telefono:number
};

interface producto{
    nombre:string,
    precio:number,
    cantidad:number,
    descuento?:number,
    IVA?:number
};

interface factura{
    cliente:cliente,
    productos:producto[],
    fecha:Date,
    numero:number
}

function hacerFactura(productos:producto[]):number{
    let total:number = 0;

    for(const producto of productos){
        let precioUnitario:number = producto.precio;

        if(producto.descuento){
            precioUnitario = precioUnitario * (1 - producto.descuento / 100);

        }

        if(producto.IVA){
            precioUnitario = precioUnitario + (precioUnitario*(producto.IVA/100));
        }
        
        total += precioUnitario * producto.cantidad;
    }

    return total;
}

const clientes:cliente = {
    nombre: "pepe",
    mail: "pepe@gmail.com",
    telefono: 112345334
}

const productosTotal:producto[]=[
    {
        nombre: "Laptop gaming",
        precio: 1200,
        cantidad: 1,
        descuento: 10,
        IVA: 27
    },
    {
        nombre: "Mouse inalambrico",
        precio: 25,
        cantidad: 2
    },
    {
        nombre: "Monitor 24\"",
        precio: 300,
        cantidad: 1,
        descuento: 5
    },
    {
        nombre: "Teclado mecanico",
        precio: 80,
        cantidad: 1,
        descuento: 15,
        IVA: 27
    },
]

const facturas:factura ={
    cliente:clientes,
    productos:productosTotal,
    fecha: new Date(),
    numero: 3
}

const precioTotal = hacerFactura(productosTotal);

console.log("=".repeat(50));
console.log("      FACTURA DE PRODUCTOS");
console.log("=".repeat(50));

console.log("\nDetalle de productos");
console.log("-".repeat(50));

productosTotal.forEach((producto, index) => {
    const precioUnitarioDescuento = producto.descuento ? producto.precio * (1 - producto.descuento / 100) : producto.precio;
    const precioUnitarioIVA = producto.IVA ? precioUnitarioDescuento + (precioUnitarioDescuento * (producto.IVA / 100)) : precioUnitarioDescuento;
    const subtotal = precioUnitarioIVA * producto.cantidad;

    console.log(`${index + 1}. ${producto.nombre}`);
    console.log(` Precio unitario: $${producto.precio.toFixed(2)}`);
    if (producto.descuento) {
        console.log(` Descuento: ${producto.descuento}%`);
        console.log(` Precio con descuento: $${precioUnitarioDescuento.toFixed(2)}`);
    }
    if(producto.IVA){
        console.log(` IVA: ${producto.IVA}%`);
        console.log(` Precio con IVA: ${precioUnitarioIVA.toFixed(2)}`)
    }
    console.log(` Cantidad: ${producto.cantidad}`);
    console.log(` Subtotal: $${subtotal.toFixed(2)}`);
    console.log("");
});

// Mostrar total
console.log("-".repeat(50));
console.log(`TOTAL A PAGAR: $${precioTotal.toFixed(2)}`);
console.log("=".repeat(50));

function guardarFactura(contenido:factura, numeroFactura:number):void{
    fs.writeFileSync(`factura_${numeroFactura}.txt`,JSON.stringify(contenido, null, 2));
    console.log("Factura gurdada.");
}

guardarFactura(facturas,facturas.numero);
