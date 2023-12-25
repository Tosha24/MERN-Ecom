import { useSelector } from "react-redux";
import { useGetUserFavoritesQuery } from "../../redux/api/usersApiSlice";

const FavoritesCount = () => {
  const {
    data: favProducts,
    refetch,
    isLoading,
    isError,
  } = useGetUserFavoritesQuery();

  const favoriteCount = favProducts?.length || 0;

  return (
    <div className="absolute left-2 top-8">
      {favoriteCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
