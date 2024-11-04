"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/product/product.module.css"; // Import CSS module for styling
import { useCart } from "@/contextapi/CartContext";
import { useRouter } from "next/navigation";

const Product = ({
  id,
  name,
  originalPrice,
  discountedPrice,
  image,
  weight,
  product_seller,
}) => {
  const router = useRouter();
  const { cart, dispatch } = useCart();
  const existingProduct = cart.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(
    existingProduct ? existingProduct.quantity : 0
  );
  const [showQuantitySelector, setShowQuantitySelector] = useState(
    existingProduct ? true : false
  );

  const handleProductClick = () => {
    // Programmatically navigate to the product detail page
    router.push(`/store/${encodeURIComponent(id)}`);
  };

  const handleAddToCart = (isAdded) => {
    console.log("product seller id: " + product_seller);
    if (existingProduct) {
      // If the product already exists in the cart, update its quantity
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: {
          id: existingProduct.id,
          quantity:
            isAdded === "increment"
              ? existingProduct.quantity + 1
              : existingProduct.quantity - 1,
        },
      });
    } else {
      // If the product does not exist in the cart, add it
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          id,
          name,
          originalPrice,
          discountedPrice,
          image,
          weight,
          quantity: 1,
          product_seller,
        },
      });
    }
  };

  const handleQuantityChange = (operation) => {
    if (operation === "increment") {
      setQuantity(quantity + 1);
      handleAddToCart("increment");
    } else if (operation === "decrement") {
      if (quantity === 1) {
        // If quantity is 1 and decrement is clicked, remove the product from the cart
        setQuantity(0);
        setShowQuantitySelector(false);
        dispatch({
          type: "REMOVE_FROM_CART",
          payload: {
            id: existingProduct.id,
          },
        });
        handleAddToCart("decrement");
      } else if (quantity > 1) {
        setQuantity(quantity - 1);
        handleAddToCart("decrement");
      }
    }
  };

  const handleQuantityButtonClick = () => {
    if (showQuantitySelector) {
      // If quantity selector is visible, reset quantity to zero and switch to add button
      handleAddToCart(quantity);
      setQuantity(0);
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: {
          id: existingProduct.id,
        },
      });
      setShowQuantitySelector(false);
    } else {
      handleAddToCart("increment");
      setQuantity(1);
      setShowQuantitySelector(true);
    }
  };

  return (
    <div className={styles.productList}>
      <div className={styles.product}>
        <img
          className={styles.productImage}
          src={"http://127.0.0.1:8000" + image}
          alt={name}
          onClick={handleProductClick}
        />
        <div className={styles.info}>
          <div className={styles.distance}>
            <span>0.4km</span>
          </div>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.productWeight}>{weight}g</p>
          <div className={styles.priceContainer}>
            <div>
              <p className={styles.originalPrice}>₹{originalPrice}</p>
              <p className={styles.discountedPrice}>₹{discountedPrice}</p>
            </div>
            <div className={styles.quantity}>
              {!showQuantitySelector ? (
                <button
                  className={styles.addButton}
                  onClick={handleQuantityButtonClick}
                >
                  Add
                </button>
              ) : (
                <div className={styles.quantitySelector}>
                  <button
                    className={styles.minus}
                    onClick={() => handleQuantityChange("decrement")}
                  >
                    -
                  </button>
                  <button
                    className={styles.qty}
                    onClick={handleQuantityButtonClick}
                  >
                    {existingProduct.quantity}
                  </button>
                  <button
                    className={styles.plus}
                    onClick={() => handleQuantityChange("increment")}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
          {showQuantitySelector && (
            <p className={styles.totalPrice}>
              Total Price: ₹{discountedPrice * existingProduct.quantity}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
