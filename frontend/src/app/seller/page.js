// Seller.js
"use client";
// Seller.js
import React, { useState, useEffect } from "react";
import SellerProductsList from "@/components/seller/SellerProductsList";
import styles from "@/styles/seller.module.css";
import ProductForm from "@/components/seller/ProductForm";

const Seller = ({ seller = "SellerLoginName" }) => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    originalPrice: "",
    discountedPrice: "",
    image: "",
    weight: "",
    quantity: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/categories"); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data); // Set fetched categories to state
        setFormData((prevState) => ({
          ...prevState,
          category: data[0]?._id || "",
        })); // Set default category
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(`form ${formData}`);
      const response = await fetch("http://127.0.0.1:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const newProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]); // Add new product to list

      // Reset form after submission
      setFormData({
        name: "",
        originalPrice: "",
        discountedPrice: "",
        image: "",
        weight: "",
        quantity: "",
        category: "", // Reset to the first category if available
      });
      setShowForm(false); // Hide form after submission
    } catch (error) {
      console.error(error.message);
    }
  };

  const totalSales = 2060;
  const averageRating = 4.5;

  return (
    <div className={styles.main}>
      <h2 className={styles.marginMe}>Hello {seller}, </h2>

      <div>
        <h1 className={styles.marginMe2}>Analytics</h1>
        <div className={styles.analytics}>
          <div className={styles.graph}>
            <img src="/images/graph.png" />
          </div>
          <div className={styles.metric}>
            <div>
              <h3>Total Sales</h3>
              <p>₹{totalSales}</p>
            </div>

            <div>
              <h3>Average Rating</h3>
              <p>{averageRating}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.productTitle}>
          <h1>Products</h1>
          <button
            className={styles.sellerProductAdd}
            onClick={() => setShowForm(true)}
          >
            {" "}
            Add{" "}
          </button>
          {showForm && (
            <ProductForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleImageUpload={handleImageUpload}
              handleSubmit={handleSubmit}
              setShowForm={setShowForm}
              categories={categories} // Pass the categories array as a prop
            />
          )}
        </div>
        {categories.map((category) => {
          const filteredProducts = products.filter(
            (product) => product.category === category
          );
          if (filteredProducts.length > 0) {
            return (
              <SellerProductsList
                key={category}
                category={category}
                products={filteredProducts}
                setProducts={setProducts}
              />
            );
          } else {
            return null; // Don't render if there are no products
          }
        })}
      </div>
    </div>
  );
};

export default Seller;
