import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice.js";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="mx-5">
      <h2 className="text-2xl font-semibold mt-4 mb-4 text-center">
        My Orders
      </h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <div className="flex flex-col gap-4">
          {orders?.map((order) =>
            order?.orderItems?.map((item) => (
              <div
                key={order._id}
                className="flex flex-col bg-fuchsia-100 p-3 rounded-lg border border-green-800 gap-3"
              >
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border"
                  />
                  <div>
                    <p className="text-lg font-semibold">
                      {item?.name.substring(0, 25) + "..."}
                    </p>
                    <p>₹{item?.price}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p>Qty: {item?.quantity}</p>
                  <p>Date: {order?.createdAt?.substring(0, 10)}</p>
                  <p>Total: ₹{order?.totalPrice}</p>
                  <div>
                    {order?.isPaid ? (
                      <span className="p-2 bg-green-300 rounded-full">
                        Paid
                      </span>
                    ) : (
                      <span className="p-2 bg-red-300 rounded-full">
                        Not Paid
                      </span>
                    )}
                  </div>
                  <div>
                    {order?.isDelivered ? (
                      <span className="p-2 bg-green-300 rounded-full">
                        Delivered
                      </span>
                    ) : (
                      <span className="p-2 bg-red-300 rounded-full">
                        In Process
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/order/${order?._id}`}
                    className="bg-pink-500 text-white py-1 px-2 rounded-md hover:bg-pink-600"
                  >
                    More
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserOrder;