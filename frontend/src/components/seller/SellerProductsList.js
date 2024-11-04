// SellerProductsList.js
"use client"
import React, { useRef } from 'react';
import Product from '@/components/seller/SellerProductItem';
import styles from "@/styles/product/productsList.module.css";

const SellerProductsList = ({ category, products = [], setProducts }) => {
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

    const filteredProducts = products.filter(product => product.category === category);

    return (
        <div className={styles.productsListOuterContainer}>
            <span className={styles.productsListTitle}>{category}</span>
            <div className={styles.productsListContainer}>
                <button className={`${styles.scrollButton} ${styles.scrollLeft}`} onClick={handleScrollLeft}>
                    <img src="/images/left-arrow.png" alt="Left Arrow" />
                </button>
                <div className={styles.productsList} ref={productsListRef}>
                    {filteredProducts.map((product, index) => (
                        <Product
                            key={index}
                            id={product.id}
                            name={product.name}
                            originalPrice={product.originalPrice}
                            discountedPrice={product.discountedPrice}
                            image={product.image}
                            weight={product.weight}
                            quantity={product.quantity}
                        />
                    ))}
                </div>
                <button className={`${styles.scrollButton} ${styles.scrollRight}`} onClick={handleScrollRight}>
                    <img src="/images/right-arrow.png" alt="Right Arrow" />
                </button>
            </div>
        </div>
    );
};

export default SellerProductsList;
