import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledFormComponent, SignInButton } from './StyleComponent';
import LeftComponent from './LeftComponent';
import validator from 'validator';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const logincheck = () => {
    if (!email || !password) {
      setIsInvalid(true);
      toast.error("All fields are required");
      return;
    }

    if (!validator.isEmail(email)) {
      setIsInvalid(true);
      toast.error("Please enter a valid email");
      return;
    }

    const item = { email, password };

    axios.post(`${BaseUrl}userRoutes/Login`, item)
      .then((res) => {
        if (res.data.msg === "ok") {
          localStorage.setItem("token", res.data.token);
          toast.success("Login successful");
          setTimeout(() => {
            navigate("/Home");
          }, 1500);
        } else {
          toast.error(res.data.msg || "Login failed");
        }
      })
      .catch((err) => {
        const msg = err.response?.data?.msg || "Server error. Please try again.";
        toast.error(msg);
      });
  };

  return (
    <>
      <LeftComponent />
      <StyledFormComponent>
        <div style={{ height: "90vh", width: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{
            width: "70%", backgroundColor: "#fff", padding: "40px",
            borderRadius: "10px", boxShadow: "0 1px 2px rgb(72, 72, 72)", textAlign: "center",
          }}>
            <h1 style={{ color: "#009999", marginTop: "2px", marginBottom: "5px" }}>LOGIN</h1><br />

            {/* Email */}
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

            {/* Password */}
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

            {/* Login Button */}
            <SignInButton
              onClick={logincheck}
              style={{ width: "100%" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#006666")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#009999")}
            >
              Sign In
            </SignInButton>

            {/* Redirect to Sign Up */}
            <div style={{ textAlign: "center", marginTop: "15px" }}>
              <p style={{ fontSize: "14px", color: "#555" }}>
                Don't have an account?
                <span
                  style={{ color: "#009999", cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => navigate("/SignUp")}
                  onMouseEnter={(e) => (e.target.style.color = "#006666")}
                  onMouseLeave={(e) => (e.target.style.color = "#009999")}
                >
                  {" "}Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </StyledFormComponent>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { BaseUrl } from '../BaseUrl';
// import {toast} from 'react-toastify';
// import {StyledFormComponent, SignInButton} from './StyleComponent';
// import LeftComponent from './LeftComponent';

// function Login() {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [validator, setValidator] = useState(false);


//     const logincheck = () =>{
//         if(email && password && email.includes("@") && email.includes(".com")){
//             const item = {email, password};

//             axios.post(`${BaseUrl}userRoutes/Login`, item)
//               .then((res) => {
//                 if (res.data.msg === "ok") {
//                   localStorage.setItem("token", res.data.token);
//                   navigate("/Home");
//                 } else {
//                   toast.error(res.data.msg);
//                 }
//               });
              
//             } else{
//                 setValidator(true);
//             }
//     };

//         return (
//             <>
//             <LeftComponent />
//             <StyledFormComponent>
//             <div style={{ height: "90vh", width: "50%",  display: "flex", justifyContent: "center", alignItems: "center" }}>
            
//           <div style={{width: "70%", backgroundColor: "#fff", padding: "40px", alignItems: "flex",
//             borderRadius: "10px", boxShadow: "0 1px 2px rgb(72, 72, 72)", textAlign: "center", }}>
//             <h1 style={{ color: "#009999", marginTop: "2px",marginBottom: "5px" }}>LOGIN</h1>    <br />
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "20px" }}>
//               <label>Email Address</label>
//               <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
//                 style={{width: "100%",padding: "10px",
//                 border: validator && email === "" ? "1px solid red" : "1px solid lightgrey",borderRadius: "5px",}}/>
//               <label style={{fontSize: 12,color: "red",
//                 display: (!email.includes("@") || !email.includes(".com")) && validator ? "block" : "none"}}>*Invalid Email
//               </label>
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "20px" }}>
//               <label>Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 style={{width: "100%",padding: "10px",border: validator && password === "" ? "1px solid red" : "1px solid lightgrey",borderRadius: "5px",}}/>
//             </div>

//             <SignInButton onClick={logincheck} style={{width : "100%"}}onMouseEnter={(e) => (e.target.style.backgroundColor = "#006666")}
//   onMouseLeave={(e) => (e.target.style.backgroundColor = "#009999")}>Sign In </SignInButton>
//             <div style={{ textAlign: "center", marginTop: "15px" }}>
//                 <p style={{ fontSize: "14px", color: "#555" }}>
//                     Don't have an account? 
//                     <span 
//                     style={{ color: "#009999", cursor: "pointer", fontWeight: "bold" }} 
//                     onClick={() => navigate("/SignUp")}
//                     onMouseEnter={(e) => (e.target.style.color = "#006666")}
//   onMouseLeave={(e) => (e.target.style.color = "#009999")}
//                     >
//                     {" "}Sign Up
//                     </span>
//                 </p>
//                 </div>

//           </div>
//           </div>
//           </StyledFormComponent>
//           </>
//         );
// }
// export default Login;