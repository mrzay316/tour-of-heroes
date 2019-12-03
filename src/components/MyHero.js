import React from 'react';
import { AiFillThunderbolt } from 'react-icons/ai';
import PropTypes from 'prop-types';


//Componente funcional para items de la lista de HeroesList
const MyHero = ({heroName}) => (
    
    <h2><AiFillThunderbolt /> { heroName } </h2>
);

MyHero.propTypes = {
    heroName: PropTypes.string.isRequired
}

export default MyHero;



