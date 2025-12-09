//Importacion de los componenetes de la página, el css y los elementos necesario para lograr que nuestra app pueda mostrar los diferentes componentes
import type React from 'react';
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import './App.css';
import { MainPart } from './View/Content/mainPart';
import { Login } from './View/Content/logIn';
import { SignUp } from './View/Content/signUp';
import { ScoreBoard } from './View/Content/scoreBoard';
import { AboutUs } from './View/Content/aboutUs';
import { Account } from './View/Content/account';
import { New1 } from './View/Content/new1';
import { New2 } from './View/Content/new2';

//Creamos el componente Pagina que se usara como base para mostrar los demás componentes de la página
function Pagina() {
  return (
    <>
      <Outlet/>
    </>
  )
}

//Asignamos las rutas con los componenetes que mostrarán utiliznado la función createBrowsRoute y lo guardamos en la variable router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Pagina/>,
    errorElement: '',
    children: [
      {
        index: true,
        element: <MainPart/>
      },
      {
        path: 'iniciarSesion',
        element: <Login/>
      },
      {
        path: 'crearCuenta',
        element: <SignUp/>
      },
      {
        path: 'clasificaciones',
        element: <ScoreBoard/>
      },
      {
        path: 'sobreNosotros',
        element: <AboutUs/>
      },
      {
        path: 'cuenta',
        element: <Account/>
      },
      {
        path: 'novedad1',
        element: <New1/>
      },
      {
        path: 'novedad2',
        element: <New2/>
      }
    ]
  }
])

//Creamos el componente principal app
const App: React.FC = () => {
  //Devuelve el componente RouterProvider que es lo que activa las rutas y le pasamos nuestra variable router creada anteriormente
  return <RouterProvider router={router} />
}

//Exportamos el componente app
export default App
