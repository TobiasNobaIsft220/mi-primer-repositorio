import React from 'react'
import './App.css'
import {Evento} from './eventos'
import {mostrarEventos} from './eventos';

function App() {

  const objetoEvento: Evento[] =[{
    title: `Concierto de Creo`,
    date: `5/12/2030`,
    location: `Carlos Calov 2234`,
    attendees: 5000,
    category: 'music'
  },
  {
    title: `Argentina vs Chile`,
    date: `6/10/2025`,
    location: `El monumental`,
    attendees: 9999,
    category: 'sports'
  },
  {
    title: `Expo Tecnica 2 de munro`,
    date: `21/11/2030`,
    location: `Sgto Cabral 1355`,
    attendees: 5,
    category: 'tech'
  },
  {
    title: `Inaguracion Mac Donalds`,
    date: `45/2/2026`,
    location: `~ ~ ~`,
    attendees: 20,
    category: 'food'
  }
]
  return (
    <div className='centrar'>
      <div className='evento'>
        <h1>{mostrarEventos(objetoEvento[0])}</h1>
      </div>

      <div className='evento'>
        <h1>{mostrarEventos(objetoEvento[1])}</h1>
      </div>

      <div className='evento'>
        <h1>{mostrarEventos(objetoEvento[2])}</h1>
      </div>

      <div className='evento'>
        <h1>{mostrarEventos(objetoEvento[3])}</h1>
      </div>
    </div>
  )
}

export default App
