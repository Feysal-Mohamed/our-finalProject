const express = require("express");
const uploadImage = require("../middleware/UploadImage");
const productController = require("../controller/productControll");

const router = express.Router();

// Create product with single image
router.post("/create/product", uploadImage.single("prImg"), productController.createProduct);

// Update product (image optional)
router.put("/update/product/:id", uploadImage.single("prImg"), productController.updateProduct);

// Read all products
router.get("/read/product", productController.readData);

// Read single product
router.get("/singleProduct/product/:id", productController.readSingleData);

// Delete product
router.delete("/delete/product/:id", productController.deleteProduct);

module.exports = router;
