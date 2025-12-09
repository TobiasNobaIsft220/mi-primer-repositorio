//Importaciones de imagenes y css
import './footer.css';
import frustrella from '../../imagenes/Starfruit-HD.png';
import EALogo from '../../imagenes/Electronic-Arts-Logo.png';
import PopcapLogo from '../../imagenes/popcap-logo.png';

//Creación del componente footer
export function Footer(){

    return(
        <footer className="pieDePagina">
            <div className='divIzquierda'>
                <div className='creador'>
                    <img src={frustrella} alt='foto'/>
                    <p><b>Mateo Noba</b></p>
                </div>
                <div className='empresas'>
                    <img src={EALogo} alt='Logo EA'/>
                    <img id='logoPopcap' src={PopcapLogo} alt='Logo Popcap'/>
                </div>
            </div>
            <div className='divDerecha'>
                <div className='copyright'>
                    <p>Copyright © 2025 PVZRoguelike. All Rights Reserved.</p>
                    <p>Esta es una página hecha por fans y no está afiliada ni respaldada por Electronic Arts Inc. Plants vs Zombies y todos los recursos relacionados son marcas registradas de Electronic Arts Inc.</p>
                </div>
            </div>
        </footer>
    )
}