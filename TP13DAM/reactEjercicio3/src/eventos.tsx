import React from 'react';
import './eventos.css'

export interface Evento{
    title: string;
    date: string;
    location: string;
    attendees: number;
    category: 'music' | 'sports' | 'tech' | 'food';
}

export function mostrarEventos(props:Evento){
    const asistentes = `👥${props.attendees}`
    const eventoClass = `${props.category}`;

    return(
        <div className={eventoClass}>
            <div className='tarjetaProducto'>
                <div>
                    <h1>{props.title}</h1>
                </div>
                <div>
                    <p>{props.date}</p>
                </div>
                <div>
                    <p>{props.location}</p>
                </div>

                <div>
                    <p>{asistentes}</p>
                </div>
            </div>

        </div>
    )

}