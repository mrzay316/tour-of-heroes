import React, { Component } from 'react';

class HeroDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.hero.id,
            name: this.props.hero.name
        }
    }

    handleChangeName (event) {
        this.setState({name: event.target.value})
    }

    render(){
        return (
            <div className="hero-details">
                <h2> {this.state.name} details! </h2>
                <form>
                    <label>
                        ID:
                        <input type="text" name="id" value={this.state.id} readOnly/>
                    </label>
                    <label>
                        Name:
                        <input type="text" name="id" value={this.state.name} 
                        onChange={this.handleChangeName.bind(this)} />
                    </label>
                </form>
            </div>
        );
    }
}

export default HeroDetail;