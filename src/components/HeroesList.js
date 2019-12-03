import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
        width: '70%',
        maxWidth: 360,
        padding: '15px',
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        paddingBottom: '10px'
    }
}));


export default function HeroesList(props) {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [selectedHero, setSelectedHero] = useState(false);

    const handleListItemClick = (event, heroID) => {
        setSelectedHero(heroID);
    };

    const displayViewDetailsButton = () => {
        if (selectedHero) {
            return <Button
                variant="contained"
                color="primary"
                onClick={() => props.onClickViewDetails(selectedHero)}
                startIcon={<EditIcon />}
            > Edit details </Button>
        }
    }

    let filteredHeroes = props.heroes.filter(
        (hero) => {
            return hero.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });


    return (
        <Paper className={classes.root}>
            <Typography className={classes.title} variant="h4">
                My Heroes
            </Typography>

            <TextField
                id="hero-filter"
                label="Search for heroes"
                variant="outlined"
                onChange={(event) => { setSearch(event.target.value) }}
            />
            <List >
                {filteredHeroes.map(hero =>
                    <ListItem
                        button
                        key={hero.id}
                        selected={selectedHero === hero.id}
                        onClick={event => handleListItemClick(event, hero.id)}
                    >
                        <ListItemText
                            primary={hero.name}
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => { props.onClickDeleteHero(hero.id) }} edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
            {displayViewDetailsButton()}
            <Button
                variant="contained"
                color="primary"
                onClick={() => props.onClickSaveHero()}
                startIcon={<AddIcon />}
            > Add hero </Button>
        </Paper>
    )
}

HeroesList.propTypes = {
    heroes: PropTypes.array.isRequired,
    onClickViewDetails: PropTypes.func
}

