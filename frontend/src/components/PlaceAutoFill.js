"use client"
// AutoPlaceFill component
import React, { useState, useEffect } from 'react';
import styles from '@/styles/navbar.module.css'
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function AutoPlaceFill({ onSelectAddress }) {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputText.trim() !== '') {
        try {
          const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(inputText)}&apiKey=${process.env.NEXT_PUBLIC_geoApifyKey}`);
          const data = await response.json();
          if (data.features) {
            setSuggestions(data.features.map(feature => feature.properties.formatted));
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error('Error fetching autocomplete suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [inputText]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSelectAddress = (address) => {
    onSelectAddress(address);
  };

  return (
    <div className={styles.autoPlaceFill}>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type your address"
        className={styles.addressInput}
      />
      <ul className={styles.suggestionsList}>
        {suggestions.map((suggestion, index) => (
          <li key={index} className={styles.suggestion} onClick={() => handleSelectAddress(suggestion)}>
            <FaMapMarkerAlt className={styles.mapIcon}/> {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}
