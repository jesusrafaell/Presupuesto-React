import React, { Fragment, useState } from 'react'; import Error from './Error';
import PropTypes from 'prop-types';

const Pregunta = ({savePresupuesto, saveRestante, updateShowPregunt}) => {
    
    //definir el state
    const [ cantidad, saveCantidad] = useState(0);
    const [ error, saveError] = useState(false);

    //Func lee el presupuesto
    const handlePresupuesto = e => {
        saveCantidad( parseInt(e.target.value, 10) )
    }

    //Submit para def presupuesto
    const addPresupuesto = e => {
        e.preventDefault();
        //validar
        if(cantidad < 1 || isNaN(cantidad) ) {
            saveError(true);
            return;
        }

        //si se valida
        saveError(false);
        savePresupuesto(cantidad);
        saveRestante(cantidad);
        updateShowPregunt(false);
    }

    return (
        <Fragment>
           <h2>Coloca tu presupuesto</h2> 

           {error? <Error mensaje="El presupuesto es Incorrecto" /> : null}

           <form 
                onSubmit={addPresupuesto}
           >  
               <input
                    type="number"
                    className="u-full-width"
                    placeholder="Presupuesto"
                    onChange={handlePresupuesto}
               />

               <input 
                    type="submit"
                    className="button-primary"
                    value="Definir Presupuesto"
               />
           </form>
        </Fragment>
    );

}

Pregunta.propTypes = {
    savePresupuesto: PropTypes.func.isRequired,
    saveRestante: PropTypes.func.isRequired,
    updateShowPregunt: PropTypes.func.isRequired
}

export default Pregunta;