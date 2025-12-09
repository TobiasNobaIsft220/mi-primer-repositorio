//Importacion de las imagenes, el css, el useState y useEffect
import './header.css';
import logoPVZroguelike from '../../imagenes/fondoPVZroguelike.png';
import botonCuenta from '../../imagenes/botonCuenta.png';
import botonScore from '../../imagenes/scoreBoard.png';
import botonHome from '../../imagenes/homeButton.png';
import botonIniciarSesion from '../../imagenes/botonInicioSesion.png';
import botonJugar from '../../imagenes/botonJugar.png';
import botonSobreNosotros from '../../imagenes/botonSobreNosotros.png';
import { useEffect, useState } from 'react';

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

//Creacion del componente Navbar o Header
export function Navbar(){

    //Creacion de la variable de estado
    const [usuario, setUsuario] = useState<UsuarioProp | null>(null);

    //Funcion useEffect para evaluar si el usuario inicio sesion en la pagina o no
    useEffect(() => {
        //Guarda el valor del token del localstorage en una variable
        const token = localStorage.getItem("token");
        //Verfica si recuperó algun valor del localstorage
        if (!token){
            return;
        };

        //Función que consume la api de obtención de usuario
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
    },[]);

    return(
        <>
            {/*Si usuario tiene algún valor mostrará lo de abajo*/}
            {usuario ? (
            <div className="barraDeNavegacion">
                <a id='aLogoJuego' href='/'><img className="logoJuego" src={logoPVZroguelike} alt="Logo"/></a>

                <a href="/"><img id='botonHome' src={botonHome} alt='home'/></a>
                <a href="/sobreNosotros"><img id='botonSobreNosotros' src={botonSobreNosotros} alt='Sobre nosotros'/></a>
                <a id='aBotonJugar' href='#' onClick={(e) =>{e.preventDefault(); alert("Iniciando juego");}}><img id='botonJugar' src={botonJugar} alt='Jugar'/></a>
                <a href="/clasificaciones"><img id='botonScore' src={botonScore} alt='scoreboard' /></a>

                <a href='/cuenta'><img id='botonCuenta' src={botonCuenta} alt='boton cuenta'/></a>
            </div>
            ) : (
            //Si no tiene ningun valor mostrará lo siguiente
            <div className="barraDeNavegacion">
                <a id='aLogoJuego' href='/'><img className="logoJuego" src={logoPVZroguelike} alt="Logo"/></a>

                <a href="/"><img id='botonHome' src={botonHome} alt='home'/></a>
                <a href="/sobreNosotros"><img id='botonSobreNosotros' src={botonSobreNosotros} /></a>
                <a id='aBotonJugar' href='#' onClick={(e) =>{e.preventDefault(); alert("Iniciando juego");}}><img id='botonJugar' src={botonJugar} alt='Jugar'/></a>
                <a href="/clasificaciones"><img id='botonScore' src={botonScore} alt='scoreboard' /></a>

                <a href="/iniciarSesion"><img id='botonIniciarSesion' src={botonIniciarSesion} alt='iniciar sesion'/></a>
            </div>
            )}
        </>
    );
}