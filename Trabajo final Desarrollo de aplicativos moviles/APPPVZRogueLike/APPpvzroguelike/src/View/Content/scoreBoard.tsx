//Importacion del css, el useState y useEffect
import './scoreBoard.css';
import { Navbar } from '../Components/header';
import { Footer } from '../Components/footer';
import { useState, useEffect } from 'react';

//Creacion de una variable para guardar la variable de entorno de la URL
const API_URL = import.meta.env.VITE_API_URL;

//Declaracion de la interfaz que se utiliza para recibir los puntajes de los usuario
interface ScoreBoardProp {
    nombreDeUsuario: string,
    mejorPuntaje: number,
    ultimoPuntaje: number
}

//Creacion del componente scoreBoard
export function ScoreBoard(){

    //Creacion de la variable de estado
    const [usuarios, setUsuarios] = useState<ScoreBoardProp[]>([]);

    //Funcion useEffect para que recupere los puntajes de los usuarios cada vez que se ingresa a la pagina
    useEffect(() => {
        //Función que consume la api de obtención de puntajes
        const cargandoScore = async () => {
            //Llama a la api y guarda los datos en la variable res
            const res = await fetch(API_URL + "/api/puntajes");
            //Pasa los valores de res a json y los guarda en data como un objeto
            const data = await res.json();
            //Guarda los datos en la variable de estado
            setUsuarios(data);
        }

        //Llama a la función que recupera los scores de los usuarios
        cargandoScore();
    }, []);

    return(
        <div>
            <Navbar/>
            <div className="partePrincipal">
                <div className="overlayScoreBoard">
                    <div className="parteScore">
                        <h1>Tabla de clasificaciones</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Puesto</th>

                                    <th>Nombre de uasuario</th>

                                    <th>Mejor puntaje</th>

                                    <th>Ultimo puntaje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Map para que cree un tr con cada usuario*/}
                                {usuarios?.map((u, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{u.nombreDeUsuario}</td>
                                        <td>{u.mejorPuntaje}</td>
                                        <td>{u.ultimoPuntaje}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    
            <Footer/>

        </div>
    )
}