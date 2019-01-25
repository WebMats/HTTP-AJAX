import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import FriendsList from './components/FriendsList';
import FriendForm from './components/FriendForm';
import axios from './axios-friends';
import FriendsContext from './context//friends-context';

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

  initUpdateHandler = (id) => {
    this.setState(prevState => {
      if(prevState.toUpdateId === id) {
        return {toUpdateId: null}
      }
      return {toUpdateId: id}
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
  
  deleteFriendHandler = (id) => {
    axios.delete(`/${id}`).then(res => {
      this.setState({friends: res.data, toUpdateId: null})
    }).catch(err => {
      console.log(err)
    });
  }

  render() {
    return (
      <div className="App">
        <FriendsContext.Provider value={{friends: this.state.friends, updateId: this.state.toUpdateId, 
                                        detailsId: this.state.detailsId, initUpdate: this.initUpdateHandler, 
                                        expandDetails: this.expandDetailsHandler, deleteFriend: this.deleteFriendHandler}}>
          <Switch>
            <Redirect from="/" exact to="/friends" />
            <Route path="/friends" component={FriendsList} />
            <Route path={["/new-friend", "/update-friend"]} render={(props) => (<FriendForm 
                                              {...props}
                                              addFriend={(newFriendsList) => this.setState({friends: newFriendsList})}
                                              updateFriend={(newFriendsList) => this.setState({friends: newFriendsList, toUpdateId: null})}
                                            />)} />
            <Redirect to="/" />
          </Switch>
        </FriendsContext.Provider>
      </div>
    );
  }
}

export default App;
