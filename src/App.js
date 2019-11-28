import React, { Component } from 'react';
import HeroesList from './components/HeroesList';
import Dashboard from './components/Dashboard';
import HeroDetail from './components/HeroDetail';
import { createStore} from 'redux';
import './App.css';


const store = createStore(() => {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const actionCreator = value => ({type:'addSomething', value:'something'})

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      activeComponent: 'dashboard'
    };
  }

  handleDashboardClick = () => {
    let activeComponent = this.state.activeComponent;
    if(activeComponent !== 'dashboard'){
      this.setState({
        activeComponent: 'dashboard'
      });
    }
  };

  handleHeroesListClick = () => {
    let activeComponent = this.state.activeComponent;
    if(activeComponent !== 'heroeslist'){
      this.setState({
        activeComponent: 'heroeslist'
      });
    }
  }

  render(){
    let activeComponent = this.state.activeComponent;
    let hero = {id:1, name:'Davisan'};
    return (
      <div className  ="App">
        <h1> Tour of heroes </h1>
        <button className="btn" onClick={ this.handleDashboardClick }> Dashboard </button>
        <button className="btn" onClick={ this.handleHeroesListClick }> Heroes </button>
        <div className="container">
          {activeComponent === 'dashboard'?(
            <Dashboard />
          ) : activeComponent === 'heroeslist'?(
            <HeroesList />
          ) : null}

          <HeroDetail hero={hero} />
        </div>
      </div>
    );
  }
 
}

export default App;
