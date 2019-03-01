import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Smurf extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
    const id = this.props.match.params.id;
    console.log(id);
    this.getSmurfId(id);
  }

  getSmurfId() {
    axios.get(`http://localhost:3333/smurfs/${id}`)
      .then(response => {
        this.setState(() => ({ movie: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="Smurf">
        <Link to={`/smurfs/${this.props.match.params.id}`}><h3>{this.state.name}</h3></Link>
        <strong>{this.props.height} tall</strong>
        <p>{this.props.age} smurf years old</p>
        <button onClick={(e) => props.deleteSmurf(e, props.id)}>Delete</button>
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

