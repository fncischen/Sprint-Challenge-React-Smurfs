import React, { Component } from 'react';
import axios from 'axios';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: '',
      selected_id: '',
      updatedAge: '',
      updatedHeight: ''
    };
  }

  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    const newItem = {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height
    }

    axios.post('http://localhost:3333/smurfs', newItem)
      .then(response => console.log(response.data))
      .catch(err => console.log(err));

    this.setState({
      name: '',
      age: '',
      height: ''
    });
  }

  updateSmurf = e => {
    e.preventDefault();
    console.log(this.state.selected_id);
        axios     
        .put(`http://localhost:3333/smurfs/${this.state.selected_id}`,
        {age: this.state.updatedAge,
        height: this.state.updatedHeight})
        .then(response => {
            console.log(response.data)
         })
        .catch(err => {
            console.log(err);
        });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  render() {
    return (

      <div className="SmurfForms">

        <div className="SmurfForm">

        <h2> Add Smurf! </h2>
          <form onSubmit={this.addSmurf}>
            <input
              onChange={this.handleInputChange}
              placeholder="name"
              value={this.state.name}
              name="name"
            />
            <input
              onChange={this.handleInputChange}
              placeholder="age"
              value={this.state.age}
              name="age"
            />
            <input
              onChange={this.handleInputChange}
              placeholder="height"
              value={this.state.height}
              name="height"
            />
            <button type="submit">Add to the village</button>
          </form>
        </div>

        <div className="UpdateSmurf">

          <h2> Update Smurf! </h2>

          <form onSubmit={this.updateSmurf}>

            <select name="selected_id" onChange={this.handleInputChange}>

              {this.props.smurfsList.map(smurf => 
                  <option name="selected_id" value={smurf.id}>{smurf.name}</option>
              )}

            </select> 

            <input
              onChange={this.handleInputChange}
              placeholder="age"
              value={this.state.updatedAge}
              name="updatedAge"
            />
            <input
              onChange={this.handleInputChange}
              placeholder="height"
              value={this.state.updatedHeight}
              name="updatedHeight"
            />
            <button type="submit">Add to the village</button>
          </form>
        </div>


      </div>
    );
  }
}

export default SmurfForm;
