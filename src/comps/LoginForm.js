import React, { useState, useRef } from 'react';
import firebase from 'firebase';

function LoginForm({ usersRef, username, password, repeatedPassword, setUsername, setPassword, setRepeatedPassword, getUser, userExists, setHasLoggedIn }) {
    const [isLoggingIn, setIsLoggingIn] = useState(true); // If false the user is signing in to their existing account
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

        if (username === '') {
            setErrorMessage("You have to enter a username!");

            return;
        }
        else if (password === '') {
            setErrorMessage("You have to enter a password!");

            return;
        }

        if (isLoggingIn) {
            if (!userExists(username)) {
                setErrorMessage("Couldn't find a user with that username!");

                return;
            }
            else if (userExists(username) && getUser(username).password !== password) {
                setErrorMessage("Password is incorrect!");

                return;
            }
            else {
                setHasLoggedIn(true);
            }
        }
        else {
            if (repeatedPassword === '') {
                setErrorMessage("You have to confirm your password!");

                return;
            }
            else if (repeatedPassword !== password) {
                setErrorMessage("Your confirmed password and password doesn't match!");

                return;
            }
            else if (userExists(username)) {
                setErrorMessage("That username is taken!");

                return;
            }
            else {
                addUserToDatabase();

                setIsLoggingIn(true);

                setErrorMessage("");
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

    const addUserToDatabase = async () => {
        await usersRef.add({
            username: username,
            password: password,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    const addInputField = (element) => {
        if (element && !inputFieldRefs.current.includes(element)) {
            inputFieldRefs.current.push(element);
        }
    }

    return (
        <div className="login-container">
            {isLoggingIn ?
                <p className="login-title">Login</p> :
                <p className="login-title">Sign Up</p>
            }

            <form onSubmit={submit}>
                <input className="login-input" type="text" onChange={updateUsername} placeholder="Username" ref={addInputField} />

                <input className="login-input" type="password" onChange={updatePassword} placeholder="Password" ref={addInputField} />

                {!isLoggingIn && <input className="login-input" type="password" onChange={updateRepeatedPassword} placeholder="Repeated Password" ref={addInputField} />}

                {isLoggingIn ?
                    <button className="login-submit">Login</button> :
                    <button className="login-submit">Sign Up</button>
                }
            </form>

            {isLoggingIn ? <p className="change-page" onClick={signUp}>Don't have an account?</p> : <p className="change-page" onClick={login}>Login</p>}

            <p className="error-message">{errorMessage}</p>
        </div>
    );
}

export default LoginForm;