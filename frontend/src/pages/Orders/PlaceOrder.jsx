import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8">
        <ProgressSteps step1 step2 step3 />
        {cart && cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="flex flex-col w-full p-4">
            {cart && cart.cartItems.map((item, index) => (
              <div key={index} className="mb-4 border-b border-gray-300 pb-4">
                <div className="flex">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div className="flex-grow">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-lg font-semibold"
                    >
                      {item.name.substring(0, 40) + "..."}
                    </Link>
                    <div className="text-gray-600">Quantity: {item.quantity}</div>
                    <div className="text-gray-600">
                      Price: ${item.price.toFixed(2)}
                    </div>
                    <div className="text-gray-600">
                      Total: ${(item.quantity * item.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 p-4">
          <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
          <div className="flex flex-col bg-rose-100 p-4 rounded-lg mb-4">
            <ul className="text-lg mb-4">
              <li>
                <span className="font-semibold">Items:</span> ${cart.itemsPrice}
              </li>
              <li>
                <span className="font-semibold">Shipping:</span> $
                {cart.shippingPrice}
              </li>
              <li>
                <span className="font-semibold">Tax:</span> ${cart.taxPrice}
              </li>
              <li>
                <span className="font-semibold">Total:</span> ${cart.totalPrice}
              </li>
            </ul>

            {error && <Message variant="danger">{error.data.message}</Message>}

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
              <span className="font-">Method:</span> {cart.paymentMethod}
            </div>
          </div>

          <button
            type="button"
            className={`bg-rose-500 text-white py-2 px-4 rounded-full text-lg w-full mb-4 hover:bg-rose-600`}
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;