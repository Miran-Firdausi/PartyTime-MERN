"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/styles/locationpop.module.css';

export default function LocationPop({ latitude, longitude }) {
  const [currentAddress, setCurrentAddress] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: 'GET',
        };

        const apiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${process.env.NEXT_PUBLIC_locationApiKey}`;
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        setCurrentAddress(
          `${data.features[0].properties.address_line1} ${data.features[0].properties.address_line2}`
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  return currentAddress
}
