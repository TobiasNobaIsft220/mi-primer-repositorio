//Importacion del css, los componentes header y footer y de las imagenes
import './mainPart.css';
import { Navbar } from '../Components/header';
import { Footer } from '../Components/footer';
import imagenNovedad1 from '../../imagenes/FotoDelJuego1.png';
import imagenNovedad2 from '../../imagenes/FondoDelJuego2.png';

//Creacion del componenete main part
export function MainPart(){

    return(
        <div>
            <Navbar/>
    
            <div className="partePrincipal">

                <div className="overlayMainPart">
                        <a href="https://drive.google.com/file/d/1sv2CL5S9kJ2iscKxDYLWNW4n0zlUpZ_6/view?usp=sharing" target="_blank"><button id="botonDescarga">Descargar</button></a>
                </div>

                <div className='overlayMainPartMovil'>

                    <div className='parteNovedadMainPart'>

                        <div className='tituloNovedadMainPart'>
                            <h1>Novedades</h1>
                        </div>
                        
                        <div className='contenedorNovedadMainPart'>
                            <a href="novedad1">
                                <div className='novedadMainPart'>
                                    <img src={imagenNovedad1} alt="Imagen-Novedad" />
                                    <h4>Lanzamiento global de PvZ Roguelike: Acceso anticipado. Version 0.1.1</h4>
                                </div>
                            </a>
                        </div>

                        <div className='contenedorNovedadMainPart'>
                            <a href="novedad2">
                                <div className='novedadMainPart'>
                                    <img src={imagenNovedad2} alt="Imagen-Novedad" />
                                    <h4>Lista de cambios de la version 0.1.0 PvZ Roguelike</h4>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
    
            <Footer/>

        </div>
    )
}