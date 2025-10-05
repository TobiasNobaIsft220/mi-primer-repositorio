import React from 'react';
import './productos.css'

export interface Producto{
    nombre: string;
    precio: number;
    imagen: string;
    stock: boolean;
}

export function mostrarProductos(props:Producto){
    const formatoPrecio = `$${props.precio.toFixed(2)}`;
    const stockClass = props.stock ? 'productoDisponible' : 'productoAgotado';
    const stockText = props.stock ? 'disponible' : 'agotado';
    return(
        <div className='tarjetaProducto'>
            <div className='imagenProducto'>
                <img src={props.imagen} alt={props.nombre}/>
            </div>
            <div className='nombreProducto'>
                <p>{props.nombre}</p>
            </div>
            <div className='precioProducto'>
                <p>{formatoPrecio}</p>
            </div>

            <div className={stockClass}>
                <p>{stockText}</p>
            </div>

        </div>
    )

}