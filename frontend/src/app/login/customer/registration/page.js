"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter hook for navigation
import styles from "@/styles/login/customerR.module.css";

const CustomerRegistration = () => {
  const router = useRouter(); // Initialize useRouter hook
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
    isCustomer: true,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Registration successful
        setSuccessMessage("Registration successful!");
        setErrorMessage(""); // Clear any previous error message

        // Automatic login after successful registration
        const loginResponse = await fetch("http://127.0.0.1:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (loginResponse.ok) {
          // Assuming successful login, store tokens in local storage
          setTimeout(() => {
            setSuccessMessage("Logging in....");
          }, 2000);

          // Redirect to the store page after 4 seconds
          setTimeout(() => {
            router.push("/store");
          }, 6000);
        } else {
          setErrorMessage("An error occurred during login after registration.");
          setSuccessMessage("");
        }
      } else {
        // Registration failed, set error message
        if (data.error?.phone) {
          setErrorMessage(
            "This phone number is already in use. Please use a different phone number."
          );
        } else if (data.error?.user) {
          setErrorMessage("This field is required.");
        } else if (data.error === "UNIQUE constraint failed: core_user.email") {
          setErrorMessage(
            "This email is already in use. Please use a different email."
          );
        } else {
          setErrorMessage("An error occurred during registration.");
        }
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.registrationContainer}>
        <h2>Customer Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button className={styles.btnSubmit} type="submit">
            Submit
          </button>
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
          {successMessage && (
            <p className={styles.successMessage}>{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CustomerRegistration;
