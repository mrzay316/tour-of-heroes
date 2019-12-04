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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MyHero from './MyHero';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
        maxWidth: 360,
        padding: '25px',
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        paddingBottom: '10px'
    },
    heroList: {
        maxHeight: 340, 
        overflow: 'auto',
        margin: '20px'
    },
    button: {
        margin: '5px'
    }
}));


export default function HeroesList(props) {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [selectedHero, setSelectedHero] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [heroToDelete, setHeroToDelete] = useState({});

    const handleListItemClick = (event, heroID) => {
        setSelectedHero(heroID);
    };

    const openConfirmationDialog = (hero) => {
        setDeleteDialog(true);
        setHeroToDelete(hero);
    };

    const handleCancel = () => {
        setDeleteDialog(false);
        setHeroToDelete({});
    };
    const handleDelete = () => {
        setDeleteDialog(false);
        props.onClickDeleteHero(heroToDelete.id);
        setHeroToDelete({});
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

    const getSelectedHero = () => {
        let hero = {};
        if (selectedHero) {
            let heroArr = props.heroes.filter(
                (hero) => {
                    return hero.id === selectedHero;
                });
            if (typeof heroArr[0] !== 'undefined') {
                return heroArr[0];
            } else {
                return hero;
            }
        } else {
            return hero;
        }
    }

    let filteredHeroes = props.heroes.filter(
        (hero) => {
            return hero.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
    return (
        <Paper className={classes.root}>
            <Typography className={classes.title} variant="h3">
                My Heroes
            </Typography>
            <MyHero hero = { getSelectedHero() } />
            <TextField
                id="hero-filter"
                label="Search for heroes"
                variant="outlined"
                onChange={(event) => { setSearch(event.target.value) }}
            />
            <List className={classes.heroList}>
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
                            <IconButton onClick={ () => {openConfirmationDialog(hero)} } edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
            {displayViewDetailsButton()}
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={deleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to delete this hero?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleCancel } color="primary" autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={ handleDelete } color="secondary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Button
                className= {classes.button}
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