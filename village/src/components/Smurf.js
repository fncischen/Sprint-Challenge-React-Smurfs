import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Smurf extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name,
      age: this.props.age, 
      height: this.props.height,
      id: this.props.id
    }
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
    if (this.state.id == null) {
      const id = this.props.match.params.id;
      console.log(id);
      this.getSmurfId(id);
    }
  }

  getSmurfId(id) {
      axios.get("http://localhost:3333/smurfs/",id)
      .then(response =>
      { let smurf = response.data.find(smurf => smurf.id = id)
        this.setState({name: smurf.name, age: smurf.age, height: smurf.height, id: smurf.id})
        // this.setState(() => ({ name: response.data.name, age: response.data.age, height: response.data.height, id: id }));
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="Smurf">
        <Link to={`/smurfs/${this.state.id}`}><h3>{this.state.name}</h3></Link>
        <strong>{this.state.height} tall</strong>
        <p>{this.state.age} smurf years old</p>
        <button onClick={(e) => this.props.deleteSmurf(e, this.state.id)}>Delete</button>
      </div>
    );
  }
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

export default Smurf;

