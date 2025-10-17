import { useEffect, useState } from "react";
import {InputField} from './InputField';
import { BotonSubmit } from './BotonSubmit';
import './FormularioInscripcion.css';

//Funcion principal
export function FormularioInscripcion(){

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mensajeExito, setMensajeExito] = useState(false);

    useEffect(() =>{
                if (mensajeExito){
                    document.title = 'Inscripcion exitosa';
                }else{
                    document.title = 'Sistema de inscripcion';
                }
            }, [mensajeExito]);

    function handleReset(){
        setNombre('');
        setApellido('');
        setEmail('');
        setTelefono('');
        setMensajeExito(false);
    }

    //Funcion que se ejecuta cuando se toca el boton
    const handleSubmit = (e: React.FormEvent) => {

        //Hace que no se actualice la pagina despues de tocar el boton
        e.preventDefault();

        //Datos de comprobacion para los datos en la consola
        console.log('Datos enviados:');
        console.log('Nombre: ', nombre);
        console.log('Apellido: ', apellido);
        console.log('Email: ', email);
        console.log('Telefono: ', telefono);

        //Condicional para validar que esten todos los campos llenos
        if(!nombre.trim() || !apellido.trim() || !email.trim() || !telefono.trim()){

            //Alerta en pantalla
            alert('Por favor, completa todos los campos');

        }else{

            //Se cambia el estado de mensajeExito para que cambie el titulo de la pagina y se muestren o no algunos divs
            setMensajeExito(true);

        }
    }

    //Return principal en donde esta todo el html
    return(

        //Div principal, obligatorio
        <div className="contenedor">

            {/*Condicional para ocultar este div y todo su codigo */}
            {!mensajeExito && (
                <div className="contenedor">
                    <div className="titulo">
                        <h1>Inscripcion a la Academia Beygoma</h1>
                    </div>

                    <div>
                        <img src="./src/assets/beyblade.jpg" alt="Beyblade fachero"/>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <InputField
                                label="Nombre"
                                type="text"
                                value={nombre}
                                onChange= {(e) => setNombre(e.target.value)}
                                placeholder="Ingresa tu nombre"
                            />
                        </div>

                        <div>
                            <InputField
                                label="Apellido"
                                type="text"
                                value={apellido}
                                onChange= {(e) => setApellido(e.target.value)}
                                placeholder="Ingresa tu apellido"
                            />
                        </div>

                        <div>
                            <InputField
                                label="email"
                                type="email"
                                value={email}
                                onChange= {(e) => setEmail(e.target.value)}
                                placeholder="Ingresa tu email"
                            />
                        </div>

                        <div>
                            <InputField
                                label="telefono"
                                type="tel"
                                value={telefono}
                                onChange= {(e) => setTelefono(e.target.value)}
                                placeholder="Ingresa tu telefono"
                            />
                        </div>

                        <BotonSubmit 
                            texto="Enviar" 
                            onClick={handleSubmit}
                        />

                    </form>
                </div>
            )}
            
            {/*Condicional para mostrar este div y todo su codigo */}
            {mensajeExito &&(
                <div>
                    <h1>✔ Inscripcion exitosa</h1>

                    <h2>Bienvenido a la Academia Beygoma</h2>

                    <h3>Tus datos son: </h3>

                    <p>Nombre: {nombre}</p>
                    <p>Apellido: {apellido}</p>
                    <p>Email: {email}</p>
                    <p>Telefono: {telefono}</p>

                    <BotonSubmit 
                        texto="Inscribir otra persona" 
                        onClick={handleReset}
                    />

                </div>
            )}
    
        </div>
    )
}