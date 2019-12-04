import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
        width: '95%',
        padding: '15px',
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        paddingBottom: '10px'
    },
    card: {
        '&:hover':{
            background: '#e0e0e0',
        }
    },
    cardTitle: {
        fontSize: 14,
    },
}));


export default function Dashboard(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h4"  >
                Favorite Heroes
            </Typography>
            <Grid container spacing={2}>
            {props.heroes.map(hero => {
                return (
                    <Grid item xs={3} key={hero.id}>
                        <Card className={classes.card}>
                            <CardContent 
                                onClick={() => { props.onClickHero(hero.id) }}
                            >
                                <Typography variant="h5" component="h2">
                                    {hero.name} 
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {hero.superpower} 
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )})
            }
            </Grid>   
        </div>
    )
}

Dashboard.propTypes = {
    heroes: PropTypes.array.isRequired,
    onClickHero: PropTypes.func.isRequired
}