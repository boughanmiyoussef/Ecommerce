const express = require('express');
const router = express.Router();
const Product = require('./products.model'); // Only import Product once
const Reviews = require('../reviews/reviews.model'); // Import Reviews model
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');


// Post A Product
router.post("/create-product", async (req, res) => {
  try {
    const newProduct = new Product({ ...req.body });

    const savedProduct = await newProduct.save();
    // Calculate Reviews
    const reviews = await Reviews.find({ productId: savedProduct.id });
    if (reviews.length > 0) {
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        savedProduct.rating = averageRating;
        await savedProduct.save();
    }
    res.status(201).send(savedProduct);  // Send the saved product as the response

  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const { category, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    if (category && category !== "all") {
      filter.category = category;
    }
    if (color && color !== "all") {
      filter.color = color;
    }
    if (minPrice && maxPrice !== "all") {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && !isNaN(max)) {
        filter.price = { $gte: min, $lte: max }; // Fixed typo here
      }
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalProducts = await Product.countDocuments(filter); // Fixed method name here
    const totalPages = Math.ceil(totalProducts / parseInt(limit));

    const products = await Product.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "email")
      .sort({ createdAt: -1 });

    // Sending multiple values as an object
    res.status(200).json({ products, totalPages, totalProducts });

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});



// Get a single product by its ID
router.get("/:id", async (req, res) => {
    try {
      const productId = req.params.id;
  
      // Find the product by its ID
      const product = await Product.findById(productId).populate("author", "email");
  
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
  
      res.status(200).send(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
  });
 
  
  // Update a product by its ID
router.patch("/update-product/:id", verifyToken, verifyAdmin ,async (req, res) => {
    try {
      const productId = req.params.id;
      const updatedProduct = await Product.findByIdAndUpdate(productId, {...req.body}, { new: true });
    
      if (!updatedProduct) {
        return res.status(404).send({ message: "Product not found" });
      }
  
      res.status(200).send(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
  });
  

// Delete a product by its ID
router.delete("/delete-product/:id", async (req, res) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await Product.findByIdAndDelete(productId);
      
      if (!deletedProduct) {
        return res.status(404).send({ message: "Product not found" });
      }

      await Reviews.deleteMany({productId: productId})
      
      res.status(200).send({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
  });
   

// Get related products by category
router.get("/related/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).send({ message: "Product ID not found" });
      }
  
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
  
      console.log('Found product:', product);
  
      const titleRegex = new RegExp(
        product.name.split(" ").filter(word => word.length > 1).join("|"),
        "i"
      );
  
      console.log('Generated Regex:', titleRegex);
  
      const relatedProducts = await Product.find({
        _id: { $ne: product._id },
        $or: [
          { category: product.category },
          { name: { $regex: titleRegex } }
        ]
      })
      .select("name category price image")
      .limit(5);
  
      if (relatedProducts.length === 0) {
        return res.status(404).send({ message: "No related products found" });
      }
  
      // Send the related products response
      res.status(200).send(relatedProducts);
      
    } catch (error) {
      console.error('Error fetching related products:', error);
      res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
  });
  
  
  

module.exports = router;
