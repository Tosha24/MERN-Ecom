import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAddToFavoritesMutation, useGetUserFavoritesQuery, useRemoveFavoritesMutation } from "../../redux/api/usersApiSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const HeartIcon = ({ product }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const [isFavorite, setIsFavorite] = useState(false);

  const [addToFavorites] = useAddToFavoritesMutation();
  const [removeFromFavorites] = useRemoveFavoritesMutation();

  const { data: favProducts, refetch } = useGetUserFavoritesQuery();

  useEffect(() => {
    // Assuming favProducts is an array of favorite products for the user
    const isProductFavorite = favProducts?.some((favProduct) => favProduct._id === product._id);
    setIsFavorite(isProductFavorite);
  }, [favProducts, product._id]);

  const toggleFavorites = async () => {
    if (!userInfo) {
      toast.error("Login to add to favorites");
      return;
    }

    if (isFavorite) {
      await removeFromFavorites({
        userId: userInfo._id,
        productId: product._id,
      });
      refetch();
      setIsFavorite(false);
      toast.success("Removed from favorites");
    } else {
      await addToFavorites({
        userId: userInfo._id,
        productId: product._id,
      });
      refetch();
      setIsFavorite(true);
      toast.success("Added to favorites");  
    }
  };

  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavorites}
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  );
};

export default HeartIcon;
