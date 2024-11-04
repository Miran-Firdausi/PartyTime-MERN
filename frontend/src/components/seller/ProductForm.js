// ProductForm.js
"use client";
import React from "react";
import styles from "@/styles/seller.module.css";

const ProductForm = ({
  formData,
  handleInputChange,
  handleImageUpload,
  handleSubmit,
  setShowForm,
  categories,
}) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <p>NEW PRODUCT</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              required
            />
          </div>
          <div>
            MRP
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleInputChange}
              placeholder="Original Price"
              required
            />
          </div>
          <div>
            Price
            <input
              type="number"
              name="discountedPrice"
              value={formData.discountedPrice}
              onChange={handleInputChange}
              placeholder="Discounted Price"
              required
            />
          </div>
          <div>
            <div className={styles.imgText}>Image</div>
            <input
              type="file"
              accept="image/png"
              name="image"
              onChange={handleImageUpload}
              required
            />
          </div>
          <div>
            Weight
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Weight"
              required
            />
          </div>
          <div>
            Quantity
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              required
            />
          </div>
          <div>
            Category
            <select
              className={styles.category}
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              {categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.closeButton}
              onClick={() => setShowForm(false)}
            >
              Close
            </button>
            <button className={styles.addButton} type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
