// components/Cart.js
'use client'
import React from 'react';
import CartItem from '@/components/cart/CartItem';
import styles from '@/styles/cart/cart.module.css';
import { useCart } from '@/contextapi/CartContext';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const router = useRouter();
  const { cart } = useCart();
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0);

  return (
    <div>
      {cart.length === 0 ? (
          <div className={styles.emptyCartMessage}>
            <img src="/images/empty-cart.png" alt="Empty-Cart!" className={styles.emptyCartImage} />
            <p className={styles.emptyCartText}>Your cart is empty. Start adding items!</p>
          </div>
        ) : (
          <>
      <div className={styles.cartContainer}>

            <div className={styles.cartItemsContainer}>
              <h2 className={styles.cartHeader}>Your Cart</h2>
              <div className={styles.cartItems}>
                {cart.map((item, index) => (
                  <CartItem key={index} product={item} />
                ))}
              </div>
            </div>
            <div className={styles.summaryContainer}>
              <h2 className={styles.summaryHeader}>Cart Summary</h2>
              <div className={styles.summaryDetails}>
                <p>Total Items: {cart.length}</p>
                <p>Total Quantity: {totalQuantity}</p>
                <p>Total Price: ₹{totalPrice}</p>
                <button className={styles.proceedButton} onClick={()=>{router.push('/order');}}>Proceed to Buy</button>
              </div>
            </div>
      </div>
      </>
      )}
    </div>
  );
};

export default Cart;