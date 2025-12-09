//Importamos el header, footer, css y la imagen
import './new1.css';
import { Navbar } from '../Components/header';
import { Footer } from '../Components/footer';

import imagenNovedad1 from '../../imagenes/FotoDelJuego1.png';


export function New1(){

    return(
        <div>
            <Navbar/>

            <div className="parteNovedad">
                <div className='overlayNovedad'>
                    <div className='novedadTexto'>

                        <img src={imagenNovedad1} alt="Imagen-Novedad" />

                        <div className='textoNovedad1'>
                            <h3><b>Lanzamiento global de PvZ Roguelike: Acceso anticipado. Version 0.1.1</b></h3>
                            <p>La versión 0.1.1 marca el lanzamiento global en Acceso Anticipado de nuestro fangame Plants vs. Zombies Roguelike. Esta actualización inicial introduce la base jugable del proyecto, permitiendo a los jugadores experimentar las mecánicas principales del combate por oleadas, generación procedural y progresión roguelike, mientras seguimos expandiendo contenido, balance y características a través del desarrollo continuo.</p>
                        </div>
                    </div>
                </div>
            </div>
    
            <Footer/>

        </div>
    )
}