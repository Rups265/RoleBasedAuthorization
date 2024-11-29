const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary.utils");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = file.originalname.replace(/\s+/g, "_").split(".")[0];
    const folderName = "blogImage";
    return {
      folder: folderName,
      public_id: fileName + "_" + uniqueSuffix,
      allowed_formats: ["jpg", "jpeg", "png"],
      use_filename: true,
      overwrite: true,
    };
  },
});

const uploadBlogImages = multer({ storage: storage });

module.exports = uploadBlogImages;
