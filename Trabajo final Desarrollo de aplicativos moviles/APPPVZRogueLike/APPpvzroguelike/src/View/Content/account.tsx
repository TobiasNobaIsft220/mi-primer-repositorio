//Importacion de las imagenes, el css, el useState, useEffect, los componenetes header y footer y del useNavigate
import './account.css';
import { Navbar } from '../Components/header';
import { Footer } from '../Components/footer';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

//Creacion de una variable para guardar la variable de entorno de la URL
const API_URL = import.meta.env.VITE_API_URL;

//Declaracion de la interfaz que se utiliza para recibir los datos del usuario
interface UsuarioProp {
    id: number,
    nombreDeUsuario: string,
    email: string,
    contraseña: string,
    mejorPuntaje: number,
    ultimoPuntaje: number
}

//Creación del componenete account
export function Account(){
 
    //Creacion de la variable de estado
    const [usuario, setUsuario] = useState<UsuarioProp | null>(null);
    
    //Creamos una variable para el useNavigate
    const Navigate = useNavigate();

    //Funcion useEffect para que cada vez que entre a esta pagina muestre los datos del usuario
    useEffect(() => {
        //Guarda el valor del token del localstorage en una variable
        const token = localStorage.getItem("token");
        //Verfica si recuperó algun valor del localstorage
        if (!token){
            return;
        };
    
        //Función que consume la api de obtención de los datos del usuario
        const cargarUsuario = async () => {
            //Llama a la api, lo autoriza a utilizarla mediante el token y lo que devuelve se guarda en la variable res
            const res = await fetch(API_URL + "/api/perfil", {
                headers: {
                Authorization: "Bearer " + token
                }
            });
    
            //Pasa los valores de res a json y los guarda en data como un objeto
            const data = await res.json();
            //Si existe lo guarda en la variable de estado 
            if (data.usuario){
                setUsuario(data.usuario);
            };
        };
    
        //Llama a la funcion que recupera la informacion del usuario
        cargarUsuario();
    }, []);

    //Función para deslogear al usuario
    const logout = () => {
        //Elimina el token guardado en el local storaege
        localStorage.removeItem("token");
        //Cambia los valores de la variable de estaso
        setUsuario(null);
        //Te redirige a la pagina principal
        Navigate("/")
    };

 return(
        <div>
            <Navbar/>
            <div className="partePrincipal">
                <div className="overlayAccount">
                    <div className="parteCuenta">
                        <h1>Cuenta</h1>
                        <h2>Nombre: {usuario?.nombreDeUsuario}</h2>
                        <h2>Mejor puntaje: {usuario?.mejorPuntaje}</h2>
                        <h2>Ultimo puntaje: {usuario?.ultimoPuntaje}</h2>
                        <button onClick={logout}>Cerrar sesión</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}