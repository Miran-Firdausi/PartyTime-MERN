// components/PlacedOrders.js
'use client'
import React from 'react';
import styles from '@/styles/order/placed-orders.module.css';
import { useCart } from '@/contextapi/CartContext'; // Assuming useCart hook is provided by CartContext

const PlacedOrders = () => {
  const { cart } = useCart();
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0);

  return (
    <div className={styles.placedOrdersContainer}>
      <h2>Order Summary</h2>
      <div className={styles.orderSummary}>
        <h3 className={styles.orderHeader}>Order Details</h3>
        <div>
          {cart.map((item, index) => (
            <div className={styles.productDetails} key={index}>
              <p className={styles.productName}>Product Name: {item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.discountedPrice}</p>
            </div>
          ))}
        </div>
        <p className={styles.totalPrice}>Total Price: ₹{totalPrice}</p>
        <p className={styles.totalQuantity}>Total Quantity: {totalQuantity}</p>
      </div>
    </div>
  );
};

export default PlacedOrders;
