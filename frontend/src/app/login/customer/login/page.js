'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/login/customerL.module.css';
import { useCart } from '@/contextapi/CartContext';


const CustomerLogin = () => {
  const router = useRouter();
  const { dispatch: cartDispatch } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loginMessage, setLoginMessage] = useState(''); // State variable to track login message

  const fetchCartFromBackend = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('http://127.0.0.1:8000/cart/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }
      const data = await response.json();
      const formattedCart = data.items_in_cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        originalPrice: item.product.originalPrice,
        discountedPrice: item.product_seller.discountedPrice,
        product_image: item.product.product_image,
        weight: item.product.weight,
        quantity: item.product_quantity,
        product_seller: item.product_seller.id
      }));
      // Update cart context with fetched cart data
      cartDispatch({ type: 'SET_CART', payload: formattedCart });
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

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

      // Check the response for the 'refresh' key
      if ('refresh' in data) {
        // Assuming successful login, store tokens in local storage
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);

        // Set login message
        console.log("Login successful!");
        setLoginMessage('Login successful!');
        fetchCartFromBackend();

        // Show "Redirecting to Store...." after 2 seconds
        setTimeout(() => {
          setLoginMessage('Redirecting to Store....');
        }, 2000);

        // Redirect to the store page after 4 seconds
        setTimeout(() => {
          router.push('/store');
        }, 4000);

        
      } else {
        // If 'refresh' key not in response, show the detail message from the response
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

export default CustomerLogin;

