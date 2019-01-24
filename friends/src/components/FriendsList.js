import React from 'react';
import './FriendList.css';

const friendsList = (props) => (
            <div className="FriendsListWrapper">
                <h2>Friends</h2>
                {props.friends.map(friend => (
            <div className={props.showDetails === friend.id ? "FriendWrapper ShowDetails" : "FriendWrapper"} key={friend.id}>
                <p className="Friend" onClick={() => props.expandDetails(friend.id)}
                >{friend.name} </p>
                    <span onClick={() => props.deleteFriend(friend.id)} className="DeleteFriendButton"
                    >X</span>
                    <span onClick={() => props.initUpdate(friend.id)} className={props.updateId === friend.id ? "CancelPickButton" :"PickFriendToUpdateButton"}
                    >{props.updateId === friend.id ? "Cancel" : "Update"}</span>
                <p className="FurtherDetail">Age: {friend.age}</p>
                <p className="FurtherDetail">Email: {friend.email}</p>
            </div>
                                            )
                                    )}
                {props.updateId === null ? <button type="button" onClick={() => props.history.push("/new-friend")} className="AddButton">Add New Friend</button> : 
            <button type="button" onClick={() => props.history.push("/update-friend")} className="AddButton">Update Friend</button>}
            </div>
        );

export default friendsList;