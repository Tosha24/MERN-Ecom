import express from "express";
import formidable from "express-formidable"; // formidable is a node.js module for parsing form data, especially file uploads.
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import {
  addProduct,
  addProductReview,
  fetchAllProducts,
  fetchNewProducts,
  fetchProductById,
  fetchProducts,
  fetchTopProducts,
  filterProducts,
  getBrandsUsingCategory,
  removeProduct,
  updateProductDetails,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/product-brands").get(getBrandsUsingCategory);

router.route("/").get(fetchProducts).post(authenticate, authorizeAdmin, formidable(), addProduct); // specify formidable() as a middleware to parse the form data.

router.route("/allproducts").get(fetchAllProducts)

router.route("/:id/reviews").post(authenticate, checkId, addProductReview)

router.get('/top', fetchTopProducts)

router.get('/new', fetchNewProducts)

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

router.route("/filtered-products").post(filterProducts)

export default router;
