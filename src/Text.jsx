import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function TypingTest() {
  const location = useLocation();
  const { output } = location.state;

  const [toBeTyped, setToBeTyped] = useState([]);
  const [typed, setTyped] = useState([]);
  const [currentTyping, setCurrentTyping] = useState([]);

  useEffect(() => {
    function splitStringIntoGroups(string, wordsPerGroup = 8) {
      const words = string.split(" ");
      let groups = [];

      for (let i = 0; i < words.length; i += wordsPerGroup) {
        groups.push(words.slice(i, i + wordsPerGroup).join(" "));
      }

      return groups;
    }

    setToBeTyped(splitStringIntoGroups(output));
    setCurrentTyping(splitStringIntoGroups(output)[0]);
  }, [output]);

  useEffect(() => {
    toBeTyped.map((group, index) => {
      console.log(`Group ${index + 1}: ${group}`);
    });

    console.log(toBeTyped);
  }, [toBeTyped]);

  return(
    <div>
      <h2 style={{color:"blue"}}>{currentTyping}</h2>
      <br />
      {toBeTyped.map((val)=>{
        return(
          <div>
            <h2>{val}</h2>
          </div>
        )
      })}
      
    </div>
  )
}

export default TypingTest;