import React from 'react';
import './productos.css'

export interface productos{
    nombre: string;
    precio: number;
    imagen: string;
    stock: boolean;
}

/*
const cubo1: productos = {
    nombre: 'Riot',
    precio: 199999,
    imagen: 'imagenRiot.png',
    stock: false 
}

const cubo2: productos = {
    nombre: 'Cyclic',
    precio: 299999,
    imagen: 'imagenCyclic.png',
    stock: false
}

const cubo3: productos = {
    nombre: 'SoulsTRK',
    precio: 2000-0,
    imagen: 'imagenSoulsTRK.png',
    stock: false
}
*/
export function mostrarProductos(props:productos){
    const formatoPrecio = props.precio.toFixed(2);
    const stockClass = props.stock ? 'stock-badge avaliable' : 'stock-badge sold-out';
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
                <p>{props.precio}</p>
            </div>

            <div>
                <p>{props.stock}</p>
            </div>

        </div>
    )

}