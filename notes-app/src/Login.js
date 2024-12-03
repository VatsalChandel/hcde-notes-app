import React, { useState } from 'react';
import './LoginSignup.css'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully!");
      navigate('/'); // Take the user to the notes page 

    } catch (err) {
      window.alert("Email or Password is incorrect!")
      console.error("Login error:", err.message); //Usually because user typed email/password wrong
    }
  };

  return (

    <div className="auth-container">
      <h1>Log in</h1>

      <form onSubmit={handleLogin}>

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Log in</button>
      </form>

      {error && <p className="error">{error}</p>}

      <p>
        New user? <a href="/signup">Sign up here</a> 
      </p>
    </div>
  );
};

export default Login;
