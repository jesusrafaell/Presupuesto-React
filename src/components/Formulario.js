import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';
import shortid from 'shortid';

const Formulario = ({saveGasto, saveCreateGasto}) => {
    
    const [name, saveName] = useState('');
    const [cantidad, saveCantidad] = useState(0);
    const [error, saveError] = useState(false);

    //Cuando el usuario agrega un gasto
    const addGasto = e => {
        e.preventDefault();

        //validar gasto
        if(cantidad < 1 || isNaN(cantidad) || name.trim() === '') {
            saveError(true);
            return; 
        }

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
                <label>Cantidad Gasti</label>
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