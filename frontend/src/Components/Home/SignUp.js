import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledFormComponent, SignInButton } from './StyleComponent';
import LeftComponent from './LeftComponent';
import validator from 'validator';

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const addUsers = () => {
    if (!name || !email || !password) {
      setIsInvalid(true);
      toast.error("All fields are required");
      return;
    }

    if (!validator.isEmail(email)) {
      setIsInvalid(true);
      toast.error("Please enter a valid email address");
      return;
    }

    const item = { name, email, password };

    axios.post(`${BaseUrl}userRoutes/addUsers`, item)
      .then(() => {
        toast.success("Account created successfully");
        setTimeout(() => {
          navigate("/");
        }, 3000); // Delay so toast displays
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Signup failed. Try again.");
        }
      });
  };

  return (
    <>
      <LeftComponent />
      <StyledFormComponent>
        <div style={{ height: "90vh", width: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{
            width: "70%", backgroundColor: "#fff", padding: "40px",
            borderRadius: "10px", boxShadow: "0 4px 8px #000", textAlign: "center",
          }}>
            <h1 style={{ color: "#009999", marginTop: "2px", marginBottom: "5px" }}>SIGN UP</h1><br />

            {/* Name Input */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "20px" }}>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%", padding: "10px",
                  border: isInvalid && name === "" ? "1px solid red" : "1px solid lightgrey",
                  borderRadius: "5px",
                }}
              />
            </div>

            {/* Email Input */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "20px" }}>
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%", padding: "10px",
                  border: isInvalid && !validator.isEmail(email) ? "1px solid red" : "1px solid lightgrey",
                  borderRadius: "5px",
                }}
              />
              <label style={{
                fontSize: 12, color: "red",
                display: (!validator.isEmail(email)) && isInvalid ? "block" : "none"
              }}>
                *Invalid Email
              </label>
            </div>

            {/* Password Input */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "20px" }}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%", padding: "10px",
                  border: isInvalid && password === "" ? "1px solid red" : "1px solid lightgrey",
                  borderRadius: "5px",
                }}
              />
            </div>

            {/* Sign Up Button */}
            <SignInButton
              onClick={addUsers}
              style={{ width: "60%" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#006666")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#009999")}
            >
              Sign Up
            </SignInButton>

            {/* Redirect to Login */}
            <div style={{ textAlign: "center", marginTop: "15px" }}>
              <p style={{ fontSize: "14px", color: "#555" }}>
                Already have an account?
                <span
                  style={{ color: "#009999", cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => navigate("/Login")}
                  onMouseEnter={(e) => (e.target.style.color = "#006666")}
                  onMouseLeave={(e) => (e.target.style.color = "#009999")}
                >
                  {" "}Sign in
                </span>
              </p>
            </div>
          </div>
        </div>
      </StyledFormComponent>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default SignUp;

