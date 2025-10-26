import { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import { Loading } from "./Loading";
import { Button } from "./Button";
import { Input } from "./input";
import { FuncionPaginacion } from "./Paginacion";
import './UserList.css'

//Interfaz del usuario

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company:{
        name: string;
        catchPrhase: string;
        bs: string;
    }
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    }
}

export function UserList(){

    //Estado para guardar a los usuarios
    const [users, setUsers] = useState <User[]> ([]);

    //Estado para saber si esta cargando
    const [loading, setLoading] = useState(true);
    
    //Estado para manejar errores
    const [error, setError] = useState('');

    const [valorFiltro, setValorFiltro] = useState('');

    const [usuarioFiltrado, setUsuarioFiltrado] = useState<User[] | null>(null);

    const [paginaActual, setPaginaActual] = useState(1);

    const usuariosPorPagina = 5;

    //Variables para saber los usuarios que se mostraran por pagina y desactivar los botones cuando sea necesario
    const indiceDelUltimoUsuario = paginaActual * usuariosPorPagina;
    const indiceDelPrimerUsuario = indiceDelUltimoUsuario - usuariosPorPagina;
    const usuariosActules = users.slice(indiceDelPrimerUsuario, indiceDelUltimoUsuario);
    const paginasTotales = Math.ceil(users.length / usuariosPorPagina);

    //Funcion para obtener los datos
        async function fetchUsers(){

            console.log('Comprobacion de que se cargan los datos');

            try{

                //1. Hacer la peticion de la API
                const response = await fetch('https://jsonplaceholder.typicode.com/users');

                //2. Verificar si la respuesta fue exitosa
                if(!response.ok){
                    throw new Error('Error al cargar a los usuarios')
                }

                //3. Convertir la respuesta a JSON
                const data = await response.json();

                //4. Guardar los datos en el estado
                setUsers(data);

            } catch(err){
                //Si hay error, guardarlo
                setError('No se pudieron cargar los usuarios');
            }finally{
                //Siempre termina la carga
                setLoading(false);

                setUsuarioFiltrado(null);

                setValorFiltro('');
            }
        }

    //UseEffect se ejecuta cuando el componente se monta
    useEffect(() =>{
        //Llamar a la funcion
        fetchUsers();
    }, []); // [] significa que se ejecuta solo una vez al montar

    //Si esta cargando mostrar componente de carga
    if(loading){
        return <Loading/>;
    }

    //Si hay error, mostrarlo
    if(error){
        return <div className="error">{error}</div>
    }

    function FiltrarUsuario(){
        if(valorFiltro.trim() === ''){
            setUsuarioFiltrado(null);
        }else{
            const filtro = users.filter((u)=>{
                return u.name.toLocaleLowerCase().trim() === valorFiltro.toLocaleLowerCase().trim();
            });
            setUsuarioFiltrado(filtro);
        }
    }

    const mostrarUsuarios = usuarioFiltrado ?? usuariosActules;

    //Mostrar la lista de usuarios
    return(
        <div>

            <h2>Lista de usuarios {users.length} (Pagina: {paginaActual} de {paginasTotales})</h2>

                <Input
                    type='text'
                    value={valorFiltro}
                    onChange={(e)=> setValorFiltro(e.target.value)}
                    placeholder='Buscar por nombre'
                />

                <Button
                    texto='Buscar'
                    onClick={FiltrarUsuario}
                    disabled={false}
                />

                <br/>

            <div className="usuarios">
                {mostrarUsuarios.map((user) =>(
                    <UserCard
                   key={user.id}
                   name={user.name}
                   email={user.email}
                   phone={user.phone}
                   website={user.website}
                   company={user.company}
                   address={user.address}
                    />
                ))}
            </div>

            <Button
            texto="Recargar datos"
            onClick={fetchUsers}
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