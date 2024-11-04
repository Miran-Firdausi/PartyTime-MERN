// SellerProductItem.js
"use client"
import React from 'react';
import styles from '@/styles/product/product.module.css'; // Import CSS module for styling

const Product = ({ id, name, originalPrice, discountedPrice, image, weight, quantity, onDelete }) => {
  
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className={styles.productList}>
      <div className={styles.product}>
        <img className={styles.productImage} src={image} alt={name} />
        <div className={styles.info}>
          <div className={styles.distance}>
            <span>200m</span>
          </div>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.productWeight}>{weight}</p>
          <div className={styles.priceContainer}>
            <div>
              <p className={styles.originalPrice}>₹{originalPrice}</p>
              <p className={styles.discountedPrice}>₹{discountedPrice}</p>
            </div>
            <p className={styles.productQuantity}>Qty : <span>{quantity}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
