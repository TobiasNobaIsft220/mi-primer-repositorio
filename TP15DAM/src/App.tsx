import './App.css';
import { FormularioInscripcion } from './FormularioInscripcion';

function App() {

  document.title = 'Sistema de inscripcion';

  return (
    <div>

      <div className='contenedor'>
        {FormularioInscripcion()}
      </div>

    </div>
  )
}

export default App
