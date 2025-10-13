



// import multer from "multer"

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/temp")

//   },
//   filename: function (req, file, cb) {
  
//     cb(null, file.originalname)
//   }
// })




// const upload = multer({ storage })

//  export default upload



import multer from "multer";

// ✅ Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Optional: you could add Date.now() to make filenames unique
  }
});

// ✅ File filter to allow only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG allowed."), false);
  }
};

// ✅ Multer middleware with both storage and filter
const upload = multer({
  storage,
  fileFilter
});

export default upload;
