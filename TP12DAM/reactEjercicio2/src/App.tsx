import React from 'react'
import './App.css'
import {Producto} from './productos'
import {mostrarProductos} from './productos';

function App() {

  const productosGD: Producto[] =[{
    nombre: 'Riot',
    precio: 199999,
    imagen: './src/assets/riotImage.jpg',
    stock: true
  },
  {
    nombre: 'Cyclic',
    precio: 299999,
    imagen: './src/assets/cyclicImage.jpg',
    stock: false
  },
  {
    nombre: 'SoulsTRK (Mi papa)',
    precio: 2000-0,
    imagen: './src/assets/soulstrkImage.jpg',
    stock: true
  }
]
  return (
    <div>
      <div className='producto'>
        <h1>{mostrarProductos(productosGD[0])}</h1>
      </div>

      <div className='producto'>
        <h1>{mostrarProductos(productosGD[1])}</h1>
      </div>

      <div className='producto'>
        <h1>{mostrarProductos(productosGD[2])}</h1>
      </div>
    </div>
  )
}

export default App
