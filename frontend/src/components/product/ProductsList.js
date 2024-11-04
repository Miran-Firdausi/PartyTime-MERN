
"use client"
import { useRef, useEffect } from 'react';
import Product from './ProductItem';
import styles from "@/styles/product/productsList.module.css"


  export default function ProductsList({ products, category = "Snacks" }) {
    const productsListRef = useRef(null);
    
    const handleScrollLeft = () => {
      if (productsListRef.current) {
        productsListRef.current.scrollBy({
          left: -200, // Adjust as needed
          behavior: 'smooth'
        });
      }
    };
  
    const handleScrollRight = () => {
      if (productsListRef.current) {
        productsListRef.current.scrollBy({
          left: 200, // Adjust as needed
          behavior: 'smooth'
        });
      }
    };
    console.log(products);
    return (
      <div className={styles.productsListOuterContainer}>
      <span className={styles.productsListTitle}>{category}</span>
      <div className={styles.productsListContainer}>
        <button className={`${styles.scrollButton} ${styles.scrollLeft}`} onClick={handleScrollLeft}>
          <img src="/images/left-arrow.png" alt="Left Arrow" />
        </button>
        <div className={styles.productsList} ref={productsListRef}>
          {products.map((product, index) => (
            <Product
              key={index}
              id={product.id}
              name={product.name}
              originalPrice={product.originalPrice}
              discountedPrice={product.sellers[0].discountedPrice}
              image={product.product_image}
              weight={product.weight}
              product_seller={product.sellers[0].id}
            />
          ))}
        </div>
        <button className={`${styles.scrollButton} ${styles.scrollRight}`} onClick={handleScrollRight}>
          <img src="/images/right-arrow.png" alt="Right Arrow" />
        </button>
      </div>
      </div>
    );
  }
