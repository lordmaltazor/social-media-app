import React, { useState, useRef } from 'react';
import firebase from 'firebase';

function LoginForm({usersRef, username, password, repeatedPassword, setUsername, setPassword, setRepeatedPassword, getUser, userExists, isLoggingIn, setIsLoggingIn, setHasLoggedIn}) {    
    const [errorMessage, setErrorMessage] = useState('');

    const inputFieldRefs = useRef([]);    

    const updateUsername = (e) => {
        setUsername(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    const updateRepeatedPassword = (e) => {
        setRepeatedPassword(e.target.value);
    }

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

                resetStates();

                setIsLoggingIn(true);
            }
        }
    }

    const resetStates = () => {
        setErrorMessage("");

        setUsername('');
        setPassword('');
        setRepeatedPassword('');

        inputFieldRefs.current.forEach(element => {
            element.value = '';
        });
    }

    const login = () => {
        setIsLoggingIn(true);

        resetStates();
    }

    const signUp = () => {
        setIsLoggingIn(false);

        resetStates();
    }
  
    const addUserToDatabase = async() => {
      await usersRef.add({
          username: username,
          password: password,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
    }

    const addInputField = (element) => {
        if (element && !inputFieldRefs.current.includes(element))
        {
            inputFieldRefs.current.push(element);
        }
    }

    return (
        <div className="login-sign-up-container">
            <div className="login" style={{display: isLoggingIn ? "flex" : 'none' }}>
                <p className="login-title">Login</p>
                
                <form onSubmit={submit}>                    
                    <input type="text" onChange={updateUsername} placeholder="Username" ref={addInputField}/>
            
                    <input type="password" onChange={updatePassword} placeholder="password" ref={addInputField}/>

                    <button className="submit">Login</button>
                </form>

                <p className="start-sign-up" onClick={signUp}>Don't have an account?</p>

                <p className="error-message">{errorMessage}</p>
            </div>
    
            <div className="sign-up" style={{display: !isLoggingIn ? "flex" : 'none' }}>
                <p className="sign-up-title">Sign Up</p>

                <form onSubmit={submit}>
                    <input type="text" onChange={updateUsername} placeholder="Username" ref={addInputField}/>
        
                    <input type="password" onChange={updatePassword} placeholder="password" ref={addInputField}/>
        
                    <input type="password" onChange={updateRepeatedPassword} placeholder="repeat password" ref={addInputField}/>

                    <button className="submit" onClick={submit}>Sign up</button>
                </form>

                <p className="start-login" onClick={login}>Login</p>

                <p className="error-message">{errorMessage}</p>
            </div>
        </div>
    );
}

export default LoginForm;