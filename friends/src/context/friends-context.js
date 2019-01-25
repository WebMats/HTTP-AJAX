import React from 'react';

export default React.createContext({
    friends: [],
    toUpdateId: null,
    detailsId: null,
    initUpdateHandler: (id) => {},
    expandDetailsHandler: (id) => {},
    deleteFriendHandler: (id) => {},
})