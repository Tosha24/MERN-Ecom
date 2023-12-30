import express from "express";
import {
  authenticate, authorizeAdmin
} from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  getTotalOrdersCount,
  getTotalSalesAmount,
  calcualteTotalSalesByDate,
  getOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/orderController.js";
const router = express.Router();

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAdmin, getAllOrders);

router.route("/myorders").get(authenticate, getUserOrders);
router
  .route("/total-orders")
  .get(authenticate, authorizeAdmin, getTotalOrdersCount);
router
  .route("/totalsalesamount")
  .get(authenticate, authorizeAdmin, getTotalSalesAmount);

router
  .route("/totalsalesbydate")
  .get(authenticate, authorizeAdmin, calcualteTotalSalesByDate);

router.route("/:id").get(authenticate, getOrderById);
router.route("/:id/pay").put(authenticate, markOrderAsPaid);
router
  .route("/:id/deliver")
  .put(authenticate, authorizeAdmin, markOrderAsDelivered);
export default router;
