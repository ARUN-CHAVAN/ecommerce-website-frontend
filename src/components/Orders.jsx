import { useEffect, useState } from "react";
import { getOrdersByUser } from "../service/api";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const uid = getUserIdFromToken();
      const data = await getOrdersByUser(uid);
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders");
    }
  };
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders found</p>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div className="col-md-4 mb-4" key={order.orderId}>
              <div className="card shadow h-100 p-3" style={{backgroundColor:"lightgreen"}}>
                <h5 className="mb-2">Order ID: {order.orderId}</h5>

                <p className="mb-1">
                  <strong>Total:</strong> ₹{order.totalAmount}
                </p>

                <p className="mb-1">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      order.status === "DELIVERED"
                        ? "bg-success"
                        : order.status === "SHIPPED"
                          ? "bg-warning"
                          : "bg-secondary"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>

                <p className="mb-2 text-muted" style={{ fontSize: "14px" }}>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "N/A"}
                </p>

                <hr />

                <h6>Items:</h6>
                <ul className="list-group list-group-flush">
                  {order.items?.map((item) => (
                    <li className="list-group-item px-0" key={item.productId}>
                      {item.productName}
                      <br />
                      <small className="text-muted">
                        ₹{item.price} × {item.quantity} = ₹
                        {item.price * item.quantity}
                      </small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
