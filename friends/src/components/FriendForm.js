import React, { Component } from 'react';
import axios from '../axios-friends';

import './FriendForm.css';


class FriendForm extends Component {
    constructor(props) {
        super(props)
        this.nameInput = React.createRef();
        this.ageInput = React.createRef();
        this.emailInput = React.createRef();
    }

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
            this.nameInput.current.value = "";
            this.ageInput.current.value = "";
            this.emailInput.current.value = "";
        }).catch(err => {
            console.log(err)
        });
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
        axios.put(`/${this.props.updateId}`, trimmedUpdate).then(res => {
            this.props.updateFriend(res.data);
            this.nameInput.current.value = "";
            this.ageInput.current.value = "";
            this.emailInput.current.value = "";
        }).catch(err => {
            console.log(err)
        });
    }

    render(){

        return(
            <form onSubmit={this.props.updateId !== null ? this.updateFriendHandler : this.addFriendHandler} className="AddFriendForm" autoComplete="off">
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
                {this.props.updateId === null ? <button className="AddFriendButton">Submit</button> : <button className="UpdateFriendButton">Update</button>}
            </form>
        )
    }
}

export default FriendForm;