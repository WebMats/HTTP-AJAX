import React from 'react';

import './FriendList.css';

const friendsList = (props) => {
        return (
            <div className="FriendsListWrapper">
                <h2>Friends</h2>
                {props.friends.map(friend => <p className="Friend" key={friend.id}>{friend.name}</p>)}
            </div>
        )
}

export default friendsList;