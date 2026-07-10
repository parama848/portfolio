import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.mjs";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(process.cwd(), "uploads"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"Portfolio-Projects",
        allowed_format:["jpg", "jpeg", "png", "webp"],

        transformation:[
            {
                width:1200,
                crop:"limit",
            },
        ],
    },

});

const upload = multer({
    storage
})

export default upload;