// import React, { useState } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import { BaseUrl } from "../BaseUrl";

// const Panel = styled.div`
//   position: fixed;
//   right: 0;
//   top: 0;
//   height: 100%;
//   width: 25rem;
//   background: #fff;
//   border-left: 1px solid #ddd;
//   display: flex;
//   flex-direction: column;
//   z-index: 1000;
// `;

// const Messages = styled.div`
//   flex: 1;          /* take remaining space */
//   min-height: 0;    /* important: prevents overflow issues */
//   padding: 1rem;
//   overflow-y: auto; /* scrollable if messages overflow */
// `;

// const InputBar = styled.div`
//   flex-shrink: 0;   /* don’t shrink out of view */
//   display: flex;
//   padding: 0.5rem;
//   border-top: 1px solid #ddd;
//   gap: 0.5rem;

//   input {
//     flex: 1;
//     border: 1px solid #ccc;
//     border-radius: 6px;
//     padding: 0.5rem;
//   }
//   button {
//     background: #0097d7;
//     color: white;
//     border: none;
//     padding: 0.5rem 1rem;
//     border-radius: 6px;
//     cursor: pointer;
//   }
// `;


// export default function AIChatPanel() {
//   // Local state for opening/closing the panel
//   const [isOpen, setIsOpen] = useState(false);

//   // Chat-related states
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);

//   const token = localStorage.getItem("token");

//   const authHeaders = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { role: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");

//     try {
//       setIsTyping(true);
//       const res = await axios.post(
//         `${BaseUrl}AskAIAssistant/AskAI`,
//         { prompt: input },
//         authHeaders
//       );

//       const aiMsg = {
//         role: "ai",
//         text:
//           res.data.candidates?.[0]?.content?.parts?.[0]?.text ||
//           "No response",
//       };
//       setMessages((prev) => [...prev, aiMsg]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         { role: "ai", text: "error connecting to AI." },
//       ]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   return (
//     <>
//       {/* Button to open panel */}
//       <button
//         onClick={() => setIsOpen(true)}
//         style={{
//           margin: "0.5rem",
//           padding: "0.5rem 1rem",
//           borderRadius: "6px",
//           background: "white",
//           color: "#000",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         🤖 AI Assistant
//       </button>

//       {/* Chat Panel */}
//       {isOpen && (
//         <Panel>
//           <div
//             style={{
//               padding: "0.5rem",
//               borderBottom: "1px solid #ddd",
//             }}
//           >
//             <b>AI Assistant</b>
//             <button
//               style={{
//                 float: "right",
//                 border: "none",
//                 background: "transparent",
//                 cursor: "pointer",
//               }}
//               onClick={() => setIsOpen(false)}
//             >
//               ❌
//             </button>
//           </div>

//           <Messages>
//             {messages.map((m, i) => (
//               <div
//                 key={i}
//                 style={{
//                   marginBottom: "0.5rem",
//                   textAlign: m.role === "user" ? "right" : "left",
//                 }}
//               >
//                 <span
//                   style={{
//                     background:
//                       m.role === "user" ? "#d1e7ff" : "#f1f1f1",
//                     padding: "0.4rem 0.8rem",
//                     borderRadius: "10px",
//                     display: "inline-block",
//                   }}
//                 >
//                   {m.text}
//                 </span>
//               </div>
//             ))}

//             {isTyping && (
//               <div
//                 style={{
//                   marginBottom: "0.5rem",
//                   textAlign: "left",
//                 }}
//               >
//                 <span
//                   style={{
//                     background: "#f1f1f1",
//                     padding: "0.4rem 0.8rem",
//                     borderRadius: "10px",
//                     display: "inline-block",
//                     fontStyle: "italic",
//                     color: "#666",
//                   }}
//                 >
//                   Thinking...
//                 </span>
//               </div>
//             )}
//           </Messages>

//           <InputBar>
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask AI..."
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button onClick={sendMessage}>Send</button>
//           </InputBar>
//         </Panel>
//       )}
//     </>
//   );
// }


// import React, {useState} from "react";
// import axios from "axios";
// import styled from "styled-components";
// import {BaseUrl} from "../BaseUrl";

// const Panel = styled.div`
// position : fixed;
// right: 0;
// top: 0;
// height: 100%;
// width: 25rem;
// background: #fff;
// border-left: 1px solid #ddd;
// display: flex;
// flex-direction: column;
// z-index: 1000;
// `;

// const Messages = styled.div`
// flex:1;
// padding: 1rem;
// overflow-y: auto;
// `;

// const InputBar = styled.div`
// display: flex;
// padding: 0.5rem;
// border-top: 1px solid #ddd;
// gap: 0.5rem;

// input{
// flex:1;
// border: 1px solid #ccc;
// border-radius: 6px;
// padding: 0.5rem;
// }
// button{
// background: #0097d7;
// color: white;
// border: none;
// padding: 0.5rem 1rem;
// border-radius: 6px;
// cursor: pointer;
// }
// `;


// export default function AIChatPanel({isOpen, onClose}){
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");
//     const [isTyping, setIsTyping] = useState(false);
//     const token = localStorage.getItem("token");

//     const authHeaders = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//     const sendMessage = async() => {
//         if(!input.trim()) return;
//         const userMsg = {role:"user", text: input};
//         setMessages((prev) => [...prev,userMsg]);
//         setInput("");

//         try{
//             setIsTyping(true);
//             const res = await axios.post(`${BaseUrl}AskAIAssistant/AskAI`,{
//                 prompt: input,
//             },authHeaders);
//             const aiMsg = {
//                 role: "ai",
//                 text:
//                 res.data.candidates?.[0]?.content?.parts?.[0]?.text ||"No response",
//             };
//             setMessages((prev) => [...prev, aiMsg]);
//         }
//         catch(err){
//             setMessages((prev) => [
//                 ...prev,
//                 {role: "ai", text: "error connecting to AI."},
//             ]);
//         }finally {
//       setIsTyping(false); // stop indicator
//     }
//     };
//     if(!isOpen) return null;
//     return(
//         <Panel>
//             <div style={{padding: "0.5rem", borderBottom: "1px solid #ddd"}}>
//                 <b>AI Assistant</b>
//                 <button style={{float:"right",border:"none", background: "transparent"}}
//                 onClick = {onClose}>
//                   ❌  
//                 </button>
//             </div>
//             <Messages>
//                 {messages.map((m,i) => (
//                     <div 
//                     key = {i}
//                     style = {{
//                         marginBottom: "0.5rem",
//                         textAlign: m.role ==="user"?"right":"left",
//                     }}>
//                         <span
//                         style={{
//                             background: m.role === "user"? "#d1e7ff" : "#f1f1f1",
//                             padding: "0.4rem 0.8rem",
//                             borderRadius: "10px",
//                             display: "inline-block",
//                         }}>
//                             {m.text}
//                         </span>
//                     </div>
//                 ))}
//                 {
//                     isTyping && (
//                         <div style={{
//                             marginBottom : "0.5rem",
//                             textAlign: "left",
//                         }}>
//                         <span
//                             style={{
//                                 background: "#f1f1f1",
//                                 padding: "0.4rem 0.8rem",
//                                 borderRadius: "10px",
//                                 display: "inline-block",
//                                 fontStyle: "italic",
//                                 color: "#666",
//                             }}>
//                                 Thinking...
//                             </span>
//                         </div>
                
//                     )
//                 }
//             </Messages>
//             <InputBar>
//             <input
//                 value = {input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder = "Ask AI..."
//                 onKeyDown = {(e) => e.key === "Enter" && sendMessage()}/>
//                 <button onClick = {sendMessage}>Send</button>
//             </InputBar>
//         </Panel>
//     );
// }

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import { BaseUrl } from "../BaseUrl";

// const Panel = styled.div`
//   position: fixed;
//   right: 0;
//   top: 0;
//   height: 100%;
//   width: 25rem;
//   background: #fff;
//   border-left: 1px solid #ddd;
//   display: flex;
//   flex-direction: column;
//   z-index: 1000;
// `;

// const Messages = styled.div`
//   flex: 1;
//   padding: 1rem;
//   overflow-y: auto;
// `;

// const InputBar = styled.div`
//   display: flex;
//   padding: 0.5rem;
//   border-top: 1px solid #ddd;
//   gap: 0.5rem;

//   input {
//     flex: 1;
//     border: 1px solid #ccc;
//     border-radius: 6px;
//     padding: 0.5rem;
//   }
//   button {
//     background: #0097d7;
//     color: white;
//     border: none;
//     padding: 0.5rem 1rem;
//     border-radius: 6px;
//     cursor: pointer;
//   }
// `;

// export default function AIChatPanel({ isOpen, onClose }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const token = localStorage.getItem("token");
//   const messagesEndRef = useRef(null);

//   const authHeaders = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   // Auto scroll to bottom when messages change
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, isTyping]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { role: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");

//     try {
//       setIsTyping(true);
//       const res = await axios.post(
//         `${BaseUrl}AskAIAssistant/AskAI`,
//         {
//           // Send conversation history so AI keeps context
//           messages: [...messages, userMsg],
//         },
//         authHeaders
//       );

//       const aiMsg = {
//         role: "ai",
//         text:
//           res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response",
//       };
//       setMessages((prev) => [...prev, aiMsg]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         { role: "ai", text: "⚠️ Error connecting to AI." },
//       ]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <Panel>
//       <div style={{ padding: "0.5rem", borderBottom: "1px solid #ddd" }}>
//         <b>AI Assistant</b>
//         <button
//           style={{ float: "right", border: "none", background: "transparent" }}
//           onClick={onClose}
//         >
//           ❌
//         </button>
//       </div>

//       <Messages>
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             style={{
//               marginBottom: "0.5rem",
//               textAlign: m.role === "user" ? "right" : "left",
//             }}
//           >
//             <span
//               style={{
//                 background: m.role === "user" ? "#d1e7ff" : "#f1f1f1",
//                 padding: "0.6rem 0.9rem",
//                 borderRadius: "10px",
//                 display: "inline-block",
//                 maxWidth: "90%",
//                 whiteSpace: "pre-wrap", // preserves newlines
//                 lineHeight: "1.4", // improves readability
//               }}
//             >
//               {m.text}
//             </span>
//           </div>
//         ))}

//         {isTyping && (
//           <div
//             style={{
//               marginBottom: "0.5rem",
//               textAlign: "left",
//             }}
//           >
//             <span
//               style={{
//                 background: "#f1f1f1",
//                 padding: "0.6rem 0.9rem",
//                 borderRadius: "10px",
//                 display: "inline-block",
//                 fontStyle: "italic",
//                 color: "#666",
//               }}
//             >
//               Thinking...
//             </span>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </Messages>

//       <InputBar>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask AI..."
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </InputBar>
//     </Panel>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import styled from "styled-components";
import { BaseUrl } from "../BaseUrl";

const Panel = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 25rem;
  background: #fff;
  border-left: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const Messages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
`;

const InputBar = styled.div`
  display: flex;
  padding: 0.5rem;
  border-top: 1px solid #ddd;
  gap: 0.5rem;

  textarea {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 0.5rem;
    resize: none;
    min-height: 40px;
    max-height: 120px;
    line-height: 1.4;
  }
  button {
    background: #0097d7;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  }
`;

export default function AIChatPanel({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const token = localStorage.getItem("token");
  const messagesEndRef = useRef(null);

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      setIsTyping(true);
      const res = await axios.post(
        `${BaseUrl}AskAIAssistant/AskAI`,
        { messages: [...messages, userMsg] },
        authHeaders
      );

      const aiMsg = {
        role: "ai",
        text:
          res.data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "⚠️ No response from AI.",
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            err.response?.data?.error ||
            err.message ||
            "⚠️ Error connecting to AI.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <Panel>
      <div style={{ padding: "0.5rem", borderBottom: "1px solid #ddd" }}>
        <b>AI Assistant</b>
        <button
          style={{ float: "right", border: "none", background: "transparent" }}
          onClick={onClose}
        >
          ❌
        </button>
      </div>

      <Messages>
        {messages.map((m, i) => (
        <div
            key={i}
            style={{
            marginBottom: "0.5rem",
            textAlign: m.role === "user" ? "right" : "left",
            }}
        >
            <div
            style={{
                background: m.role === "user" ? "#d1e7ff" : "#f1f1f1",
                padding: "0.6rem 0.9rem",
                borderRadius: "10px",
                // display: "inline-block",
                display: "block", // make bubble stretch full width
                overflowX: "auto", // allow horizontal scroll inside bubble
                maxWidth: "90%",
                whiteSpace: "pre-wrap",
                lineHeight: "1.4",
                textAlign: "left", // keep markdown formatting aligned
            }}
            >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {m.text}
            </ReactMarkdown>
            </div>
        </div>
        ))}

        {/* {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: "0.5rem",
              textAlign: m.role === "user" ? "right" : "left",
            }}
          >
            <span
              style={{
                background: m.role === "user" ? "#d1e7ff" : "#f1f1f1",
                padding: "0.6rem 0.9rem",
                borderRadius: "10px",
                display: "inline-block",
                maxWidth: "90%",
                whiteSpace: "pre-wrap",
                lineHeight: "1.4",
              }}
            >
              {m.text}
            </span>
          </div>
        ))} */}

        {isTyping && (
          <div style={{ marginBottom: "0.5rem", textAlign: "left" }}>
            <span
              style={{
                background: "#f1f1f1",
                padding: "0.6rem 0.9rem",
                borderRadius: "10px",
                display: "inline-block",
                fontStyle: "italic",
                color: "#666",
              }}
            >
              Thinking...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </Messages>

      <InputBar>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI (Shift+Enter for new line)..."
          onKeyDown={handleKeyDown}
          rows={2}
        />
        <button onClick={sendMessage} disabled={isTyping}>
          Send
        </button>
      </InputBar>
    </Panel>
  );
}
