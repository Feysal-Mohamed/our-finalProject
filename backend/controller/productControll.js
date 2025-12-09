const Product = require("../Models/productModel");
const cloudinary = require("../config/cloudinary");

// ---------------- Create Product ----------------
const createProduct = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const { quantity, desc, price, name, categ } = req.body;

    const prImg = req.file.secure_url;        // Cloudinary URL
    const prImgPublicId = req.file.public_id; // Cloudinary public ID

    const newProduct = new Product({
      quantity,
      name,
      desc,
      categ,
      price,
      prImg,
      prImgPublicId
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);

  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ---------------- Update Product ----------------
const updateProduct = async (req, res) => {
  try {
    const productItem = await Product.findById(req.params.id);
    if (!productItem) return res.status(404).json({ message: "Product not found" });

    const updateFields = {
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      quantity: req.body.quantity,
      categ: req.body.categ
    };

    if (req.file) {
      // Delete old image from Cloudinary
      if (productItem.prImgPublicId) {
        await cloudinary.uploader.destroy(productItem.prImgPublicId);
      }

      // Save new image info
      updateFields.prImg = req.file.secure_url;
      updateFields.prImgPublicId = req.file.public_id;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    res.status(200).json(updated);

  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ---------------- Read All Products ----------------
const readData = async (req, res) => {
  try {
    const { categ } = req.body || {};
    const filterData = {};

    if (categ) filterData.categ = categ;

    const products = await Product.find(filterData);
    res.status(200).json(products);

  } catch (error) {
    console.error("READ PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ---------------- Read Single Product ----------------
const readSingleData = async (req, res) => {
  try {
    const productItem = await Product.findById(req.params.id);
    if (!productItem) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(productItem);

  } catch (error) {
    console.error("READ SINGLE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ---------------- Delete Product ----------------
const deleteProduct = async (req, res) => {
  try {
    const productItem = await Product.findById(req.params.id);
    if (!productItem) return res.status(404).json({ message: "Product not found" });

    // Delete image from Cloudinary
    if (productItem.prImgPublicId) {
      await cloudinary.uploader.destroy(productItem.prImgPublicId);
    }

    // Delete product from MongoDB
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product and image deleted successfully" });

  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createProduct,
  readData,
  readSingleData,
  updateProduct,
  deleteProduct
};
