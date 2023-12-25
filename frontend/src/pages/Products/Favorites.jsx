import { useGetUserFavoritesQuery } from "../../redux/api/usersApiSlice.js";
import Product from "./Product.jsx";

const Favorites = () => {
  const {
    data: favProducts,
    refetch,
    isLoading,
    isError,
  } = useGetUserFavoritesQuery();
  
  return (
    <div className="ml-[10rem]">
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
        FAVORITE PRODUCTS ({favProducts?.length})
      </h1>

      <div className="flex flex-wrap">
        {favProducts && favProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Favorites