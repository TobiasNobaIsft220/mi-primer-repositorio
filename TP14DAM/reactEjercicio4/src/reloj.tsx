import './reloj.css'
import { useEffect, useState } from 'react';

export function mostrarReloj(){
    const [hora, cambiarHora] = useState(new Date().toLocaleTimeString());

    useEffect(() =>{
        
        console.log('Reloj iniciado');

        const intervalo = setInterval(() => {
            cambiarHora(new Date().toLocaleTimeString());
        }, 1000);

        return() => {
            clearInterval(intervalo);
            console.log('Reloj detenido');
        }

    });

    return(
        <div>
            <div>
                <p>hora: {hora}</p>
            </div>
        </div>
    )
}