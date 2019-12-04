import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import SaveIcon from '@material-ui/icons/Save';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
        width: '95%',
        padding: '15px',
        backgroundColor: theme.palette.background.paper,
    }
}));


export default function HeroDetail(props) {
    const classes = useStyles();
    const [heroDetail, setHeroDetail] = useState(props.heroEdit);

    const handleChangeName = (event) => {
        let hero = { ...heroDetail};
        hero.name = event.target.value;
        setHeroDetail(hero)
    };

    const handleChangeSuperpower = (event) => {
        let hero = { ...heroDetail};;
        hero.superpower = event.target.value;
        setHeroDetail(hero)
    }
    const handleChangeIsFavorite = (event) => {
        let hero = { ...heroDetail};;
        hero.isFavorite = !hero.isFavorite;
        setHeroDetail(hero)
    }

    return (
        <div className="hero-details">
            <h2> {heroDetail.name} details! </h2>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        InputProps={{ readOnly: true, }}
                        id="hero-id"
                        label="ID"
                        value={heroDetail.id}
                    />
                </div>
                <div>
                    <TextField
                        id="hero-name"
                        label="Name"
                        value={heroDetail.name}
                        onChange={handleChangeName}
                    />
                </div>
                <div>
                    <TextField
                        id="hero-superpower"
                        label="Superpower"
                        value={heroDetail.superpower}
                        onChange={handleChangeSuperpower}
                    />
                </div>
                <div>
                    <FormControlLabel
                        control={<Checkbox icon={ heroDetail.isFavorite?<Star color="secondary"/>:<StarBorder color="secondary"/>} 
                        checkedIcon={heroDetail.isFavorite?<Star color="secondary"/>:<StarBorder color="secondary"/>} 
                        value={heroDetail.isFavorite} />}
                        label="Favorite"
                        onChange={handleChangeIsFavorite}
                    />
                </div>
            </form>
            <Button
                variant="contained"
                color="primary"
                onClick={() => props.onBackButton()}
            > Back </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => props.onClickSaveHero(heroDetail)}
                startIcon={<SaveIcon />}
            > Save </Button>
        </div>
    )
}

HeroDetail.propTypes = {
    heroEdit: PropTypes.object.isRequired,
    onBackButton: PropTypes.func,
    onClickSavehero: PropTypes.func
    
}