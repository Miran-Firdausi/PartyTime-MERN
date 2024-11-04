import React from 'react';
import Link from 'next/link';
import styles from '@/styles/login.module.css'; // Import CSS module for styling

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      {/* Seller Hero Section */}
      <div className={`${styles.hero} ${styles.sellerHero}`}>
        <div className={styles.heroContent}>
          <h2>Become a Seller on</h2>
          <h1>PartyTime</h1>
          <p className={styles.attractiveQuote}>"Unlock Your Potential with PartyTime"</p>
          <Link href="/login/seller/registration" passHref>
            <button className={styles.startSellingButton}>Start Selling</button>
          </Link>
          <Link href="/login/seller/login" passHref>
            <button className={styles.loginButton}>Login</button>
          </Link>
          <p className={styles.termsAndConditions}>* Terms & Conditions Apply</p>
        </div>
      </div>
      
      {/* Customer Hero Section */}
      <div className={`${styles.hero} ${styles.customerHero}`}>
        <div className={styles.heroContent}>
          <h2>Discover Your Perfect Party Experience</h2>
          <p className={styles.provokingMessage}>"Discover unique products and exclusive deals only on PartyTime!"</p>
          <Link href="/login/customer/registration" passHref>
            <button className={styles.registerButton}>Register</button>
          </Link>
          <Link href="/login/customer/login" passHref>
            <button className={styles.loginButton}>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
