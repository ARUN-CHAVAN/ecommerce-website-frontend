import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../service/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!name.trim()) {
      setNameError("Name cannot be empty");
      valid = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!isValidEmail(email.trim())) {
      setEmailError("Enter valid email (e.g. user@gmail.com)");
      valid = false;
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else if (!isValidPassword(password.trim())) {
      setPasswordError("Min 6 chars, include letters & numbers");
      valid = false;
    }

    if (!valid) return;

    try {
      await addUser({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      setEmailError("Registration failed. Try different email");
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow p-4"
        style={{ width: "400px", borderRadius: "10px" }}
      >
        <h3 className="text-center mb-3">Create Account</h3>
        <p className="text-start text-muted mb-4">Register to get started</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-start d-block">Name</label>
            <input
              className={`form-control ${nameError ? "is-invalid" : ""}`}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                setName(value);

                if (!value.trim()) {
                  setNameError("Name cannot be empty");
                } else {
                  setNameError("");
                }
              }}
            />

            {nameError && <div className="invalid-feedback">{nameError}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label text-start d-block">Email</label>
            <input
              type="email"
              className={`form-control ${emailError ? "is-invalid" : ""}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                if (!value.trim()) {
                  setEmailError("Email is required");
                } else if (!isValidEmail(value.trim())) {
                  setEmailError("Enter valid email (e.g. user@gmail.com)");
                } else {
                  setEmailError("");
                }
              }}
            />

            {emailError && <div className="invalid-feedback">{emailError}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label text-start d-block">Password</label>
            <input
              type="password"
              className={`form-control ${passwordError ? "is-invalid" : ""}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);

                if (!value.trim()) {
                  setPasswordError("Password is required");
                } else if (!isValidPassword(value.trim())) {
                  setPasswordError("Min 6 chars, include letters & numbers");
                } else {
                  setPasswordError("");
                }
              }}
            />

            {passwordError && (
              <div className="invalid-feedback">{passwordError}</div>
            )}
          </div>

          <button
            className="btn btn-success w-100"
            disabled={nameError || emailError || passwordError}
          >
            Register
          </button>

          <p className="text-center mb-0">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
