import './productos.css'
import { useState } from 'react';

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

    const [contador, cambiarEstado] = useState(0);

    const sumarContador = () => {
        cambiarEstado(contador + 1);
    }

    const restarContador = () => {
        cambiarEstado(contador - 1);
    }

    const resetearContador = () => {
        cambiarEstado(0);
    }

    return(
        <div>
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

                <div className='contadorProductos'>
                    <p>cantidad: {contador}</p>

                    <button className='botonSumar' onClick={sumarContador}>
                        +
                    </button>

                    <button className='botonRestar' onClick={restarContador}>
                        -
                    </button>

                    <button className='botonResetear' onClick={resetearContador}>
                        resetear
                    </button>
                </div>
            </div>
        </div>
    )

}