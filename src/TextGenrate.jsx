import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MistralClient from "@mistralai/mistralai";

const TextGenerate = () => {
  const [input, setInput] = useState("");
  const [outputText, setOutputText] = useState(""); // Use state to store the output text

  const [isWaiting, setIsWaiting] = useState(false); // Add a new state variable to track the waiting state

  const handleInputBtnClick = (e) => {
    setInput(e.target.value);
    // Set the waiting state to true
  };

  async function handleBtnClick() {
    setIsWaiting(true);
    try {
      const client = new MistralClient(import.meta.env.VITE_MISTRAL_API_KEY);
      const chatResponse = await client.chat({
        model: "open-mixtral-8x7b",
        messages: [
          {
            role: "user",
            content: `you're part of a typing application , the text you'll genererate on the topic of ${input} should be easy ,without any special characters ,any sorts of mathematical eqauation,  and the one and only primary language should be english only, generate the text accordingly in the length of 60 words - Only output the content that needs to be typed nothing more - Don't say that you are AI of anything.`,
          },
        ],
      });

      console.log("Chat:", chatResponse.choices[0].message.content);
      setIsWaiting(false); // Set the waiting state to false
      setOutputText(chatResponse.choices[0].message.content); // Update state with the generated text
    } catch (error) {
      console.error("An error occurred:", error);
      setIsWaiting(false);
    }
  }

  return (
    <div>
      <div>
        <form>
          <span>
            <input
              type="text"
              placeholder="Enter your text here"
              onChange={handleInputBtnClick}
            />
            <input type="reset" value="Clear" />
          </span>
          <button type="button" onClick={handleBtnClick}>
            Click me
          </button>
        </form>
        <div style={{ marginTop: 16 }}>
          {isWaiting ? (
            <p>Waiting For the Response...</p>
          ) : (
            <span style={{ display: "block" }}>{outputText}</span>
          )}
          <button onClick={handleBtnClick}>Resend</button>
          {/* Pass the outputText instead of the DOM element */}
          <Link to="text" state={{ output: outputText }}>
            <button>Proceed</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TextGenerate;
