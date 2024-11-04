'use client'
import React, { useState } from 'react';
import QuantitySelector from '@/components/QuantitySelector';
import styles from '@/styles/product/productInfo/ProductInfo.module.css';
import qtystyles from '@/styles/quantityselector.module.css';
import { useCart } from '@/contextapi/CartContext';

export default function ProductInfo({ product }) {
    const { cart, dispatch } = useCart();
    const existingProduct = cart.find(item => item.id === product.id);
    const [quantity, setQuantity] = useState(existingProduct ? existingProduct.quantity : 0);
    const [hovered, setHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width;
        const y = (e.pageY - top) / height;
        setPosition({ x, y });
    };

    const handleAddToCart = (isAdded) => {
        if (existingProduct) {
          // If the product already exists in the cart, update its quantity
          dispatch({
            type: 'UPDATE_QUANTITY',
            payload: {
              id: existingProduct.id,
              quantity: isAdded === 'increment' ? existingProduct.quantity + 1 : existingProduct.quantity - 1,
            },
          });
        } else {
          // If the product does not exist in the cart, add it
          dispatch({
            type: 'ADD_TO_CART',
            payload: {
              id: product.id,
              name: product.name,
              originalPrice: product.originalPrice,
              discountedPrice: product.sellers[0].discountedPrice,
              image: product.product_image,
              weight: product.weight,
              quantity: 1,
            },
          });
        }
    };
    const handleQuantityChange = (operation) => {
        if (operation === 'increment') {
          setQuantity(quantity + 1);
          handleAddToCart('increment');
        } else if (operation === 'decrement') {
          if (quantity === 1) {
            // If quantity is 1 and decrement is clicked, remove the product from the cart
            setQuantity(0);
            dispatch({
              type: 'REMOVE_FROM_CART',
              payload: {
                id: product.id,
              },
            });
            handleAddToCart('decrement');
          } else if (quantity > 1) {
            setQuantity(quantity - 1);
            handleAddToCart('decrement');
          }
        }
      };

    return (
        <div className={styles.cartItem}>
            <div 
                className={styles.productImage} 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                style={{
                    backgroundImage: hovered ? `url(${'http://127.0.0.1:8000'+product.product_image})` : 'none',
                    backgroundPosition: `${position.x * 100}% ${position.y * 100}%`,
                    backgroundSize: hovered ? '130%' : 'cover',
                    transition: 'background-size 0.3s',
                }}
            >
            {hovered ? null : (
                <img src={'http://127.0.0.1:8000'+product.product_image} alt={product.name} />
            )}
            </div>
            <div className={styles.itemDetails}>
                <h3 className={styles.productName}>{product.name}</h3>
                <div className={styles.priceContainer}>
                    <p className={styles.originalPrice}>₹{product.originalPrice}</p>
                    <p className={styles.discountedPrice}>₹{product.sellers[0].discountedPrice}</p>
                </div>
                <p className={styles.productDescription}>Description: {product.description}</p>
                <div className={styles.quantityContainer}>
                    <label htmlFor="quantity">Quantity: </label>
                    <QuantitySelector 
                        qtystyles={qtystyles} 
                        quantity={existingProduct ? existingProduct.quantity : 0} 
                        onDecrement={()=> handleQuantityChange('decrement')} 
                        onIncrement={()=> handleQuantityChange('increment')}
                    />
                </div>
                <p className={styles.productCategory}>Category: {product.category.name}</p>
                <p className={styles.productWeight}>Weight: {product.weight}</p>
                <p className={styles.productExpiry}>Expiry Date: {product.sellers[0].expiry_date}</p>
            </div>
        </div>
    );
}
