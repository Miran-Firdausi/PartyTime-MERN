'use client'
import React , {useState} from 'react';
import styles from '@/styles/cart/CartItem.module.css';
import { useCart } from '@/contextapi/CartContext'; // Update the path to your CartContext
import QuantitySelector from '../QuantitySelector';
import qtystyles from '@/styles/quantityselector.module.css'; // Import CSS module for styling
import { useRouter } from 'next/navigation';

const CartItem = ({ product }) => {
  const { dispatch } = useCart(); // Access the dispatch function from the context
  const [quantity, setQuantity] = useState(product ? product.quantity : 0);
  const router = useRouter();
  const handleProductClick = () => {
    // Programmatically navigate to the product detail page
    router.push(`/store/${encodeURIComponent(product.id)}`);
  };

  const handleRemove = () => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: {
        id: product.id, // Pass the ID of the product to be removed
      },
    });
  };

    const handleAddToCart = (isAdded) => {
      if (product) {
        // If the product already exists in the cart, update its quantity
        dispatch({
          type: 'UPDATE_QUANTITY',
          payload: {
            id: product.id,
            quantity: isAdded === 'increment' ? product.quantity + 1 : product.quantity - 1,
          },
        });
      } else {
        // If the product does not exist in the cart, add it
        dispatch({
          type: 'ADD_TO_CART',
          payload: {
            id,
            name,
            originalPrice,
            discountedPrice,
            product_image,
            weight,
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
  console.log(product);
  return (
    <div className={styles.cartItem}>
      <div className={styles.productImage}>
        <img src={'http://127.0.0.1:8000'+product.product_image} alt={product.name} onClick={handleProductClick}/>
      </div>
      <div className={styles.itemDetails}>
        <h3 className={styles.productName}>{product.name}</h3>
        <div className={styles.priceContainer}>
          <p className={styles.originalPrice}>₹{product.originalPrice}</p>
          <p className={styles.discountedPrice}>₹{product.discountedPrice}</p>
        </div>
        <p className={styles.productDescription}>{product.description}</p>
        <div className={styles.quantityContainer}>
          <label htmlFor="quantity">Quantity: <QuantitySelector qtystyles={qtystyles} quantity={product.quantity} onDecrement={()=> handleQuantityChange('decrement')} onIncrement={()=> handleQuantityChange('increment')}/></label>
        </div>
        <button className={styles.removeButton} onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
