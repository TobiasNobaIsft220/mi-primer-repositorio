import React from 'react'
import './App.css'
import { productos, mostrarProductos } from './productos.tsx';


function App() {

  return (
    <>
    <productos

    />
      <div className='producto1'>
        <h1>{mostrarProductos()}</h1>
      </div>

      <div>
        
      </div>
      
    </>
  )
}

export default App
