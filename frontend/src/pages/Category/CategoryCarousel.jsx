import React from "react";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import CategoryCard from "./CategoryCard";

const CategoryCarousel = () => {
  const { data: categories } = useFetchCategoriesQuery();
  return (
    <div className="flex justify-center items-center flex-row space-x-8 mt-5">
      {categories &&
        categories.map((category) => (
          <CategoryCard
            key={category._id}
            name={category.name}
            image={category.image}
          />
        ))}
    </div>
  );
};

export default CategoryCarousel;
