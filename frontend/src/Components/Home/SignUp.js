import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl';
import {toast} from 'react-toastify';
import {StyledFormComponent, SignInButton} from './StyleComponent';
import LeftComponent from './LeftComponent';

function SignUp () {
        const navigate = useNavigate();
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [validator, setValidator] = useState(false);

        const addUsers = () =>{
            if(name!== "" && email!=="" && password!=="" && email.includes("@") && email.includes(".com")){
                const item = {
                    name: name,
                    email: email,
                    password: password,
                };
                axios.post(`${BaseUrl}userRoutes/addUsers`,item)
                .then(() =>{
                    toast.success("Account created successfully");
                    navigate("/");
                });
            } else{
                setValidator(true);
                toast.error("Please fill out all fields correctly");
            }
        };

         return(
            <>
            <LeftComponent />
                    <StyledFormComponent>
                    <div style={{ height: "90vh", width: "50%",  display: "flex", justifyContent: "center", alignItems: "center" }}>
                    
                  <div style={{width: "70%", backgroundColor: "#fff", padding: "40px", alignItems: "flex",
                    borderRadius: "10px", boxShadow: "0 4px 8px #000", textAlign: "center", }}>
                    <h1 style={{ color: "#009999", marginTop: "2px",marginBottom: "5px" }}>SIGN UP</h1>    <br />
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "20px" }}>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                        style={{ width: "100%", padding: "10px", border: validator && name === "" ? "1px solid red" : "1px solid lightgrey",
                            borderRadius: "5px", }}/>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "20px" }}>
                      <label>Email Address</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        style={{width: "100%",padding: "10px",
                        border: validator && email === "" ? "1px solid red" : "1px solid lightgrey",borderRadius: "5px",}}/>
                      <label style={{fontSize: 12,color: "red",
                        display: (!email.includes("@") || !email.includes(".com")) && validator ? "block" : "none"}}>*Invalid Email
                      </label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "20px" }}>
                      <label>Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{width: "100%",padding: "10px",border: validator && password === "" ? "1px solid red" : "1px solid lightgrey",borderRadius: "5px",}}/>
                    </div>
        
                    <SignInButton onClick={addUsers} style={{width : "60%"}}onMouseEnter={(e) => (e.target.style.backgroundColor = "#006666")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#009999")}>Sign Up </SignInButton>
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <p style={{ fontSize: "14px", color: "#555" }}>
                            Already have an account? 
                            <span 
                            style={{ color: "#009999", cursor: "pointer", fontWeight: "bold" }} onClick={() => navigate("/Login")} onMouseEnter={(e) => (e.target.style.color = "#006666")}
                            onMouseLeave={(e) => (e.target.style.color = "#009999")} 
        
                            >
                            {" "}Sign in
                            </span>
                        </p>
                        </div>
        
                  </div>
                  </div>
                  </StyledFormComponent>
                  </>
                );
}

export default SignUp;


