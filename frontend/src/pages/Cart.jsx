import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const backgroundColors = [
  "bg-red-200",
  "bg-violet-200",
  "bg-green-200",
  "bg-pink-200",
  "bg-yellow-200",
  "bg-cyan-200",
  "bg-blue-200",
  "bg-rose-200",
  "bg-gray-200",
  "bg-indigo-200",
  "bg-fuchsia-200",
  "bg-emerald-200",
  "bg-teal-200",
  "bg-amber-200",
  "bg-orange-200",
  "bg-purple-200",
  "bg-lime-200",
  "bg-sky-200",
];

let globalColorIndex = 0;

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container mx-auto p-4">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
              <div className="flex-1">
                <h1 className="text-2xl font-semibold mb-4 text-center md:text-left">
                  Shopping Cart ({cartItems && cartItems.length})
                </h1>

                {cartItems.map((item, index) => {
                  const currentBackgroundColor =
                    backgroundColors[
                      (globalColorIndex + index) % backgroundColors.length
                    ];
                  const anotherBackgroundColor =
                    backgroundColors[
                      (globalColorIndex + index + 1) % backgroundColors.length
                    ];

                  return (
                    <div
                      key={item._id}
                      className={`flex flex-col md:flex-row items-center gap-4 p-2 rounded-xl shadow relative ${currentBackgroundColor} mb-4`}
                    >
                      <div className="w-28 h-28 md:w-48 md:h-48 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-[50%]"
                        />
                      </div>
                      <div className="flex-grow">
                        <Link
                          to={`/product/${item._id}`}
                          className="text-lg font-semibold text-black"
                        >
                          {item.name}
                        </Link>
                        <div className="flex justify-between lg:justify-normal  flex-wrap gap-2 items-center mt-2">
                          <span
                            className={`text-sm font-bold ${anotherBackgroundColor} p-2 rounded-3xl border border-black`}
                          >
                            {item.brand}
                          </span>
                          <span className="text-lg font-bold">
                            ₹ {item.price}
                          </span>
                        </div>
                      </div>
                      <div
                        className="
                    flex  flex-row
                    justify-center items-center
                    gap-2 md:absolute
                    bottom-2 right-2
                  "
                      >
                        <label htmlFor="quantity" className="text-sm font-bold">
                          Qty:
                        </label>

                        <select
                          className="
                        text-sm font-bold
                        bg-white
                        border-2 border-black
                        p-2 rounded-full
                      "
                          value={item.quantity}
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        className="text-red-500 absolute top-2 right-2"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash size="1.5em" />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div
                className={`w-full h-full  md:w-1/3 lg:w-1/4 shadow p-4 rounded-xl bg-slate-200 md:mt-12`}
              >
                <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                <p className="text-lg">
                  Items (
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                </p>
                <p className="text-2xl font-bold mb-4">
                  Total: ₹
                  {cartItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toFixed(2)}
                </p>
                <button
                  className="
                w-full
                bg-rose-500
                text-white
                font-semibold
                p-2
                rounded-xl
                mb-4
              "
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
