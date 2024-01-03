import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields; //req.fields is an object containing the fields submitted along with the files in the form (formidable)

    if (!name || !price || !description || !category || !quantity || !brand) {
      return res.status(400).send("Please fill all fields");
    }

    const product = new Product({ ...req.fields });
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("Internal Server error")
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, quantity, brand } = req.fields;

    if (!name || !price || !description || !category || !quantity || !brand) {
      return res.status(400).send("Please fill all fields");
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { ...req.fields },
      { new: true } //to return the updated product
    );

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("Internel server error");
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if(!product){
      return res.status(404).send("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const { category } = req.query;
    
    let products = [];
    if(category){
      const categoryData = await Category.findOne({ name: category });
      products = await Product.find({ category: categoryData._id });
    }
    else{
      products = await Product.find({});
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const product = await Product.findById(id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(10);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(8);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  // TODO 
  try {
    const { checkedBrands, category, minPrice, maxPrice } = req.body;
    const categoryData = await Category.findOne({name: category});

    let queryConditions = { category: categoryData._id };
    
    if (checkedBrands && checkedBrands.length > 0) {
      queryConditions.brand = { $in: checkedBrands };
    }

    if (minPrice > 0 && maxPrice > 0) {
      queryConditions.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice > 0) {
      queryConditions.price = { $gte: minPrice };
    } else if (maxPrice > 0) {
      queryConditions.price = { $lte: maxPrice };
    }

    const filteredProducts = await Product.find(queryConditions);

    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// TODO: getProductByCategory

const getBrandsUsingCategory = asyncHandler(async (req, res) => {
  try {
    const { category } = req.query;

    let brands = [];
    if(!category){
      brands = await Product.find({}).distinct("brand");
    }
    else{
      const categoryData = await Category.findOne({ name: category });

      if (categoryData) {
        brands = await Product.find({
          category: categoryData._id,
        }).distinct("brand");
      } else {
        res.status(404).send("Category not found");
      }
    }
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
  getBrandsUsingCategory,
};
