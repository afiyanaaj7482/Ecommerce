import uploadOnCloudinary from "../config/cloudinary.js";
import Product from '../Model/productModel.js';

const addProduct = async (req, res) => {
  try {
    console.log("FILES RECEIVED FROM MULTER:", JSON.parse(JSON.stringify(req.files)));
    console.log("REQUEST BODY:", req.body);

    // ✅ Step 1: Check if required files exist
    if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3) {
      return res.status(400).json({ 
        message: "Missing required images. Please upload at least 3 images." 
      });
    }

    // ✅ Step 2: Upload to Cloudinary with better error handling
    let image1, image2, image3, image4;

    try {
      image1 = await uploadOnCloudinary(req.files.image1[0].path);
      console.log("Image1 upload result:", image1 ? "Success" : "Failed");
    } catch (error) {
      console.error("Image1 upload error:", error);
      return res.status(400).json({ message: "Failed to upload image1" });
    }

    try {
      image2 = await uploadOnCloudinary(req.files.image2[0].path);
      console.log("Image2 upload result:", image2 ? "Success" : "Failed");
    } catch (error) {
      console.error("Image2 upload error:", error);
      return res.status(400).json({ message: "Failed to upload image2" });
    }

    try {
      image3 = await uploadOnCloudinary(req.files.image3[0].path);
      console.log("Image3 upload result:", image3 ? "Success" : "Failed");
    } catch (error) {
      console.error("Image3 upload error:", error);
      return res.status(400).json({ message: "Failed to upload image3" });
    }

    // ✅ Step 3: Upload image4 if it exists (make it optional)
    if (req.files.image4 && req.files.image4[0]) {
      try {
        image4 = await uploadOnCloudinary(req.files.image4[0].path);
        console.log("Image4 upload result:", image4 ? "Success" : "Failed");
      } catch (error) {
        console.error("Image4 upload error:", error);
        // Don't fail the entire request if image4 fails
        image4 = null;
      }
    }

    // ✅ Step 4: Validate that required images were uploaded
    if (!image1 || !image2 || !image3) {
      return res.status(400).json({ 
        message: "Failed to upload required images. Please try again." 
      });
    }

    // ✅ Step 5: Prepare data
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // ✅ Step 6: Handle sizes parsing safely
    let sizesArray = [];
    try {
      sizesArray = sizes ? JSON.parse(sizes) : [];
    } catch (error) {
      console.error("Error parsing sizes:", error);
      sizesArray = [];
    }

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: sizesArray,
      bestseller: bestseller === "true" || bestseller === true,
      date: Date.now(),
      image1: image1.url || image1.secure_url,
      image2: image2.url || image2.secure_url,
      image3: image3.url || image3.secure_url,
      image4: image4 ? (image4.url || image4.secure_url) : null, // image4 is optional
    };

    console.log("Product data to save:", productData);

    // ✅ Step 7: Save product
    const product = await Product.create(productData);
    
    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product
    });

  } catch (error) {
    console.error("AddProduct error:", error);
    return res.status(500).json({ 
      message: `Server error: ${error.message}`,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export default addProduct;





export const listProduct = async (req,res) => {
     
    try {
        const product = await Product.find({});
        return res.status(200).json(product)

    } catch (error) {
        console.log("ListProduct error")
    return res.status(500).json({message:`ListProduct error ${error}`})
    }
}


export const removeProduct = async (req,res) => {
    try {
        let {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
         return res.status(200).json(product)
    } catch (error) {
        console.log("RemoveProduct error")
    return res.status(500).json({message:`RemoveProduct error ${error}`})
    }
    
}
