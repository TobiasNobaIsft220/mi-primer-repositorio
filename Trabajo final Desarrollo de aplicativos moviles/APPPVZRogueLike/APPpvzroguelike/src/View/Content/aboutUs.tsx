//Importacion del css y los componentes header y footer
import './aboutUs.css';
import { Navbar } from '../Components/header';
import { Footer } from '../Components/footer';

//Creación del componente about us
export function AboutUs(){

    return(
        <div>
            <Navbar/>

            <div className="parteSobreNosotros">
                <div className='overlaySobreNosotros'>
                    <div className='sobreNosotrosTexto'>
                        <div className='textoSobreNosotros'>
                            <h3><b>Sobre nosotros</b></h3>
                            <p>Somos un pequeño equipo independiente apasionado por el desarrollo de videojuegos y, en especial, por el universo de Plants vs. Zombies. Nuestro proyecto consiste en la creación de un fangame que busca mantener viva la esencia del título original, respetando su estilo, su humor y su jugabilidad clásica, al mismo tiempo que incorporamos nuevas mecánicas, niveles, personajes e ideas propias para ofrecer una experiencia fresca y renovada.</p>
                            <p>Nuestro objetivo principal es brindar un juego divertido, accesible y completamente gratuito para toda la comunidad de fanáticos. Creemos en el valor de los proyectos hechos por fans y en la posibilidad de aportar contenido nuevo sin perder el espíritu que hizo tan especial al juego original.</p>
                            <p>Si bien no estamos afiliados ni contamos con relación alguna con PopCap Games o Electronic Arts, trabajamos con profundo respeto hacia la obra original y con la intención de expandir su universo desde una perspectiva creativa y personal. Cada integrante del equipo aporta sus habilidades y dedicación para que este proyecto avance y pueda convertirse en una experiencia memorable para quienes disfrutan de la saga.</p>
                        </div>
                    </div>
                </div>
            </div>
    
            <Footer/>

        </div>
    )
}