import React, { useState } from 'react';
import './LoginSignup.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {

    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed up successfully!");
      window.alert("Signed up successfully!");
      navigate('/login');

    } catch (err) {
      console.error("Signup error:", err.message);
      if (err.message == "Firebase: Error (auth/email-already-in-use).") {
        window.alert("Email is already in use!")
      }
      if (err.message == "Firebase: Password should be at least 6 characters (auth/weak-password).") {
        window.alert("Password is too weak! Should be at least 6 characters")
      }

    }
  };

  return (

    <div className="auth-container">
      <h1>Sign up</h1>

      <form onSubmit={handleSignup}>
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
        <button type="submit">Sign up</button>
      </form>
      
      <p>
        Returning User? <a href="/login">Login here</a> 
      </p>
    </div>
  );
};

export default Signup;
