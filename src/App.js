import React, { useState } from 'react';
import './App.css';
import { firestore } from './firebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import LoginForm from './comps/LoginForm.js';
import Homepage from './comps/Homepage';

function App() {
    const usersRef = firestore.collection('users');
    const [users] = useCollectionData(usersRef, { idField: 'id' });

    const [hasLoggedIn, setHasLoggedIn] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const getUser = (query) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === query) {
                return users[i];
            }
        }
    }

    const userExists = (query) => {
        let exists = false;

        users.map(usr => {
            if (usr.username === query) {
                exists = true;
            }
        });

        return exists;
    }

    return (
        <div className="app">
            {hasLoggedIn ? <Homepage user={getUser(username)} setHasLoggedIn={setHasLoggedIn} users={users} usersRef={usersRef} /> : <LoginForm usersRef={usersRef} username={username} password={password} repeatedPassword={repeatedPassword} setUsername={setUsername} setPassword={setPassword} setRepeatedPassword={setRepeatedPassword} getUser={getUser} userExists={userExists} setHasLoggedIn={setHasLoggedIn} />}
        </div>
    );
}

export default App;