import React from "react";
import HeartIcon from "./HeartIcon";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice.js";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddAndUpdateProductToCartMutation } from "../../redux/api/usersApiSlice.js";

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
const ProductCard = ({ product }) => {
  const [addAndUpdateProductToCart] = useAddAndUpdateProductToCartMutation();

  console.log(product);

  const handleAddToCart = async () => {
    try {
      await addAndUpdateProductToCart({
        productId: product._id,
        quantity: 1,
      });
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Something went wrong.. Try again");
    }
  };

  const currentBackgroundColor = backgroundColors[globalColorIndex];
  const anotherBackgroundColor =
    backgroundColors[(globalColorIndex + 1) % backgroundColors.length];

  globalColorIndex = (globalColorIndex + 1) % backgroundColors.length;

  return (
    <div
      className={`flex flex-col justify-center items-center relative h-[400px] rounded-lg ${currentBackgroundColor} p-2 shadow-slate-200 shadow-lg `}
    >
      <div
        className="flex flex-col justify-center items-center "
        onClick={() => {
          window.location.href = `/product/${product._id}`;
        }}
      >
        <img
          src={product?.image}
          alt={product?.name}
          className={`!w-[200px] !h-[200px] rounded-full object-cover mt-[-40px] border-2`}
          style={{ contain: "content" }}
        />

        <h1 className="text-[18px] font-bold flex flex-wrap mt-2 text-center">
          {product?.name.length > 20
            ? product?.name.substring(0, 40) + "..."
            : product?.name}
        </h1>
        <div className="flex flex-row justify-between items-center w-full mt-10 pl-4 pr-4">
          <p
            className={` text-[14px] font-bold flex flex-wrap text-center ${anotherBackgroundColor} border-2 border-black p-2 rounded-full`}
          >
            {product.brand}
          </p>
          <p className="text-lg text-black font-bold">${product.price}</p>
        </div>
      </div>
      <div className="absolute top-2 right-2 cursor-pointer">
        <HeartIcon product={product} />
      </div>
      <div
        onClick={handleAddToCart}
        className="absolute bottom-2 right-5 cursor-pointer"
      >
        <AiOutlineShoppingCart size={26} />
      </div>
    </div>
  );
};

export default ProductCard;
