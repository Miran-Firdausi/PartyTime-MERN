// components/CartSummary.js
import React from 'react';
import styles from '@/styles/cart/CartSummary.module.css';

const CartSummary = ({ totalPrice, onProceedToBuy }) => {
  return (
    <div className={styles.cartSummary}>
      <div className={styles.totalPrice}>Total Price: ${totalPrice}</div>
      <button className={styles.proceedButton} onClick={onProceedToBuy}>Proceed to Buy</button>
      {/* Add other options as required */}
    </div>
  );
};

export default CartSummary;
