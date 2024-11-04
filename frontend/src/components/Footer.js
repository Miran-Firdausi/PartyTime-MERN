import React from 'react';
import styles from '@/styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles['footer-section']}>
          <h5>Quick Links</h5>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/store">Store</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/seller">Seller Dashboard</a></li>
          </ul>
        </div>
        <div className={styles['footer-section']}>
          <h5>Categories</h5>
          <ul>
            <li><a href="/Snacks">Snacks</a></li>
            <li><a href="/Beverages">Beverages</a></li>
            <li><a href="/Dairy">Dairy</a></li>
            <li><a href="/Bakery">Bakery</a></li>
          </ul>
        </div>
        <div className={styles['footer-section']}>
          <h5>Contact Us</h5>
          <ul>
            <li>Email: info@partytime.com</li>
            <li>Phone: +1234567890</li>
            <li>Address: Lavale, Pune</li>
          </ul>
        </div>
        <div className={styles['footer-section']}>
          <h5>Subscribe to Our Newsletter</h5>
          <p>Stay updated with our latest news and promotions.</p>
          <form className={styles['subscribe-form']}>
            <label htmlFor="newsletter" className={styles['visually-hidden']}>Email address</label>
            <input id="newsletter" type="email" placeholder="Your email address" />
            <button className={styles.subscribeButton} type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className={`${styles.container} ${styles['border-top']} py-4 my-4`}>
        <p>© {new Date().getFullYear()} Your Company, Inc. All rights reserved.</p>
        <ul className={styles['social-links']}>
          <li><a href="#"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><use xlinkHref="#twitter"/></svg></a></li>
          <li><a href="#"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><use xlinkHref="#instagram"/></svg></a></li>
          <li><a href="#"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><use xlinkHref="#facebook"/></svg></a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
