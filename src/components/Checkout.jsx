import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartByUser, getAllProducts, placeOrder } from "../service/api";

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate=useNavigate();
    const [userId,setUserId]=useState(null);

    useEffect(() => {
    const loadData = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const payload = JSON.parse(atob(token.split(".")[1]));
        const uid = payload.sub;

        setUserId(uid);

        const cartData = await getCartByUser(uid);
        const productData = await getAllProducts();

        console.log("CART:", cartData);
        console.log("PRODUCTS:", productData);

        setCart(cartData);
        setProducts(productData);
    };

    loadData();
}, []);
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const product = products.find(p =>String(p.id) === String(item.productId));
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    };

    const handleOrder = async () => {
        const token=localStorage.getItem("token");
        
        if(!token){
            navigate("/login");
            return;
        }

    try {
        await placeOrder();
        setCart([]);
        navigate("/success");
    } catch (err) {
        console.error(err);
        alert("Error placing order");
    }
};
if (!products.length || !cart.length) {
    return <h3 className="text-center mt-5">Loading...</h3>;
}

    return (
        <div className="container">
            
            <h2 className="text-center mb-4">Check And Place Your Orders</h2>
  
            {cart.map(item => {
                const product = products.find(p =>Number(p.id) === Number(item.productId));
                           console.log("ITEM:", item);
console.log("MATCHED PRODUCT:", product);
console.log("CART:", cart);
console.log("PRODUCTS:", products);
                return (
         
                    <div key={item.id} className="card mb-3 p-3">
                       <h5>{product ? product.name : " Product not found"}</h5>
<p>Price: ₹{product ? product.price : " Missing"}</p>
                    </div>
                );
            })}

            <h4>Total: ₹{calculateTotal()}</h4>

            <button className="btn btn-success mt-3" onClick={handleOrder}>
                Place Order
            </button>
        </div>
    );
};

export default Checkout;