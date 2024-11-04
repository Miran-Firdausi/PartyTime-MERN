import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import styles from '@/styles/navbar.module.css';
import Link from 'next/link';
import AutoPlaceFill from './PlaceAutoFill';
import LocationPop from './LocationPop';
import { useCart } from '@/contextapi/CartContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const Navbar = (props) => {
  const router = useRouter();
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);

  const { cart } = useCart();
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0);

  const handleSearchClick = (productid) => {
    // Programmatically navigate to the product detail page
    router.push(`/store/${productid}`);
    setInputFocused(false);
  };

  function toggleLocationMenu() {
    setIsLocationMenuOpen((prevState) => !prevState);
  }

  function handleSelectAddress(address) {
    setSelectedAddress(address);
    setIsLocationMenuOpen(false);
  }

  function getLocn() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
    setSelectedAddress('');
    setIsLocationMenuOpen(false);
  }

  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    setLatitude(lat);
    setLongitude(lon);
  }

  async function handleSearch() {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/products/search/?query=${searchQuery}`);
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar-left']}>
        <h1>
          <Link className={styles.logo} href="/">
            Party Time
          </Link>
        </h1>
        <div className={styles['navbar-location']}>
          <FaMapMarkerAlt />
          <span onClick={toggleLocationMenu}>Set Location</span>
          {isLocationMenuOpen && (
            <div className={styles.locationMenu}>
              {selectedAddress ? (
                <p className={styles.currentAddress}>
                  <FaMapMarkerAlt /> {selectedAddress}
                </p>
              ) : (
                latitude && <p className={styles.currentAddress}><FaMapMarkerAlt /> <LocationPop latitude={latitude} longitude={longitude}/></p>
              )}
              <h3>Enter Location</h3>
              <div className={styles.locationOptions}>
                <button onClick={getLocn}>Use Current Location</button>
                <AutoPlaceFill onSelectAddress={handleSelectAddress} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles['navbar-search']}>
        <input
          type="text"
          placeholder="Search for party food items..."
          value={searchQuery}
          onChange={(e) => {setSearchQuery(e.target.value); handleSearch()}}
          onFocus={() => setInputFocused(true)}
        />
        {inputFocused && (
          <div className={styles.searchResults}>
            {searchResults.length > 0 ? (
              <>
                <h3>Search Results:</h3>
                <ul className={styles.searchResultsList}>
                  {searchResults.map((product) => (
                    <li key={product.id} className={styles.resultRow} onClick={()=>handleSearchClick(product.id)}>
                        <img src={'http://127.0.0.1:8000'+product.product_image} width={50} height={50} />
                        <p>{product.name}</p>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No results found.</p>
            )}
          </div>
        )}
      </div>

      <div className={styles['navbar-links']}>
        <Link className={styles.navlink} href="/about">
          About
        </Link>
        <Link className={styles.navlink} href="/store">
          Store
        </Link>
        <Link className={styles.Login} href="/login">
          <img src="/icons/icons8-user-profile-96.png" alt="Login" />
          Login
        </Link>
        {props.on && (
          <Link className={styles.cart} href="/cart">
            <img className={styles.cartImage} src="/icons/icons8-cart-96.png" alt="Cart" />
            {totalQuantity === 0 || totalPrice === 0 ? (
              <>
                <span>My Cart</span>
              </>
            ) : (
              <div className={styles.qty}>
                <div>{totalQuantity} Items</div>
                <div>₹{totalPrice}</div>
              </div>
            )}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
