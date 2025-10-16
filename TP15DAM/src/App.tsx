//import { useState } from 'react'
import './App.css';
import { FormularioInscripcion } from './FormularioInscripcion';

function App() {

  //document.title = 'Inscripcion beygoma';

  return (
    <div>
      <div className='titulo'>
        <h1>Inscripcion a la academia beygoma</h1>
      </div>

      <div>
        {FormularioInscripcion()}
      </div>

    </div>
  )
}

export default App
