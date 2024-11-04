"use client";
import React, { useState, useEffect } from "react";
import ProductInfo from "@/components/product/productDetails/ProductInfo";
import { products } from "../page";
import ShopList from "@/components/product/productDetails/ShopList";
import styles from "@/styles/product/productInfo/productid.module.css"; // Import CSS module

export default function ProductDetails({ params }) {
  const { productId } = params;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/products/all/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const findProductById = (id) => {
    const product = products.find((product) => product.id === parseInt(id));
    if (product) {
      return product;
    }
    return null;
  };

  const product = {
    id: 1,
    name: "Lays Classic Family Size",
    originalPrice: 30,
    discountedPrice: 25,
    product_image: "/images/product/Lays.png",
    weight: "200g",
    category: "Snacks & Munchies",
    description:
      "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
    expiryDate: "2024-10-01",
    sellers: [{ seller: { license_number: "123" }, discountedPrice: 23 }],
  };

  if (!product) {
    return <h1>Product not found!</h1>;
  }

  const renderProductInfo = (title, info) => (
    <li>
      <span className={styles.title}>{title}</span>
      {info ? (
        <span className={styles.info}>{info}</span>
      ) : (
        <span className={styles.info}>Information not available</span>
      )}
    </li>
  );

  return (
    <div className={styles.productDetailsContainer}>
      <div className={styles.productInfo}>
        <ProductInfo product={product} />
      </div>
      <div className={styles.shopList}>
        <ShopList />
      </div>
      <div className={styles.productDetails}>
        <h2>Product Details</h2>
        <ul>
          {/* {renderProductInfo("Flavour", product.flavour)} */}
          {renderProductInfo("Unit", product.weight + "g/ml")}
          {renderProductInfo("Shelf Life", /*product.shelfLife*/ "6 months")}
          {renderProductInfo("Manufacturer", product.sellers[0].seller_name)}
          {renderProductInfo("Marketed By", product.sellers[0].seller_name)}
          {renderProductInfo(
            "Country Of Origin",
            /*product.countryOfOrigin*/ "India"
          )}
          {renderProductInfo(
            "FSSAI License",
            product.sellers[0].seller.license_number
          )}
          {renderProductInfo(
            "Customer Care Details",
            "Email: info@partytime.com"
          )}
          {renderProductInfo(
            "Return Policy",
            "This Item is non-returnable. For a damaged, defective, incorrect or expired item, you can request a replacement within 72 hours of delivery.In case of an incorrect item, you may raise a replacement or return request only if the item is sealed/ unopened/ unused and in original condition."
          )}
          {renderProductInfo("Expiry Date", product.sellers[0].expiry_date)}
          {renderProductInfo("Net Volume", product.weight)}
          {renderProductInfo(
            "Packaging Type",
            /*product.packagingType*/ "packaged product"
          )}
          {renderProductInfo("Seller", product.sellers[0].seller_name)}
          {renderProductInfo(
            "Seller FSSAI",
            product.sellers[0].seller.license_number
          )}
          {renderProductInfo("Description", product.description)}
          {renderProductInfo(
            "Disclaimer",
            "Every effort is made to maintain the accuracy of all information. However, actual product packaging and materials may contain more and/or different information. It is recommended not to solely rely on the information presented."
          )}
        </ul>
      </div>
    </div>
  );
}
