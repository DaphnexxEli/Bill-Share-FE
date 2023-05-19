import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase configuration
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = () => {
    firebase.auth().createUserWithUsernameAndPassword(username, password)
      .then((userCredential) => {
        // User signed up successfully
        const user = userCredential.user;
        console.log('Sign up successful', user);
      })
      .catch((error) => {
        // Handle sign up error
        console.log('Sign up error', error);
      });
  };

  const handleSignIn = () => {
    firebase.auth().signInWithUsernameAndPassword(username, password)
      .then((userCredential) => {
        // User signed in successfully
        const user = userCredential.user;
        console.log('Sign in successful', user);
      })
      .catch((error) => {
        // Handle sign in error
        console.log('Sign in error', error);
      });
  };

  return (
    <div>
      <h1>React Authentication</h1>
      <input
        type="username"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default App;
