"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
;
;
function hacerFactura(productos) {
    let total = 0;
    for (const producto of productos) {
        let precioUnitario = producto.precio;
        if (producto.descuento) {
            precioUnitario = precioUnitario * (1 - producto.descuento / 100);
        }
        if (producto.IVA) {
            precioUnitario = precioUnitario + (precioUnitario * (producto.IVA / 100));
        }
        total += precioUnitario * producto.cantidad;
    }
    return total;
}
const clientes = {
    nombre: "pepe",
    mail: "pepe@gmail.com",
    telefono: 112345334
};
const productosTotal = [
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
];
const facturas = {
    cliente: clientes,
    productos: productosTotal,
    fecha: new Date(),
    numero: 3
};
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
    if (producto.IVA) {
        console.log(` IVA: ${producto.IVA}%`);
        console.log(` Precio con IVA: ${precioUnitarioIVA.toFixed(2)}`);
    }
    console.log(` Cantidad: ${producto.cantidad}`);
    console.log(` Subtotal: $${subtotal.toFixed(2)}`);
    console.log("");
});
// Mostrar total
console.log("-".repeat(50));
console.log(`TOTAL A PAGAR: $${precioTotal.toFixed(2)}`);
console.log("=".repeat(50));
function guardarFactura(contenido, numeroFactura) {
    fs.writeFileSync(`factura_${numeroFactura}.txt`, JSON.stringify(contenido, null, 2));
    console.log("Factura gurdada.");
}
guardarFactura(facturas, facturas.numero);
