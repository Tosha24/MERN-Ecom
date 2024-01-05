import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineHeart,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetUserCartQuery,
  useLogoutMutation,
} from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import Search from "../../components/Search";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const { data: cartItems } = useGetUserCartQuery();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
      setDropdownOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="hidden lg:flex flex-row w-full justify-between items-center p-4 bg-rose-400 z-100">
        <div className="flex flex-row gap-24">
          <div className="flex flex-row w-full">
            <Link to="/">
              <h1 className="text-3xl font-bold text-white">E-Kart</h1>
            </Link>
          </div>
          <div className="w-full">
            <Search />
          </div>
        </div>
        <div className="flex flex-row space-x-6 mr-6">
          <Link to="/cart" className="flex items-center justify-start realtive">
            {userInfo && (
              <span className="absolute top-[0.78rem] right-[153px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems && cartItems.length}
              </span>
            )}
            <AiOutlineShoppingCart size={26} />
          </Link>

          <Link to="/favorite" className="flex items-center justify-start">
            {userInfo && (
              <div className="relative">
                <FavoritesCount />
              </div>
            )}
            <AiOutlineHeart size={26} />
          </Link>
          {userInfo ? (
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-start bg-rose-200 p-3 rounded-full transform transition duration-300 ease-in-out"
            >
              <AiOutlineUser size={23} />
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center justify-start  hover:bg-rose-200 hover:p-1 pl-3 rounded-md ml-5 hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <AiOutlineLogin size={23} />
              <span className="">LOGIN</span>{" "}
            </Link>
          )}
        </div>

        {dropdownOpen && (
          <div className="absolute top-16 right-2 p-3 space-y-4 w-40 bg-rose-200 rounded-md z-50">
            <Link
              to="/account"
              className="flex items-center justify-start gap-2  rounded-md"
            >
              <AiOutlineUserAdd size={23} />
              <span>PROFILE</span>{" "}
            </Link>
            <Link
              to="/user-orders"
              className="flex items-center justify-start gap-2  rounded-md"
            >
              <AiOutlineShopping size={23} />
              <span>MY ORDERS</span>{" "}
            </Link>
            <button
              onClick={logoutHandler}
              className="flex items-center justify-start gap-2 rounded-md"
            >
              <AiOutlineLogout size={23} />
              <span>LOGOUT</span>{" "}
            </button>
          </div>
        )}
      </nav>

      <div className="lg:hidden z-[999] w-full flex! flex-row! justify-between! items-center! ">
        <div
          className={`lg:hidden flex items-center justify-center rounded-3xl fixed top-8 left-5 w-10 h-10 z-[500] cursor-pointer ${
            showSidebar
              ? "bg-rose-400"
              : "bg-rose-300 transition duration-300 ease-in-out"
          }`}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
        <div className="flex items-center justify-center h-[15vh]">
          <h1 className="text-2xl font-bold text-black">E-Kart</h1>
        </div>
      </div>

      {showSidebar && (
        <div className="lg:hidden flex flex-col py-20 h-[100vh] w-[100vw] bg-rose-300 z-500 transition duration-300 ease-in-out">
          <div className="flex flex-col justify-start items-center h-[70vh]  space-y-2">
            <Link
              to="/"
              className="flex items-center gap-2 justify-center hover:bg-rose-200 p-3 rounded-md hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <AiOutlineHome size={26} />
              <span>HOME</span>{" "}
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-2 justify-center   hover:bg-rose-200 p-3 rounded-md hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <AiOutlineShoppingCart size={26} />
              <span>CART</span>{" "}
            </Link>

            <Link
              to="/favorite"
              className="flex items-center gap-2 justify-center  hover:bg-rose-200 p-3 rounded-md hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <AiOutlineHeart size={26} />
              <span>FAVORITES</span>{" "}
            </Link>

            <Link
              to="/user-orders"
              className="flex items-center justify-center gap-2 hover:bg-rose-200 p-3 rounded-md hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <AiOutlineShopping size={26} />
              <span>ORDERS</span>{" "}
            </Link>

            <Link
              to="/account"
              className="flex items-center justify-center gap-2 hover:bg-rose-200 p-3 rounded-md hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <AiOutlineUserAdd className="mr-2" size={26} />
              <span className="">ACCOUNT</span>{" "}
            </Link>

            <button
              onClick={logoutHandler}
              className="flex items-center justify-center  hover:bg-rose-200 p-3 rounded-md hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <AiOutlineLogout className="mr-2" size={26} />
              <span className="">LOGOUT</span>{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
