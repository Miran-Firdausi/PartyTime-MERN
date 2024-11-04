"use client";
import React, { useState, useEffect } from "react";
import ProductsList from "@/components/product/ProductsList";
import { useCart } from "@/contextapi/CartContext";

export const productList = [
  // {
  //   id: 1,
  //   name: "Lays Classic Family Size",
  //   originalPrice: 30,
  //   discountedPrice: 25,
  //   product_image: "/images/product/Lays.png",
  //   weight: "200g",
  //   category: "Snacks & Munchies",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-10-01",
  //   sellers: [{ discountedPrice: 23 }],
  // },
  // {
  //   id: 2,
  //   name: "Cheetos Firindan",
  //   originalPrice: 35,
  //   discountedPrice: 33,
  //   image: "/images/product/Cheetos.png",
  //   weight: "200g",
  //   category: "Snacks & Munchies",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-10-01",
  // },
  // {
  //   id: 3,
  //   name: "Cheetos Bag of Bones",
  //   originalPrice: 30,
  //   discountedPrice: 25,
  //   image: "/images/product/CheetosBB.png",
  //   weight: "200g",
  //   category: "Snacks & Munchies",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-10-01",
  // },
  // {
  //   id: 4,
  //   name: "Doritos Cool Ranch",
  //   originalPrice: 20,
  //   discountedPrice: 18,
  //   image: "/images/product/DoritosCoolRanch.png",
  //   weight: "200g",
  //   category: "Snacks & Munchies",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-10-01",
  // },
  // {
  //   id: 5,
  //   name: "Lays Wavy",
  //   originalPrice: 30,
  //   discountedPrice: 25,
  //   image: "/images/product/layswavy.png",
  //   weight: "180g",
  //   category: "Snacks & Munchies",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-10-01",
  // },
  // {
  //   id: 6,
  //   name: "Oreo Biscuit",
  //   originalPrice: 25,
  //   discountedPrice: 20,
  //   image: "/images/product/Oreo.png",
  //   weight: "150g",
  //   category: "Snacks & Munchies",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-10-01",
  // },
  // {
  //   id: 7,
  //   name: "Pringles Original",
  //   originalPrice: 30, // INR
  //   discountedPrice: 25, // INR
  //   image: "/images/product/pringles.png",
  //   weight: "150g",
  //   category: "Snacks & Munchies",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-10-01",
  // },
  // {
  //   id: 8,
  //   name: "Kit Kat",
  //   originalPrice: 10, // INR
  //   discountedPrice: 8, // INR
  //   image: "/images/product/kitkat.png",
  //   weight: "45g",
  //   category: "Snacks & Munchies",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-10-01",
  // },
  // {
  //   id: 9,
  //   name: "Bingo Mad Angles Masala Magic",
  //   originalPrice: 20, // INR
  //   discountedPrice: 18, // INR
  //   image: "/images/product/bingo.png",
  //   weight: "70g",
  //   category: "Snacks & Munchies",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-10-01",
  // },
  // {
  //   id: 10,
  //   name: "Monster Energy Drink",
  //   originalPrice: 50,
  //   discountedPrice: 45,
  //   image: "/images/product/Monster.png",
  //   weight: "200ml",
  //   category: "Beverages",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-09-30",
  // },
  // {
  //   id: 11,
  //   name: "Coke Classic",
  //   originalPrice: 30,
  //   discountedPrice: 25,
  //   image: "/images/product/CokeClassic.png",
  //   weight: "200ml",
  //   category: "Beverages",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-09-30",
  // },
  // {
  //   id: 12,
  //   name: "Cold Drinks Pack of 3",
  //   originalPrice: 100,
  //   discountedPrice: 90,
  //   image: "/images/product/ColdDrinks.png",
  //   weight: "200ml",
  //   category: "Beverages",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-09-30",
  // },
  // {
  //   id: 13,
  //   name: "Cold Drinks pack of 5",
  //   originalPrice: 30,
  //   discountedPrice: 25,
  //   image: "/images/product/cold5.png",
  //   weight: "200ml",
  //   category: "Beverages",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-09-30",
  // },
  // {
  //   id: 14,
  //   name: "Cold Brew High Brew Coffee",
  //   originalPrice: 50,
  //   discountedPrice: 45,
  //   image: "/images/product/coldbrew.png",
  //   weight: "355ml",
  //   category: "Beverages",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-09-30",
  // },
  // {
  //   id: 15,
  //   name: "Coke Bottle",
  //   originalPrice: 20,
  //   discountedPrice: 18,
  //   image: "/images/product/cokebottle.png",
  //   weight: "500ml",
  //   category: "Beverages",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-09-30",
  // },
  // {
  //   id: 16,
  //   name: "Sprite Can",
  //   originalPrice: 20, // INR
  //   discountedPrice: 18, // INR
  //   image: "/images/product/sprite.png",
  //   weight: "330ml",
  //   category: "Beverages",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-09-30",
  // },
  // {
  //   id: 17,
  //   name: "Sprite Bottle",
  //   originalPrice: 25, // INR
  //   discountedPrice: 22, // INR
  //   image: "/images/product/spritebottle.png",
  //   weight: "600ml",
  //   category: "Beverages",
  //   description:
  //     "Indulge in the crispy and flavorful taste of Lays Classic Family Size potato chips. Made from the finest quality potatoes and seasoned to perfection with a blend of salt, these chips are the perfect snack for any occasion. Whether you're enjoying a movie night with family or hosting a party with friends, Lays Classic Family Size chips are sure to satisfy your cravings. Each bite delivers a satisfying crunch and mouthwatering taste that will leave you reaching for more. Treat yourself to the timeless snack that's loved by millions around the world!",
  //   expiryDate: "2024-09-30",
  // },
];

export default function Store() {
  const { cart } = useCart();
  const [products, setProducts] = useState(productList);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );
  const categories = Array.from(
    new Set(products.map((product) => product.category.name))
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/products/");
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

  return (
    <div className="Store">
      <div className="Advertising">Advertising</div>
      {categories.map((category) => (
        <ProductsList
          key={category}
          products={products.filter(
            (product) => product.category.name === category
          )}
          category={category}
        />
      ))}
    </div>
  );
}
