const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isSeller: {
    type: Boolean,
    default: false,
  },
  isCustomer: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Hash the password before saving the user
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const sellerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  aadharNumber: { type: String, unique: true, maxlength: 12 },
  licenseNumber: { type: String, unique: true, maxlength: 20 },
  sellerUpi: { type: String, maxlength: 255, default: null },
});

const customerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  // Add customer-specific fields here
});

const shopSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
    maxlength: 255,
  },
  addressLine2: {
    type: String,
    maxlength: 255,
    default: null,
  },
  city: {
    type: String,
    required: true,
    maxlength: 100,
  },
  state: {
    type: String,
    required: true,
    maxlength: 100,
  },
  postalCode: {
    type: String,
    required: true,
    maxlength: 20,
  },
  country: {
    type: String,
    required: true,
    maxlength: 100,
  },
  rating: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0.0,
    min: 0,
    max: 5,
  },
  closingTime: {
    type: String, // Stored as a string, e.g., "21:00" for 9 PM
    default: null,
  },
  latitude: {
    type: mongoose.Schema.Types.Decimal128,
    default: null,
  },
  longitude: {
    type: mongoose.Schema.Types.Decimal128,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);
const Seller = mongoose.model("Seller", sellerSchema);
const Customer = mongoose.model("Customer", customerSchema);
const Shop = mongoose.model("Shop", shopSchema);

module.exports = { User, Seller, Customer, Shop };
