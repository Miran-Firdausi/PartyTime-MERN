import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Step 1: Create a context for the cart
const CartContext = createContext();

// Step 2: Define a reducer function to manage the cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      // Set the cart to the fetched data
      return action.payload;
    case 'ADD_TO_CART':
      // Add the product to the cart
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      // Remove the product from the cart
      return state.filter(item => item.id !== action.payload.id);
    case 'UPDATE_QUANTITY':
      // Update the quantity of a product in the cart
      return state.map(item =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
    default:
      return state;
  }
};

// Step 4: Create a custom hook to access cart context
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Step 5: Use useEffect to watch for changes in the cart and post data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('http://127.0.0.1:8000/cart/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          credentials: 'include' // Include credentials in the request
        });
        if (!response.ok) {
          throw new Error('Failed to fetch cart data');
        }
        const data = await response.json();
        const formattedCart = data.items_in_cart.map(item => ({
          id: item.product.id,
          name: item.product.name,
          originalPrice: item.product.originalPrice,
          discountedPrice: item.product_seller.discountedPrice,
          product_image: item.product.product_image,
          weight: item.product.weight,
          quantity: item.product_quantity,
          product_seller: item.product_seller.id
        }));
        dispatch({ type: 'SET_CART', payload: formattedCart });
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchData();
  }, []); // Fetch cart data only once when component mounts

  // Step 6: Update cart data on backend whenever cart changes
  useEffect(() => {
    const postData = async () => {
      try {
        const formattedCart = cart.map(item => ({
          product: {
            id: item.id
          },
          product_seller: item.product_seller,
          quantity: item.quantity
        }));

        const totalAmount = cart.reduce((total, item) => total + (item.quantity * item.originalPrice), 0);
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const data = {
          items: formattedCart,
          total_amount: totalAmount,
          total_items: totalItems,
        };
        console.log(JSON.stringify(data));
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('http://127.0.0.1:8000/cart/add/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
          credentials: 'include' // Include credentials in the request
        });
        if (!response.ok) {
          throw new Error('Failed to post cart data');
        }
        else{
          console.log("Cart Updated!");
        }
      } catch (error) {
        console.error('Error posting cart data:', error);
      }
    };

    postData();
  }, [cart]); // Watch for changes in the cart

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
