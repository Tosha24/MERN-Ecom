import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/productApiSlice";
import Filter from "../../components/Filter";
import ProductCard from "../Products/ProductCard.jsx";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const { data: Products } = useGetProductsQuery({ category });
  const [products, setProducts] = useState([]);
  const [showProduct, setshowProduct] = useState(true);

  useEffect(() => {
    if (Products) {
      setProducts(Products);
    }
  }, [Products]);

  console.log(showProduct);

  const displayProducts = products.length > 0 ? products : Products;

  return (
    <div className="flex flex-row">
      <Filter
        category={category}
        setProducts={setProducts}
        setshowProduct={setshowProduct}
      />

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 m-3">
        {showProduct && displayProducts ? (
          displayProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <h1>No Products Found</h1>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
