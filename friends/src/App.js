import React, { Component } from 'react';
import './App.css';
import FriendsList from './components/FriendsList';
import FriendForm from './components/FriendForm';
import axios from 'axios';

class App extends Component {
  state = {
    friends: [],
    toUpdateId: null
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

  initUpdateHandler = (idFriend) => {
    this.setState(prevState => {
      if(prevState.toUpdateId === idFriend) {
        return {toUpdateId: null}
      }
      return {toUpdateId: idFriend}
    })
  }
  updateFriendHandler = () => {

  }

  render() {
    return (
      <div className="App">
        {this.state.friends.length > 0 ? <FriendsList 
                                            updateId={this.state.toUpdateId} 
                                            initUpdate={this.initUpdateHandler} 
                                            friends={this.state.friends} 
                                          /> : <p>Loading...</p>}
        <FriendForm 
          updateId={this.state.toUpdateId} 
          currentFriends={this.state.friends} 
          addFriend={(newFriendsList) => this.setState({friends: newFriendsList})}
          updateFriend={(newFriendsList) => this.setState({friends: newFriendsList, toUpdateId: null})} 
        />
      </div>
    );
  }
}

export default App;
