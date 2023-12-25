import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ singleProduct }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="w-[20rem] h-[22rem] relative bg-[#1A1A1A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <section className="relative">
        <Link to={`/product/${singleProduct._id}`}>
          <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            {singleProduct?.brand}
          </span>
          <img
            className="cursor-pointer w-full rounded-t-lg"
            src={singleProduct.image}
            alt={singleProduct.name}
            style={{ height: "200px", objectFit: "fill" }}
          />
        </Link>
        <HeartIcon product={singleProduct} />
      </section>

      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl text-whiet dark:text-white">{singleProduct?.name}</h5>

          <p className="font-semibold text-pink-500">
            {singleProduct?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>

        <p className="mb-3 font-normal text-[#CFCFCF]">
          {singleProduct?.description?.substring(0, 34)} ...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${singleProduct._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2 rounded-full"
            onClick={() => addToCartHandler(singleProduct, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;