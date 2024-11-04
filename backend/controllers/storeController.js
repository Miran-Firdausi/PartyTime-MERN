const { Seller } = require("../models/userModel");
const { Category, Product, ProductSeller } = require("../models/storeModel");

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, description, originalPrice, category, weight, volume } =
      req.body;

    // Ensure required fields are provided
    if (!name || !originalPrice || !category) {
      return res
        .status(400)
        .json({ message: "Name, price, and category are required" });
    }

    const newProduct = await Product.create({
      name,
      description,
      originalPrice,
      category,
      weight,
      volume,
      product_image: req.body.product_image, // Assuming image URL/path is sent in request
    });

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product" });
  }
};

// Get detailed view of a product with seller info
exports.getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID and populate its category
    const product = await Product.findById(productId).populate(
      "category",
      "name description"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find all sellers for this product
    const productSellers = await ProductSeller.find({
      product: productId,
    }).populate("seller", "name email");

    res.status(200).json({ product, sellers: productSellers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch product details" });
  }
};
