import React, { useState } from 'react';
import './App.css';
import firebase from 'firebase';
import {firestore} from './firebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import LoginForm from './comps/LoginForm.js';
import Homepage from './comps/Homepage';

function App() {  
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const usersRef = firestore.collection('users');    
  const [users] = useCollectionData(usersRef);
  
  const submit = (e) => {
    e.preventDefault();

    if (username === '')
    {
      setErrorMessage("You have to enter a username!");

      return;
    }
    else if (password === '')
    {
      setErrorMessage("You have to enter a password!");

      return;
    }

    if (isLoggingIn)
    {
      if (!userExists(username))
      {
        setErrorMessage("Couln't find a user with that username!");

        return;
      }
      else if (userExists(username) && getUser(username).password !== password)
      {
        setErrorMessage("Password is incorrect!");

        return;
      }
      else
      {
        setHasLoggedIn(true);
      }
    }
    else if (!isLoggingIn)
    {
      if (repeatedPassword === '')
      {
        setErrorMessage("You have to confirm your password!");

        return;
      }
      else if (repeatedPassword !== password)
      {
        setErrorMessage("Your confirmed password and password doesn't match!");

        return;
      }
      else if (userExists(username))
      {
        setErrorMessage("That username is taken!");

        return;
      }
      else
      {
        addUserToDatabase();

        reset();

        setIsLoggingIn(true);
      }
    }
  }

  const reset = () => {
    setErrorMessage("");

    setUsername('');
    setPassword('');
    setRepeatedPassword('');
  }

  const signUp = () => {
    setIsLoggingIn(false);

    reset();
  }

  const getUser = (query) => {
    for (let i = 0; i < users.length; i++)
    {
      if (users[i].username === query)
      {
        return users[i];
      }
    }
  }

  const userExists = (query) => {
    let exists = false;
    
    users.map(usr => {
      if (usr.username === query)
      {
        exists = true;
      }
    });

    return exists;
  }

  const addUserToDatabase = async() => {
    await usersRef.add({
        username: username,
        password: password,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  return (
    <div className="app">
      {hasLoggedIn ? <Homepage username={username} setHasLoggedIn={setHasLoggedIn}/> : <LoginForm setUsername={setUsername} setPassword={setPassword} setRepeatedPassword={setRepeatedPassword} submit={submit} isLoggingIn={isLoggingIn} signUp={signUp} errorMessage={errorMessage}/>}
    </div>
  );
}

export default App;