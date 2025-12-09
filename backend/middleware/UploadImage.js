// const multer=require("multer")

// const StoreImage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"imageDocuments")
//     },
//     filename:(req,file,cb)=>{
//         cb(null, file.originalname)
//     }
// })

// const uploadImage=multer({
//     storage:StoreImage
// }) 

// module.exports=uploadImage

// const multer = require("multer");
// const path = require("path");

// // Make sure "imageDocuments" folder exists in your backend root

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "imageDocuments")); 
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + file.originalname;
//     cb(null, uniqueName);
//   }
// });

// const uploadImage = multer({ storage });

// module.exports = uploadImage;


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products", // any folder name
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    transformation: [{ width: 800, height: 800, crop: "limit" }]
  }
});

const uploadImage = multer({ storage });

module.exports = uploadImage;
