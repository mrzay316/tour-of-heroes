import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveHero, deleteHero, setComponents } from '../actions';
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
            editHero: { id: '', name: '', superpower: '', isFavorite: '' },
        };

        this.handleViewDetailsClick = this.handleViewDetailsClick.bind(this);
        this.handleDashboardHeroClick = this.handleDashboardHeroClick.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    //Muestra el componente Dashboard
    handleDashboardButtonClick = () => {
        let activeComponent = this.props.activeComponent;
        if (activeComponent !== 'dashboard') {
            this.props.setComponents({activeComponent:'dashboard',callingComponent:''});
        }
    };

    //Muestra el componente HeroesList
    handleHeroesListButtonClick = () => {
        let activeComponent = this.props.activeComponent;
        if (activeComponent !== 'heroes-list') {
            this.props.setComponents({activeComponent:'heroes-list',callingComponent:''});
        }
    }

    //Función que se envía al componente hijo Dashboard para que cuando se de click
    //sobre un heroe, se abra el componente de edición HeroDetail
    handleDashboardHeroClick = (heroId) => {
        let hero = this.props.heroesList.filter(hero => {
            return  hero.id === heroId;
        });
        this.props.setComponents({activeComponent:'hero-detail',callingComponent:'dashboard'});
        this.setState({
            editHero: hero[0],
        });
    }

    //Función que se envía al componente hijo HeroList para que cuando se seleccione un heroe
    //y se de click al boton Ver detalles, se abra el componente de edición HeroDetail
    handleViewDetailsClick = (heroId) => {
        let hero = this.props.heroesList.filter(hero => {
            return hero.id === heroId;
        })
        this.props.setComponents({activeComponent:'hero-detail',callingComponent:'heroes-list'});
        this.setState({
            editHero: hero[0],
        });
    }

    //Función que abre el componente HeroDetail para crear un heroe nuevo
    handleSaveHeroClick = () => {
        this.props.setComponents({activeComponent:'hero-detail',callingComponent:'heroes-list'});
        this.setState({
            editHero: { id: this.props.heroSequence, name: '', superpower: '', isFavorite: '' }
        });
        
    }

    //Función que se envía al componente hijo HeroDetail. El boton de atrás permite volver 
    // al componente desde el que se llamó (Dashboard o HeroList)
    handleBackButtonClick = () => {
        let activeComponent = this.props.callingComponent;
        this.props.setComponents({activeComponent: activeComponent, callingComponent:''});
        this.setState({
            editHero: { id: '', name: '', superpower: '', isFavorite: '' },
        })
    }

    render() {
        let activeComponent = this.props.activeComponent;
        let editHero = this.state.editHero;
        //Se construye la lista de heroes favoritos que se muestra en Dashboard
        let favoriteHeroes = this.props.heroesList.filter(hero => {
            return hero.isFavorite;
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
    deleteHero: payload => dispatch(deleteHero(payload)),
    setComponents: payload => dispatch(setComponents(payload))
});

const mapStateToProps = ({ 
    heroesList, 
    heroSequence, 
    callingComponent, 
    activeComponent }) => ({ 
        heroesList, 
        heroSequence, 
        callingComponent,
        activeComponent });

export default connect(mapStateToProps, mapDispatchToPropsActions)(TourOfHeroesContainer);