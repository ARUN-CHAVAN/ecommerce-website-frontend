import { useState } from "react";
import { loginUser } from "../service/api";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState("");
  const navigate=useNavigate();


const handleLogin = async (e) => {
  e.preventDefault();

  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail) {
    setError("Email is required");
    return;
  }

  if (!trimmedPassword) {
    setError("Password is required");
    return;
  }

  try {
    const token = await loginUser(trimmedEmail, trimmedPassword);

    localStorage.setItem("token", token);
    setError("");
    navigate("/");
  } catch (err) {
    setError("Invalid email or password");
  }
};
  return (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card shadow p-4" style={{ width: "400px", borderRadius: "10px" }}>
      
      <h3 className="text-center mb-3">Login</h3>
      <p className="text-start mb-4 text-danger">
        Please login to continue
      </p>
     

      <form onSubmit={handleLogin}>
        
        <div className="mb-3">
          <label className="form-label text-start d-block ">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>{ setEmail(e.target.value) ;
              setError("");
            }}
            

          />
        </div>

        <div className="mb-3">
          <label className="form-label text-start d-block">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>{setPassword(e.target.value);
              setError("");
            }}
            
          />
           {error && (
  <p className="text-danger text-center">{error}</p>
)}
        </div>

        <button className="btn btn-primary w-100 mb-3">
          Login
        </button>

        <p className="text-center mb-0">
          New user? <a href="/register">Register here</a>
        </p>

      </form>
    </div>
  </div>
);
};

export default Login;