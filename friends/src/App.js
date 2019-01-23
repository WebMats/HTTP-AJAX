import React, { Component } from 'react';
import './App.css';
import FriendsList from './components/FriendsList';
import FriendForm from './components/FriendForm';
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
  addFriendToList = (newFriendsList) => {
    this.setState({friends: newFriendsList});
  }

  render() {
    return (
      <div className="App">
        {this.state.friends.length > 0 ? <FriendsList friends={this.state.friends} /> : <p>Loading...</p>}
        <FriendForm addFriend={this.addFriendToList} />
      </div>
    );
  }
}

export default App;
