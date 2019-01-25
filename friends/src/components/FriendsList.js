import React from 'react';
import './FriendList.css';
import FriendsContext from '../context/friends-context';

const friendsList = ({history}) => (
    <FriendsContext.Consumer>
        {(context) => {
            const navToNewFriend = () => history.push("/new-friend");
            const navToUpdateFriend = () => history.push("/update-friend");
            return (
                <div className="FriendsListWrapper">
                    <h2>Friends</h2>
                    {context.friends.map(friend => {
                        const isDetailsId = context.detailsId === friend.id;
                        const isUpdateId = context.updateId === friend.id;
                        return (
                        <div className={isDetailsId ? "FriendWrapper ShowDetails" : "FriendWrapper"} key={friend.id}>
                            <p className="Friend" onClick={() => context.expandDetails(friend.id)}>{friend.name} </p>
                            <span onClick={() => context.deleteFriend(friend.id)} className="DeleteFriendButton">X</span>
                            <span 
                                onClick={() => context.initUpdate(friend.id)} 
                                className={isUpdateId ? "CancelPickButton":"PickFriendToUpdateButton"}
                            >     
                                {isUpdateId ? "Cancel" : "Update"}
                            </span>
                            <p className="FurtherDetail">Age: {friend.age}</p>
                            <p className="FurtherDetail">Email: {friend.email}</p>
                        </div>
                    )})}
                    {context.updateId === null ? 
                    <button type="button" onClick={navToNewFriend} className="AddButton">Add New Friend</button> : 
                    <button type="button" onClick={navToUpdateFriend} className="AddButton">Update Friend</button>}
                </div>
            )
        }}
    </FriendsContext.Consumer>
    );

export default friendsList;