import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import FriendsList from './components/FriendsList';
import FriendForm from './components/FriendForm';
import axios from './axios-friends';

class App extends Component {
  state = {
    friends: [],
    toUpdateId: null,
    detailsId: null
  }

  componentDidMount() {
    axios.get('').then(res => {
      this.setState({friends: res.data})
    }).catch(err => {
      console.log(err)
    })
  }

  initUpdateHandler = (idFriend) => {
    this.setState(prevState => {
      if(prevState.toUpdateId === idFriend) {
        return {toUpdateId: null}
      }
      return {toUpdateId: idFriend}
    })
  }
  expandDetailsHandler = (id) => {
    this.setState(prevState => {
      if(prevState.detailsId === id) {
        return {detailsId: null}
      }
      return {detailsId: id}
    })
  }
  
  deleteFriendHandler = (idFriend) => {
    axios.delete(`/${idFriend}`).then(res => {
      this.setState({friends: res.data, toUpdateId: null})
    }).catch(err => {
      console.log(err)
    });
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Redirect from="/" exact to="/friends" />
          <Route path="/friends" render={(props) => (<FriendsList
                                            {...props} 
                                            updateId={this.state.toUpdateId} 
                                            initUpdate={this.initUpdateHandler}
                                            expandDetails={this.expandDetailsHandler}
                                            showDetails={this.state.detailsId} 
                                            friends={this.state.friends}
                                            deleteFriend={this.deleteFriendHandler} 
                                          />)} />
          <Route path={["/new-friend", "/update-friend"]} render={(props) => (<FriendForm 
                                            {...props} 
                                            updateId={this.state.toUpdateId} 
                                            currentFriends={this.state.friends} 
                                            addFriend={(newFriendsList) => this.setState({friends: newFriendsList})}
                                            updateFriend={(newFriendsList) => this.setState({friends: newFriendsList, toUpdateId: null})}
                                          />)} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
