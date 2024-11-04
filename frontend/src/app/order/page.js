'use client'
// components/Order.js
import React, { useState } from 'react';
import styles from '@/styles/order/order.module.css';
import { useRouter } from 'next/navigation';

const Order = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Simulating a delay for the loading animation
  setTimeout(() => {
    setLoading(false);
  }, 2000); // Adjust the delay time as needed

  // Simulating a delay for the order confirmation message
  setTimeout(() => {
    router.push('/order/placed-orders');
  }, 5000); // Adjust the delay time as needed

  return (
    <div className={styles.orderContainer}>
      {loading ? (
        <div className={styles.loadingContainer}>
          <img src="/images/loading.gif" alt="Loading" className={styles.loadingImage} />
          <p className={styles.loadingText}>Placing your order...</p>
        </div>
      ) : (
        <div className={styles.orderConfirmation}>
          <img src="/images/orderplaced.gif" alt="Order Placed" className={styles.orderPlacedImage} />
          <p className={styles.confirmationText}>Your order has been placed successfully!</p>
        </div>
      )}
    </div>
  );
};

export default Order;
