import React from 'react';

function LoginForm({setUsername, setPassword, setRepeatedPassword, submit, isLoggingIn, signUp, errorMessage}) {  
    const updateUsername = (e) => {
        setUsername(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    const updateRepeatedPassword = (e) => {
        setRepeatedPassword(e.target.value);
    }

    return (
        <div className="login-sign-up-container">
            <div className="login" style={{display: isLoggingIn ? "flex" : 'none' }}>
                <p className="login-title">Login</p>
                
                <form onSubmit={submit}>                    
                    <input type="text" onChange={updateUsername} placeholder="Username"/>
            
                    <input type="password" onChange={updatePassword} placeholder="password"/>

                    <button className="submit">Login</button>
                </form>

                <p className="no-account" onClick={signUp}>Don't have an account?</p>

                <p className="error-message">{errorMessage}</p>
            </div>
    
            <div className="sign-up" style={{display: !isLoggingIn ? "flex" : 'none' }}>
                <p className="sign-up-title">Sign Up</p>

                <form onSubmit={submit}>
                    <input type="text" onChange={updateUsername} placeholder="Username"/>
        
                    <input type="password" onChange={updatePassword} placeholder="password"/>
        
                    <input type="password" onChange={updateRepeatedPassword} placeholder="repeat password"/>

                    <button className="submit" onClick={submit}>Sign up</button>
                </form>

                <p className="error-message">{errorMessage}</p>
            </div>
        </div>
    );
}

export default LoginForm;