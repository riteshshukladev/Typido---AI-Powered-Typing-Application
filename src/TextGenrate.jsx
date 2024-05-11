import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MistralClient from "@mistralai/mistralai";


const TextGenerate = () => {
  const [input, setInput] = useState('');
  const [outputText, setOutputText] = useState('');// Use state to store the output text

 const  [isWaiting, setIsWaiting] = useState(false); // Add a new state variable to track the waiting state

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
          { role: "user", content: `Generate a detailed, informative paragraph about the following topic ${input}. The response should be purely textual and should aim to enhance understanding by explaining key concepts, historical context, or practical implications related to the topic. The explanation should not include formulas, equations, or overly technical jargon if the topic involves complex subjects like mathematics or science . DO NOT ANY TYPE OF MATHEMATICAL EQUATIONS , like exponentials , logrithms , root and anything related to some equation and any type of formula related to any subject!!!. Instead, focus on clear, accessible language that conveys the essence and significance of the topic effectively.` },
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
          {isWaiting ? <p>Waiting For the Response...</p> : <span style={{ display:"block"}}>{outputText}</span> }
          <button onClick={handleBtnClick}>Resend</button>
          {/* Pass the outputText instead of the DOM element */}
          <Link to='text' state={{ output: outputText }}><button>Proceed</button></Link>
        </div>
      </div>
    </div>
  );
};

export default TextGenerate;
