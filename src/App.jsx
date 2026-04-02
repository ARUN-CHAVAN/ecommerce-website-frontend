import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Register from "./components/Register";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import Orders from "./components/Orders";
import Login from "./components/Login";

function App() {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">
          E-Commerce
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Products
          </Link>
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
              <Link className="nav-link" to="/orders">
                Orders
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
              <Link className="nav-link" to="/login">
                Login
              </Link> 
              <button className="btn btn-danger btn-sm ms-2 align-self-center" onClick={logout}>
                Logout
              </button>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
