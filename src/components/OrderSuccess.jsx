import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <h2 className="text-success"> Order Placed Successfully!</h2>
      <p>Thank you for your purchase</p>

      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate("/orders")}
      >
        View My Orders
      </button>
    </div>
  );
};

export default OrderSuccess;