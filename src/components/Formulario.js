import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';
import shortid from 'shortid';

const Formulario = ({saveGasto, saveCreateGasto, restante}) => {
    
    const [name, saveName] = useState('');
    const [cantidad, saveCantidad] = useState(0);
    const [error, saveError] = useState(false);
    const [errorRestante, saveErrorRestante] = useState(false);

    //Cuando el usuario agrega un gasto
    const addGasto = e => {
        e.preventDefault();

        //validar gasto
        if(cantidad < 1 || isNaN(cantidad) || name.trim() === '') {
            saveError(true);
            saveErrorRestante(false);
            return; 
        }
        if(cantidad > restante){
            saveErrorRestante(true);
            saveError(false);
            return;
        }

        saveError(false);
        saveErrorRestante(false);

        //construir el gasto
        const gasto = {
            name,
            cantidad,
            id: shortid.generate()
        }

        //pasar el gasto al componente principal
        saveGasto(gasto);
        saveCreateGasto(true);

        //resetear el form
        saveName('');
        saveCantidad(0);
    }
    return (  
        <form
           onSubmit={addGasto}
        >
            <h2>Agrega tus gastos aqui</h2>
            {error ? <Error mensaje="Ambos campos son obligatorios o Presupuesto Incorrecto" /> : null}
            {errorRestante ? <Error mensaje="Se excede del presupuesto" /> : null}
            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={name}
                    onChange={e => saveName(e.target.value)}
               />
            </div>
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => saveCantidad( parseInt(e.target.value))}
               />
            </div>
            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />
        </form>
    );
}
 
Formulario.propTypes = {
    saveGasto: PropTypes.func.isRequired,
    saveCreateGasto: PropTypes.func.isRequired
}

export default Formulario;