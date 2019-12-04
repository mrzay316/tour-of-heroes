import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    subtitle: {
        paddingBottom: '10px'
    }
}));

//Componente funcional para items de la lista de HeroesList
export default function MyHero (props) {
    const classes = useStyles();

    const isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };

    let message = '';
    if(!isEmpty(props.hero)){
        message = 'My hero is ' + props.hero.name + '!';
    }else{
        message = 'Select a hero';
    }

    return (
        <Typography className={classes.subtitle} variant="h5">
            { message }
        </Typography>
    )
}

MyHero.propTypes = {
    heroName: PropTypes.object
}




