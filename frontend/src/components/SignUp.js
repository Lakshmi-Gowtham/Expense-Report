// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to store error messages
  const [emailError, setEmailError] = useState(''); // State to store email format error message
  const [passwordError, setPasswordError] = useState(''); // State to store password error message
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Basic email format validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    // Validate password
    if (password.trim().length < 5) {
      setPasswordError('Password must be at least 5 characters long.');
      return;
    } else {
      setPasswordError('');
    }

    try {
      const response = await fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/signin'); // Redirect to sign-in page after successful sign-up
      } else {
        setErrorMessage(data.message || 'An error occurred.'); // Display error message
      }
    } catch (error) {
      console.error('An error occurred during sign-up:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setEmailError(''); // Clear error if email is valid
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.trim().length >= 5) {
      setPasswordError(''); // Clear error if password is valid
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && <p>{emailError}</p>} {/* Display email validation error if exists */}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && <p>{passwordError}</p>} {/* Display password validation error if exists */}
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>} {/* Display error message if exists */}
      <p>
        Already have an account? <a href="/signin">Sign In</a>
      </p>
    </div>
  );
}

export default Signup;
