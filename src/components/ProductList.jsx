import { useEffect, useState } from "react";
import { getAllProducts, addToCart } from "../service/api";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate=useNavigate();


    useEffect(() => {
        getAllProducts().then(setProducts);
    }, []);
    const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
     console.log(payload.sub);
    return payload.sub;
   
};

    const handleAddToCart = async (productId) => {
    const userId = getUserIdFromToken();

    if (!userId) {
        alert("Please login first");
        navigate("/login");
        return;
    }

    console.log("sending", userId, productId);

    try {
        await addToCart(userId, productId);
        alert("Added to cart!");
    } catch (error) {
        console.error("Error adding to cart");
    }
};
    return (
        <div>
            <h2 className="text-center mb-4">Products</h2>
            <div className="row g-2">
  {products.map(p => (
    <div className="col-6 col-md-4 mb-2" key={p.id}>
      <div className="card h-100 shadow">
        <img
          src={`/images/${p.imageUrl}`}
          className="card-img-top mt-1"
          alt={p.name}
          style={{ height: "120px", objectFit: "contain", padding: "5px"  }}
        />
        <div className="card-body text-center">
          <h5 className="card-title" style={{ fontSize: "0.9rem" }}>{p.name}</h5>
          <p className="card-text" style={{ fontSize: "0.8rem", height: "40px", overflow: "hidden" }}>
            {p.description}
          </p>
          <p className="fw-bold" style={{ fontSize: "0.9rem" }}>₹{p.price}</p>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleAddToCart(p.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
        </div>
    );
};

export default ProductList;