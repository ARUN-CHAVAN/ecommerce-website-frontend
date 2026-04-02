import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCartByUser,
  removeCartItem,
  getAllProducts,
  decreaseCart,
  addToCart
} from "../service/api";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
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

  const uid = getUserIdFromToken();

  getCartByUser(uid).then(setCart);
  getAllProducts().then(setProducts);
}, []);

  const handleRemove = (id) => {
    removeCartItem(id).then(() => {
      setCart(cart.filter((item) => item.id !== id));
    });
  };
  const fetchCart = () => {
    const uid = getUserIdFromToken();
     getCartByUser(uid).then(setCart);
  };
  const getProduct = (productId) => {
    return products.find((p) => p.id === productId);
  };
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };
  const handleDecrease = async (productId) => {
    const uid = getUserIdFromToken();
await decreaseCart(uid, productId);
    fetchCart();
  };
  const handleIncrease = async (productId) => {
    const uid = getUserIdFromToken();
await addToCart(uid, productId);
    fetchCart();
  };

  return (
    <div>
      <h2 className="text-center mb-4"> My Carts</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="row">
          {cart.map((item) => {
            const product = getProduct(item.productId);

            return (
              <div className="col-md-4 mb-3" key={item.id}>
                <div className="card p-3 shadow">
                  {product && (
                    <>
                      <img
                        src={`/images/${product.imageUrl}`}
                        className="card-img-top"
                        style={{ height: "150px", objectFit: "contain" }}
                      />
                      <h5>{product.name}</h5>
                      <p>{product.description}</p>
                      <p>₹{product.price}</p>
                    </>
                  )}
                  <p>Quantity: {item.quantity}</p>
                  <div className="d-flex align-items-center justify-content-center m-1 gap-2">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleDecrease(item.productId)}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      className="btn btn-success"
                      onClick={() => handleIncrease(item.productId)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className="text-end mt-4">
            <h4>Total: ₹{calculateTotal()}</h4>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
