import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf';

import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => this.setState({smurfs: response.data}))
      .catch(err => console.log(err));
  }

  deleteSmurf = (e, id) => {
    e.preventDefault();

    axios.delete(`http://localhost:3333/smurfs/${id}`)
      .then(response => this.setState({smurfs: response.data}))
      .catch(err => console.log(err));

    console.log(this.state.smurfs);
  }

  render() {
    return (
      <div className="App">

        <NavLink exact to="/" activeClassName="selected" activeStyle={{
          fontWeight: "bold", color: "purple" 
        }}>Smurfs</NavLink>
        <NavLink to="/form">Add Smurfs</NavLink>

        <Route exact path="/" render={() => <Smurfs smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf}/>}/>
        <Route path="/form" render={() => <SmurfForm smurfsList={this.state.smurfs}/>} />

      {/* 
      see : https://reacttraining.com/react-router/web/api/Route/render-func

      refactoring 

      https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript

      */
     
     }

        <Route path="/smurfs/:id" render={props =>  <Smurf {...props}
          // name={this.state.smurfs.find(smurf => smurf.id == props.match.params.id)}
          // id={props.match.params.id}
          // age={this.state.smurfs.find(smurf => smurf.id == props.match.params.id)}
          // height={this.state.smurfs.find(smurf => smurf.id == props.match.params.id)}
          // key={props.match.params.id}
          // deleteSmurf={this.deleteSmurf} 
          />
        }/>
      </div>
    );
  }
}

export default App;
