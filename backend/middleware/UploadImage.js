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

const multer = require("multer");
const path = require("path");

// Make sure "imageDocuments" folder exists in your backend root

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "imageDocuments")); 
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const uploadImage = multer({ storage });

module.exports = uploadImage;
