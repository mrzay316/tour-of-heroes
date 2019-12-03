import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveHero, deleteHero } from '../actions';
import HeroesList from '../components/HeroesList';
import Dashboard from '../components/Dashboard';
import HeroDetail from '../components/HeroDetail';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



//Componente contenedor que maneja los estados de Redux
//Llama a los componentes de presentación Dashboard, HeroesList y HeroDetail
class TourOfHeroesContainer extends Component {
    constructor() {
        super();
        this.state = {
            activeComponent: 'dashboard',
            editHero: { id: '', name: '', superpower: '', isFavorite: '' },
            callingComponent: ''
        };

        this.handleViewDetailsClick = this.handleViewDetailsClick.bind(this);
        this.handleDashboardHeroClick = this.handleDashboardHeroClick.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    //Muestra el componente Dashboard
    handleDashboardButtonClick = () => {
        let activeComponent = this.state.activeComponent;
        if (activeComponent !== 'dashboard') {
            this.setState({
                activeComponent: 'dashboard'
            });
        }
    };

    //Muestra el componente HeroesList
    handleHeroesListButtonClick = () => {
        let activeComponent = this.state.activeComponent;
        if (activeComponent !== 'heroes-list') {
            this.setState({
                activeComponent: 'heroes-list'
            });
        }
    }

    //Función que se envía al componente hijo Dashboard para que cuando se de click
    //sobre un heroe, se abra el componente de edición HeroDetail
    handleDashboardHeroClick = (heroId) => {
        let hero = this.props.heroesList.filter(hero => {
            if (hero.id === heroId) return hero;
        });
        this.setState({
            editHero: hero[0],
            callingComponent: 'dashboard',
            activeComponent: 'hero-detail'
        });
    }

    //Función que se envía al componente hijo HeroList para que cuando se seleccione un heroe
    //y se de click al boton Ver detalles, se abra el componente de edición HeroDetail
    handleViewDetailsClick = (heroId) => {
        let hero = this.props.heroesList.filter(hero => {
            if (hero.id === heroId) return hero;
        })
        this.setState({
            editHero: hero[0],
            callingComponent: 'heroes-list',
            activeComponent: 'hero-detail'
        });
    }

    //Función que abre el componente HeroDetail para crear un heroe nuevo
    handleSaveHeroClick = () => {
        this.setState({
            editHero: { id: this.props.heroSequence, name: '', superpower: '', isFavorite: '' },
            callingComponent: 'heroes-list',
            activeComponent: 'hero-detail'
        });
    }

    //Función que se envía al componente hijo HeroDetail. El boton de atrás permite volver 
    // al componente desde el que se llamó (Dashboard o HeroList)
    handleBackButtonClick = () => {
        let activeComponent = this.state.callingComponent;
        this.setState({
            editHero: { id: '', name: '', superpower: '', isFavorite: '' },
            callingComponent: '',
            activeComponent: activeComponent
        })
    }

    render() {
        let activeComponent = this.state.activeComponent;
        let editHero = this.state.editHero;
        //Se construye la lista de heroes favoritos que se muestra en Dashboard
        let favoriteHeroes = this.props.heroesList.filter(hero => {
            if (hero.isFavorite) {
                return hero;
            }
        })

        //Función que determina que componente se encuentra activo (Dashboard,HeroList o HeroDetail)
        const renderComponent = () => {
            if (activeComponent === 'dashboard') {
                return <Dashboard
                    onClickHero={this.handleDashboardHeroClick}
                    heroes={favoriteHeroes} />
            } else if (activeComponent === 'heroes-list') {
                return <HeroesList
                    heroes={this.props.heroesList}
                    onClickViewDetails={this.handleViewDetailsClick}
                    onClickDeleteHero={this.props.deleteHero}
                    onClickSaveHero={this.handleSaveHeroClick}
                />
            } else if (activeComponent === 'hero-detail') {
                return <HeroDetail
                    heroEdit={editHero}
                    onBackButton={this.handleBackButtonClick}
                    onClickSaveHero={this.props.saveHero} />
            }
        }

        return (
            <Paper >
                <div className="TourOfHeroesContainer">
                    <Typography variant="h2" gutterBottom >
                        Tour of heroes
                    </Typography>
                    <ButtonGroup variant="contained" fullWidth aria-label="full width outlined button group">
                        <Button color="primary" onClick={this.handleDashboardButtonClick}> Dashboard </Button>
                        <Button color="secondary" onClick={this.handleHeroesListButtonClick}> Heroes </Button>
                    </ButtonGroup>
                    {
                        renderComponent()
                    }

                </div>
            </Paper>
        );
    }
}

const mapDispatchToPropsActions = dispatch => ({
    saveHero: payload => dispatch(saveHero(payload)),
    deleteHero: payload => dispatch(deleteHero(payload))
});

const mapStateToProps = ({ heroesList, heroSequence }) => ({ heroesList, heroSequence });

export default connect(mapStateToProps, mapDispatchToPropsActions)(TourOfHeroesContainer);