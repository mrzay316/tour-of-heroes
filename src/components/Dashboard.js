import React, { Component } from 'react';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            heroes :[ 
                { id: 11, name: 'Dr Nice', isFavorite: true},
                { id: 12, name: 'Narco' , isFavorite: true},
                { id: 13, name: 'Bombasto', isFavorite: false },
                { id: 14, name: 'Celeritas', isFavorite: false },
                { id: 15, name: 'Magneta', isFavorite: true },
                { id: 16, name: 'RubberMan', isFavorite: true },
                { id: 17, name: 'Dynama', isFavorite: false },
                { id: 18, name: 'Dr IQ', isFavorite: false },
                { id: 19, name: 'Magma', isFavorite: false },
                { id: 20, name: 'Tornado', isFavorite: false }
            ]
        }
    }

    render(){
        return (
            <div className="dashboard">
                <h2>Top heroes</h2>
                {this.state.heroes.map( hero => {
                    return hero.isFavorite ?
                        <span key={hero.id}><h4> {hero.name} </h4></span> 
                    : null
                    }
                )}
            </div>
        );
    }
}

export default Dashboard;