import React from "react";
import { useNavigate } from "react-router";

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

const CategoryCard = ({ name, image }) => {
  // Get the current background color using the globalColorIndex
  const currentBackgroundColor = backgroundColors[globalColorIndex];

  // Increment the globalColorIndex for the next card
  globalColorIndex = (globalColorIndex + 1) % backgroundColors.length;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products?category=${name}`);
  }

  return (
    <div className="flex flex-col justify-center items-center hover:scale-110 transition duration-300 ease-in-out cursor-pointer" onClick={handleClick}>
      <div
        className={`flex flex-col justify-center items-center w-[90px] h-[90px] cursor-pointer rounded-[50%]  ${currentBackgroundColor}`}
      >
        <img
          src={image}
          alt={name}
          className={`w-full h-full rounded-full object-cover bg-red-200 p-2 ${currentBackgroundColor}`}
          style={{ contain: "content" }}
        />
      </div>
      <h1 className="text-[18px] font-bold">{name}</h1>
    </div>
  );
};

export default CategoryCard;
