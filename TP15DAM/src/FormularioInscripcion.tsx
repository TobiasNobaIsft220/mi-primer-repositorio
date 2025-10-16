import { useEffect, useState } from "react";
import {InputField} from './InputField';
import { BotonSubmit } from './BotonSubmit';

export function FormularioInscripcion(){

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mensajeExito, setMensajeExito] = useState(false);

    const manejarEnvio = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Datos enviados:');
        console.log('Nombre: ', nombre);
        console.log('Apellido: ', apellido);
        console.log('Email: ', email);
        console.log('Telefono: ', telefono);

        if(!nombre.trim() || !apellido.trim() || !email.trim() || !telefono.trim()){
            alert('Por favor, completa todos los campos');

            setMensajeExito(false);

        }else{
            alert('Formulario enviado correctamente');

            setMensajeExito(true);

            setNombre('');
            setApellido('');
            setEmail('');
            setTelefono('');

            useEffect(() =>{
                if (mensajeExito){
                    document.title = 'Inscripcion exitosa';
                }else{
                    document.title = 'Sistema de inscripcion';
                }
            }, [mensajeExito]);
        }
    }

    return(
        <div>
            <form onSubmit={manejarEnvio}>
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
                    onClick={manejarEnvio}
                />

            </form>
    
        </div>
    )
}