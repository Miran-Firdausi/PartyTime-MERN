"use client"
import React,{ useState } from 'react';
import styles from '@/styles/AuthForm.module.css'; // Import the CSS file

function sendData(userData) {
  // Simple POST request with a JSON body using fetch
  fetch('http://127.0.0.1:8000/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Success: ',data);
    alert('Registration Success:'+ data);
    // Handle success response here, if needed
  })
  .catch(error => {
    alert("Regsitration Failed! Try Again")
    console.log('Error:'+ error);
    // Handle error here, if needed
  });
}


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Initial state is login

  const toggleAuthMode = () => {
    setIsLogin(prevState => !prevState); // Toggle between login and signup
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
      email: event.target.elements.email.value,
      first_name: event.target.elements.firstName.value,
      last_name: event.target.elements.lastName.value,
      phone: event.target.elements.phoneNumber.value,
      password: event.target.elements.password.value,
      // confirmPassword: event.target.elements.confirmPassword.value // Only available if signup mode
    };
    sendData(formData);
  };


  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handleFormSubmit}>
          <input type="text" name="email" placeholder="Email" />
          <input type="text" name="firstName" placeholder="First Name" />
          <input type="text" name="lastName" placeholder="Last Name" />
          <input type="text" name="phoneNumber" placeholder="Phone Number" />
          <input type="password" name="password" placeholder="Password" />
          {!isLogin && <input type="password" name="confirmPassword" placeholder="Confirm Password" />}
          <button type="submit" className={styles.loginButton}>{isLogin ? 'Login' : 'Signup'}</button>
        </form>
        {/* Other code remains unchanged */}
      </div>
    </div>
  );
};

export default AuthForm;
