const express = require("express");
const router = express.Router();

const postController = require("../controller/postControler");

// IMPORTANT: Must match your file name exactly (uploadImage.js)
const uploadImage = require("../middleware/UploadImage");


// ---------------- Create Post ----------------
router.post(
  "/create/post",
  uploadImage.single("image"), 
  postController.createPost
);


// ---------------- Get All Posts ----------------
router.get("/read/post", postController.getAllPosts);


// ---------------- Get Single Post ----------------
router.get("/read/post/:postId", postController.getPostById);


// ---------------- Update Post ----------------
router.put(
  "/update/post/:postId",
  uploadImage.single("image"), 
  postController.updatePost
);


// ---------------- Delete Post ----------------
router.delete("/delete/post/:postId", postController.deletePost);


module.exports = router;
