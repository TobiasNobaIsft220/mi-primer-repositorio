import './new2.css';
import { Navbar } from '../Components/header';
import { Footer } from '../Components/footer';

import imagenNovedad2 from '../../imagenes/FondoDelJuego2.png';

export function New2(){

    return(
        <div>
            <Navbar/>

            <div className="parteNovedad">
                <div className='overlayNovedad'>
                    <div className='novedadTexto'>

                        <img src={imagenNovedad2} alt="Imagen-Novedad" />

                        <div className='textoNovedad2'>
                            <h3><b>Lista de cambios de la version 0.1.0 PvZ Roguelike</b></h3>
                            <p>Lista de cambios: <br/>-Ahora los soles se pueden agarrar correctamente. <br/>-Ahora las semillas de las plantas cambian de color al estar seleccionadas. <br/>-Ahora la pala cambia de color al estar seleccionada. <br/>-Se relentizo la produccion de sol en general. <br/>-Se corrigio la calidad del fondo del jardin. <br/>-Se corrigio la posicion de las cassillas en el jardin.</p>
                        </div>
                    </div>
                </div>
            </div>
    
            <Footer/>

        </div>
    )
}