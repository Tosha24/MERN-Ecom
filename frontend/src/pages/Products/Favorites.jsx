import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice.js";
import Product from "./Product.jsx";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);
  
  return (
    <div className="ml-[10rem]">
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
        FAVORITE PRODUCTS ({favorites.length})
      </h1>

      <div className="flex flex-wrap">
        {favorites && favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Favorites