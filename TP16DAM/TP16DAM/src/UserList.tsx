import { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import { Loading } from "./Loading";

//Interfaz del usuario

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
}


export function UserList(){
    //Estado para guardar a los usuarios
    const [users, setUsers] = useState <User[]> ([]);

    //Estado para saber si esta cargando
    const [loading, setLoading] = useState(true);
    
    //Estado para manejar errores
    const [error, setError] = useState('');

    //UseEffect se ejecuta cuando el componente se monta
    useEffect(() =>{

        //FUncion para obtener los datos
        async function fetchUsers(){
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
            }
        }
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

    //Mostrar la lista de usuarios
    return(
        <div>
            <h2>Lista de usuarios ({users.length})</h2>
            <div>
                {users.map((user) =>(
                    <UserCard
                   key={user.id}
                   name={user.name}
                   email={user.email}
                   phone={user.phone}
                   website={user.website}
                    />
                ))}
            </div>
        </div>
    );
}