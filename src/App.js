import React, { useState, useEffect } from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';


function App() {

  //def state
  const [ presupuesto, savePresupuesto] = useState(0);
  const [ restante, saveRestante] = useState(0);
  const [ showpregunt, updateShowPregunt] = useState(true);
  const [ gastos, saveGastos] = useState([]);
  const [ gasto, saveGasto] = useState({});
  const [ createGasto, saveCreateGasto] = useState (false);

  //UseEffect actualiza el restante
  useEffect(() => {
    if(createGasto) {

      //add new presupuesto
      saveGastos([
        ...gastos,
        gasto
      ])
    } 
   
    //Left presupuesto actual
    const presupuestoRestante = restante - gasto.cantidad;
    saveRestante(presupuestoRestante);

    //Resetear a false
    saveCreateGasto(false);
  }, [gasto, createGasto, gastos, restante]);


  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>
        <div className="contenido-principal contenido">
            {showpregunt ? (
              <Pregunta 
                savePresupuesto={savePresupuesto}
                saveRestante={saveRestante} 
                updateShowPregunt={updateShowPregunt}
             />
            ) : (
              <div className="row">
              <div className="one-half column">
                <Formulario 
                  saveGasto={saveGasto}
                  saveCreateGasto={saveCreateGasto}
                />
              </div>

              <div className="one-half column">
                <Listado
                  gastos={gastos}
                />
                <ControlPresupuesto
                  presupuesto={presupuesto}
                  restante={restante}
                />
              </div>
            </div>

            )}
            
        </div>
      </header>
    </div>
  );
}

export default App;
