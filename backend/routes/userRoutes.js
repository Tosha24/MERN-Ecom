import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
  addFavorites,
  getUserFavorites,
  removeFavorites,
  addAndUpdateProductToCart,
  getUserCart,
  removeProductFromCart,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Cart routes
router.route("/cart").post(authenticate, addAndUpdateProductToCart);
router.route("/cart").get(authenticate, getUserCart);
router.route("/cart").delete(authenticate, removeProductFromCart);


router.route("/favorites").get(authenticate, getUserFavorites);
router.route("/favorites").post(authenticate, addFavorites);
router.route("/favorites").delete(authenticate, removeFavorites);

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

// ADMIN ROUTES
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default router;
