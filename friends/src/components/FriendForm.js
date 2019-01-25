import React, { Component } from 'react';
import axios from '../axios-friends';
import FriendsContext from '../context/friends-context';

import './FriendForm.css';


class FriendForm extends Component {
    constructor(props) {
        super(props)
        this.nameInput = React.createRef();
        this.ageInput = React.createRef();
        this.emailInput = React.createRef();
    }

    static contextType = FriendsContext;

    addFriendHandler = (e) => {
        e.preventDefault();
        if (this.nameInput.current.value === "" || this.ageInput.current.value === "" || this.emailInput.current.value === "") {
            return;
        }
        const newFriend = {
            name: this.nameInput.current.value,
            age: this.ageInput.current.value,
            email: this.emailInput.current.value
        }
        axios.post('', newFriend).then(res => {
            this.props.addFriend(res.data)
        }).catch(err => {
            console.log(err)
        });
        this.props.history.push("/friends")
    }

    updateFriendHandler = (e) => {
        e.preventDefault();
        const fullUpdate = {
            name: this.nameInput.current.value,
            age: this.ageInput.current.value,
            email: this.emailInput.current.value
        }
        let trimmedUpdate = {};
        Object.keys(fullUpdate).forEach(key => {
            if (fullUpdate[key] !== '') {
                trimmedUpdate[key] = fullUpdate[key];
            }
        })
        axios.put(`/${this.context.updateId}`, trimmedUpdate).then(res => {
            this.props.updateFriend(res.data);
        }).catch(err => {
            console.log(err)
        });
        this.props.history.push("/friends")
    }

    render(){

        return(
            <FriendsContext.Consumer>
                {(context) => {
                    const isupdateIdSet = context.updateId !== null;
                    return (
                        <form onSubmit={isupdateIdSet ? this.updateFriendHandler : this.addFriendHandler} className="AddFriendForm" autoComplete="off">
                            <div className="Row-1">
                                <div className="Col-1-Of-2">
                                    <label htmlFor="name">Name</label>
                                    <input id="name" type="text" ref={this.nameInput} />
                                </div>
                                <div className="Col-2-Of-2"> 
                                    <label htmlFor="age">Age</label>
                                    <input id="age" type="number" ref={this.ageInput} />
                                </div>
                            </div>
                            <div className="Row-2">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" ref={this.emailInput} />
                            </div>
                            {!isupdateIdSet ? <button className="AddFriendButton">Submit</button> : <button className="UpdateFriendButton">Update</button>}
                        </form>
                    )
                }}
            </FriendsContext.Consumer>
            
        )
    }
}

export default FriendForm;