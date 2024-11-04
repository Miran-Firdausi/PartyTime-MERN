const mongoose = require("mongoose");

// Schema for Category
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "category1",
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    default: "Enter description here",
    maxlength: 300,
  },
  category_image: {
    type: String, // Storing image paths or URLs as strings
    default: null,
  },
});

// Schema for Product
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  description: {
    type: String,
    maxlength: 1000,
    default: null,
  },
  originalPrice: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  product_image: {
    type: String, // Storing image paths or URLs as strings
    default: null,
  },
  weight: {
    type: String,
    default: null,
  },
  volume: {
    type: mongoose.Schema.Types.Decimal128,
    default: null,
  },
});

// Schema for ProductSeller
const ProductSellerSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    discountedPrice: {
      type: mongoose.Schema.Types.Decimal128,
      default: null,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    expiry_date: {
      type: Date,
      default: null,
    },
    expiry_image: {
      type: String, // Storing image paths or URLs as strings
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Unique constraint to ensure each product-seller combination is unique
ProductSellerSchema.index({ product: 1, seller: 1 }, { unique: true });

// Method to calculate discounted price
ProductSellerSchema.methods.calculateDiscountedPrice = function () {
  if (this.expiry_date) {
    const daysToExpire =
      (this.expiry_date - new Date()) / (1000 * 60 * 60 * 24);
    let discountPercentage = 0;

    if (daysToExpire <= 1) discountPercentage = 0.5;
    else if (daysToExpire <= 5) discountPercentage = 0.4;
    else if (daysToExpire <= 10) discountPercentage = 0.3;
    else if (daysToExpire <= 15) discountPercentage = 0.2;
    else if (daysToExpire <= 30) discountPercentage = 0.1;
    else if (daysToExpire <= 60) discountPercentage = 0.05;

    const originalPrice = parseFloat(this.product.originalPrice);
    const discountedPrice = originalPrice * (1 - discountPercentage);
    return discountedPrice.toFixed(2); // Return rounded price
  }
  return this.product.originalPrice;
};

// Before saving, set the discounted price based on the calculation
ProductSellerSchema.pre("save", async function (next) {
  this.discountedPrice = this.calculateDiscountedPrice();
  next();
});

const Category = mongoose.model("Category", CategorySchema);
const Product = mongoose.model("Product", ProductSchema);
const ProductSeller = mongoose.model("ProductSeller", ProductSellerSchema);

module.exports = {
  Category,
  Product,
  ProductSeller,
};
