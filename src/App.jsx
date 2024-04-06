import React, { useContext, useState } from "react";
import "./App.css";
import { Context } from "./Context";
const App = () => {
  const { getAnsweredText } = useContext(Context);
  const [inputfield, setInputfield] = useState("");
  const [messages, setMessages] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [gemini, setGemini] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const ans = await getAnsweredText(inputfield);
    setMessages(ans);
    setIsLoading(false);
    setGemini([...gemini, { inputfield: inputfield, answer: ans }]);
    setInputfield("");
  };
  return (
    <div className="mainContent">
      <div className="leftSidebar">
        <h3>CHATGEMI</h3>
        {gemini.map((message, index) => {
          return (
            <button
              key={index}
              onClick={() => setMessages(message.answer)}
              className="btn btn-leftSidebar text-start"
            >
              {message?.inputfield?.length > 30
                ? message?.inputfield?.slice(0, 20) + "..."
                : message?.inputfield}
            </button>
          );
        })}
      </div>
      <div className="outerContent">
        <div className="chatDetails ">
          {isLoading ? (
            <div className="spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>
              {messages ? (
                <p>{messages}</p>
              ) : (
                <h1>How can I help you today?</h1>
              )}
            </>
          )}
        </div>
        <form className="inputFormat" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Message ChatGPT..."
            className="inputDetails"
            value={isLoading ? "" : inputfield}
            onChange={(e) => setInputfield(e.target.value)}
          />
          <button type="submit" className="buttonSend">
            <i className="bi bi-send-fill"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
