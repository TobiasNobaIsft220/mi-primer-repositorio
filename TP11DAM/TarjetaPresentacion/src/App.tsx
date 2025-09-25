//import { useState } from 'react'
import './App.css'
import akiraKogami from './assets/akiraKigami.webp'

interface Persona{
  nombre: string;
  apellido: string;
  edad: number;
  profesion: string;
  telefono: string;
}

const akira: Persona = {
  nombre: 'Akira',
  apellido: 'Kogami',
  edad: 30,
  profesion: '✨Idol🌟',
  telefono: '+81 1255-3465'
}

function App() {

  return (
    <div className='contenedor'>
      <div className='tarjeta'>

        <div className='izquierda'>
          <img src={akiraKogami} alt="akiragodgami"/>
        </div>

        <div className='derecha'>
          <div className='informacion'>
            <h1 className='titulo'>{akira.profesion}</h1>
          <h1>{akira.nombre}</h1>
          <h2>{akira.apellido}</h2>
          <h2>{akira.telefono}</h2>
          <p>Ayuda, por favor, tengo {akira.edad} años y nadie me quiere contratar, estoy muy sola unu</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

/*
<div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>*/
export default App
