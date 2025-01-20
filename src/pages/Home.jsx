import {
  BiHistory,
  BiLogOut,
  BiSend,
} from "react-icons/bi";
import "../styles/home.css";
import { FaAngleRight, FaHeadset, FaNewspaper } from "react-icons/fa";
import { useState } from "react";
import { MdCreate } from "react-icons/md";
import axios from "axios";

const Home = () => {
  const [prompt, setPrompt] = useState(""); // User's input
  const [responses, setResponses] = useState([]); // Chat history
  const [showMenu, setMenu] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    try {
      // Send request to the Flask API
      const response = await axios.post("https://68bb-34-106-120-150.ngrok-free.app/api/query", {
        question: prompt,
    });    
      // Add user's question and AI response to the chat history
      setResponses((prev) => [
        ...prev,
        { type: "user", message: prompt },
        { type: "bot", message: response.data.answer },
      ]);
      setPrompt(""); // Clear input
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponses((prev) => [
        ...prev,
        { type: "user", message: prompt },
        { type: "bot", message: "Sorry, something went wrong." },
      ]);
      setPrompt("");
    }
  };

  return (
    <div className="main-wrap flex col">
      <div
        className="side-bar flex col"
        style={{ width: showMenu ? "300px" : "0px" }}
      >
        <div className="bars flex col" onClick={() => setMenu(!showMenu)}>
          <div
            style={{
              transform: showMenu ? "rotate(45deg)" : "",
              position: showMenu ? "absolute" : "",
            }}
          ></div>
          <div style={{ opacity: showMenu ? "0" : 1 }}></div>
          <div
            style={{
              transform: showMenu ? "rotate(-45deg)" : "",
              position: showMenu ? "absolute" : "",
            }}
          ></div>
        </div>
        {/* Additional Sidebar Content */}
      </div>

      <div
        className="top-content flex col"
        style={{ marginLeft: showMenu ? "300px" : "0px" }}
      >
        <h1>Hello Guest</h1>
        <h2>How can I help you today?</h2>
      </div>

      <div
        className="chat-window flex col"
        style={{ marginLeft: showMenu ? "300px" : "0px" }}
      >
        {/* Render chat messages */}
        {responses.map((res, index) => (
          <div key={index} className={`chat-message ${res.type}`}>
            {
              console.log(res.type)
            }
            <p>{res.message}</p>
          </div>
        ))}
      </div>

      <div
        className="input-wrap flex"
        style={{ marginLeft: showMenu ? "300px" : "0px" }}
      >
        <input
          type="text"
          placeholder="Enter prompt here"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handleSend}>
          <BiSend />
        </button>
      </div>
    </div>
  );
};

export default Home;