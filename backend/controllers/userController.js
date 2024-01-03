import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";
import Product from "../models/productModel.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs");
  }

  const userExists = await User.findOne({ email });
  if (userExists){
    res.status(403)
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    generateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordValid) {
      generateToken(res, existingUser._id);

      return res.status(200).json(existingUser);
    }else{
      res.status(400)
      throw new Error('Password doesn\'t match')
    }
  }else{
    res.status(400)
    throw new Error("User does not exists")
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });

  res.status(200).json({ message: "Logged Out successfully!" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();
    generateToken(res, updatedUser._id);
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }

    await user.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin || user.isAdmin);

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const addFavorites = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const isProductInFavorites = user.favorites.find(
      (favorite) => favorite.toString() === productId.toString()
    );
    if (isProductInFavorites) {
      throw new Error("Product already in favorites");
    }

    user.favorites.push(productId);
    await user.save();

    res.status(200).json({ message: "Product added to favorites" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getUserFavorites = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites").exec();
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

const removeFavorites = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const isProductInFavorites = user.favorites.find(
      (favorite) => favorite.toString() === productId.toString()
    );
    if (!isProductInFavorites) {
      throw new Error("Product not in favorites");
    }

    user.favorites = user.favorites.filter(
      (favorite) => favorite.toString() !== productId.toString()
    );
    await user.save();
    res.status(200).json({ message: "Product removed from favorites" });
  } catch (error) {
    res.status(500).send("Internal server error")
  }
});

export {
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
};
