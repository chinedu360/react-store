import React, { Component } from 'react';
import CardList from '../component/CardList';
import SearchBox from '../component/SearchBox';
import Scroll from '../component/Scroll';
import ErrorBoundry from '../component/ErrorBoundary';
import './App.css'


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: '',
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            return response.json();
        })
        .then(users => {
            this.setState({ robots: users })
        }) 
    }

    onSearchChange = (event) => {

        this.setState({ searchfield: event.target.value })

    }

    render()
        { 
        const { robots, searchfield } = this.state;

        const fiteredRobots = robots.filter(robot => {
            return robot.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase())
        }); 
        if (!robots.length) {
            return <h1 className='tc f2'>Loading</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className='f2'>ROBOFRIENDS</h1>
                    <SearchBox searchChange={ this.onSearchChange }/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={ fiteredRobots } />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }
    }  
}

export default App;