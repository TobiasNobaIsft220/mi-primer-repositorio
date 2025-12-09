//Importacion de las imagenes, el css, el useState, useEffect, los componenetes header y footer y del useNavigate
import { Footer } from "../Components/footer";
import { Navbar } from "../Components/header";
import logoPVZroguelike from '../../imagenes/fondoPVZroguelike.png';
import './logIn.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Creacion de una variable para guardar la variable de entorno de la URL
const API_URL = import.meta.env.VITE_API_URL;

//Creación del componenete login
export function Login(){

    //Creacion de la variable de estado: email, contraseña
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");

    //Creamos una variable para el useNavigate
    const Navigate = useNavigate();

    //Función que consume la api de inicio de sesión
    const logInUser = async () =>{
        //Llama a la api y lo que obtiene de ella lo guarda en la variable respuesta
        const respuesta = await fetch(API_URL + "/api/inicioSesion", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, contraseña})
        });

        //Pasa los valores de res a json y los guarda en data como un objeto
        const data = await respuesta.json();
        console.log(data);//Muestra los datos en consola
        alert(data.message);//Muestra una alerta con el mensaje que consigui de la api

        //Verifica de que tenga un token
        if (data.token) {
            //Se guarda el token en el localstorage
            localStorage.setItem("token", data.token);
            //Te envia al inicio
            Navigate("/")
        }
    }

    return(
        <div>
           <Navbar/>
            <div className="partePrincipal">
                <div className="overlayLogin">
                    <div className="parteIniciarSesion">
                        <div className="divIniciarSesion">
                            <img className="logoJuegoSesion" src={logoPVZroguelike} alt="Logo"/>
                            <h2>Iniciar sesión</h2>
                        </div>
                        <div className="divFormularioInicioSesion">
                            <form>
                                <label>Email</label>
                                <br/>
                                <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                                <br/>
                                <label>Contraseña</label>
                                <br/>
                                <input id="inputContraseña" type="password" onChange={(e) => setContraseña(e.target.value)}/>
                                <p><a href="/crearCuenta">Crear cuenta?</a></p>
                                <button onClick={(e) => {e.preventDefault(); logInUser()}}>Iniciar sesión</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}