import { useEffect, useState } from "react";
import { DemonCard } from "./DemonCard";
import { Loading } from "./Loading";
import { Button } from "./Button";
import { Input } from "./input";
import { FuncionPaginacion } from "./Paginacion";
import './DemonList.css'

//Interfaz del usuario

interface Demons {
   name: string;
   position: number;
   thumbnail: string;
   video: string;
}

export function DemonList(){

    //Estado para guardar a los usuarios
    const [demons, setDemons] = useState <Demons[]> ([]);

    //Estado para saber si esta cargando
    const [loading, setLoading] = useState(true);
    
    //Estado para manejar errores
    const [error, setError] = useState('');

    const [valorFiltro, setValorFiltro] = useState('');

    const [demonFiltrado, setDemonFiltrado] = useState<Demons[] | null>(null);

    const [paginaActual, setPaginaActual] = useState(1);

    const demonsPorPagina = 5;

    //Variables para saber los usuarios que se mostraran por pagina y desactivar los botones cuando sea necesario
    const indiceDelUltimoDemon = paginaActual * demonsPorPagina;
    const indiceDelPrimerUsuario = indiceDelUltimoDemon - demonsPorPagina;
    const usuariosActules = demons.slice(indiceDelPrimerUsuario, indiceDelUltimoDemon);
    const paginasTotales = Math.ceil(demons.length / demonsPorPagina);

    //Funcion para obtener los datos
        async function fetchDemons(){

            console.log('Comprobacion de que si se cargan los datos');

            try{

                //1. Hacer la peticion de la API
                const response = await fetch('https://pointercrate.com/api/v2/demons/?limit=10');

                //2. Verificar si la respuesta fue exitosa
                if(!response.ok){
                    throw new Error('Error al cargar a los demons');
                }

                //3. Convertir la respuesta a JSON
                const data = await response.json();

                //4. Guardar los datos en el estado
                setDemons(data);

            } catch(err){
                //Si hay error, guardarlo
                setError('No se pudieron cargar los demons');
            }finally{
                //Siempre termina la carga
                setLoading(false);

                setDemonFiltrado(null);

                setValorFiltro('');
            }
        }

    //UseEffect se ejecuta cuando el componente se monta
    useEffect(() =>{
        //Llamar a la funcion
        fetchDemons();
    }, []); // [] significa que se ejecuta solo una vez al montar

    //Si esta cargando mostrar componente de carga
    if(loading){
        return <Loading/>;
    }

    //Si hay error, mostrarlo
    if(error){
        return <div className="error">{error}</div>
    }

    function FiltrarDemon(){
        if(valorFiltro.trim() === ''){
            setDemonFiltrado(null);
        }else{
            const filtro = demons.filter((d)=>{
                return d.name.toLocaleLowerCase().trim() === valorFiltro.toLocaleLowerCase().trim();
            });
            setDemonFiltrado(filtro);
        }
    }

    const mostrarDemons = demonFiltrado ?? usuariosActules;

    //Mostrar la lista de usuarios
    return(
        <div>

            <h2>Lista de demons {demons.length} (Pagina: {paginaActual} de {paginasTotales})</h2>

                <Input
                    type='text'
                    value={valorFiltro}
                    onChange={(e)=> setValorFiltro(e.target.value)}
                    placeholder='Buscar por nombre'
                />

                <Button
                    texto='Buscar'
                    onClick={FiltrarDemon}
                    disabled={false}
                />

                <br/>

            <div className="demons">
                {mostrarDemons.map((demons) =>(
                    <DemonCard
                   name={demons.name}
                   position={demons.position}
                   thumbnail={demons.thumbnail}
                   video={demons.video}
                    />
                ))}
            </div>

            <Button
            texto="Recargar datos"
            onClick={fetchDemons}
            disabled={false}
            />

            <FuncionPaginacion

            paginaActual={paginaActual}
            paginasTotales={paginasTotales}
            siguiente={() => setPaginaActual((p) => Math.min(p + 1, paginasTotales))}
            atras={() => setPaginaActual((p) => Math.max(p - 1, 1))}
           
            />
        </div>
    );
}