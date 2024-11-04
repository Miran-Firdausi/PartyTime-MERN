'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/login/customerL.module.css';

const SellerLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loginMessage, setLoginMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if ('refresh' in data) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        console.log("Login successful!");
        setLoginMessage('Login successful!');
        setTimeout(() => {
          setLoginMessage('Redirecting to Dashboard....');
        }, 2000);
        // Redirect to the seller dashboard after successful login
        setTimeout(() => {
          router.push('http://127.0.0.1:8000/admin/store/productseller/add/');
        }, 4000);
      } else {
        setLoginMessage(data.detail);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password:</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className={styles.btnLogin}>Login</button>
        </form>
        {loginMessage && <p className={styles.successMessage}>{loginMessage}</p>}
      </div>
    </div>
  );
};

export default SellerLogin;
