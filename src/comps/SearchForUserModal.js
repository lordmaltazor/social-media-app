import React, { useState } from 'react';
import firebase from 'firebase';
import UserSearchBar from './UserSearchBar';

function SearchForUserModal({ user, users, friends, friendsRef, setAddingFriend }) {
    const [userSearch, setUserSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [foundUser, setFoundUser] = useState(null);

    const hasAddedUser = (targetUser) => {
        let hasAddedUser = false;

        for (let i = 0; i < friends.length; i++) {
            if (friends[i].username === targetUser.username) {
                hasAddedUser = true;
            }
        }

        return hasAddedUser;
    }

    const search = (e) => {
        e.preventDefault();

        if (userSearch === '') {
            return;
        }

        setSearchQuery(userSearch);

        let didFindUser = false;

        if (userSearch !== user.username) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].username === userSearch) {
                    setFoundUser(users[i]);

                    didFindUser = true;
                }
            }
        }

        if (didFindUser === false) {
            setFoundUser(null);
        }
    }

    const addFriend = () => {
        friendsRef.doc(foundUser.id).set({
            username: foundUser.username,
            password: foundUser.password,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    }

    const unFriend = () => {
        friendsRef.doc(foundUser.id).delete();
    }

    return (
        <div className="backdrop">
            <div className="search-for-user-modal">
                <button className="close" onClick={() => setAddingFriend(false)}><i className="fas fa-times"></i></button>

                <UserSearchBar search={search} setUserSearch={setUserSearch} />

                {foundUser ? <div className="found-user">
                    <p className="found-user-name">{foundUser.username}</p>

                    {!hasAddedUser(foundUser) ? <button className="add-as-friend-button" onClick={addFriend}>Add as Friend</button>
                        : <button className="unfriend-button" onClick={unFriend}>Unfriend</button>}
                </div> : searchQuery !== '' && <p className="no-users-found">Sorry, didn't find any user with the name '{searchQuery}'</p>}
            </div>
        </div>
    )
}

export default SearchForUserModal;
