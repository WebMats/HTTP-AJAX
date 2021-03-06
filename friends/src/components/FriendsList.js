import React from 'react';

import './FriendList.css';

const friendsList = (props) => (
            <div className="FriendsListWrapper">
                <h2>Friends</h2>
                {props.friends.map(friend => <p 
                                                className="Friend" 
                                                key={friend.id}
                                            >{friend.name} 
                                                <span
                                                    onClick={() => props.deleteFriend(friend.id)}
                                                    className="DeleteFriendButton"
                                                >X</span>
                                                <span 
                                                    onClick={() => props.initUpdate(friend.id)} 
                                                    className={props.updateId === friend.id ? "CancelPickButton" :"PickFriendToUpdateButton"}
                                                >{props.updateId === friend.id ? "Cancel" : "Update"}
                                                </span>
                                            </p>)}
            </div>
        )

export default friendsList;