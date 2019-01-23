import React, { Component } from 'react';
import './App.css';
import FriendsList from './components/FriendsList';
import axios from 'axios';

class App extends Component {
  state = {
    friends: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/friends').then(res => {
      this.setState({friends: res.data})
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.friends.length > 0 ? <FriendsList friends={this.state.friends} /> : <p>Loading...</p>}
      </div>
    );
  }
}

export default App;
