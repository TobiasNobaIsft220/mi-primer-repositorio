//Importacion de las imagenes, el css, el useState, useEffect, los componenetes header y footer y del useNavigate
import { Footer } from "../Components/footer";
import { Navbar } from "../Components/header";
import logoPVZroguelike from '../../imagenes/fondoPVZroguelike.png';
import './signUp.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Creacion de una variable para guardar la variable de entorno de la URL
const API_URL = import.meta.env.VITE_API_URL;

//Creación del componenete signup
export function SignUp(){
    //Creacion de la variable de estado: nombre, email, contraseña, repcon
    const [nombreDeUsuario, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [repContraseña, setRepContraseña] = useState("");

    //Creamos una variable para el useNavigate
    const Navigate = useNavigate();

    //Función que consume la api registro
    const registro = async (e: React.MouseEvent<HTMLButtonElement>) => {
    
        //Variable para que no se recarge la pagina cuando tocas un boton
        e.preventDefault();

        //Llama a la api y lo que obtiene de ella lo guarda en la variable respuesta
        const respuesta = await fetch(API_URL + "/api/registro", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({nombreDeUsuario, email, contraseña, repContraseña})
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
            Navigate("/");
        }
    }

    return(
        <div>
           <Navbar/>
           <div className="partePrincipal">
                <div className="overlaySignUp">
                    <div className="parteRegistro">
                        <div className="divRegistro">
                            <img className="logoJuegoRegistro" src={logoPVZroguelike} alt="Logo"/>
                            <h2>Crear cuenta</h2>
                        </div>
                        <div className="divFormularioRegistro">
                            <form>
                                <label>Nombre de usuario</label>
                                <br/>
                                <input type="text" onChange={(e) => setNombre(e.target.value)}/>
                                <br/>
                                <label>Email</label>
                                <br/>
                                <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                                <br/>
                                <label>Contraseña</label>
                                <br/>
                                <input id="inputContraseña" type="password" onChange={(e) => setContraseña(e.target.value)}/>
                                <br/>
                                <label>Confirmar contraseña</label>
                                <br/>
                                <input type="password" onChange={(e) => setRepContraseña(e.target.value)}/>
                                <button onClick={registro}>Crear cuenta</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}