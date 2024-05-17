import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function TypingTest() {
  const location = useLocation();
  const { output } = location.state;

  const [toBeTyped, setToBeTyped] = useState([]);
  const [typed, setTyped] = useState([]);
  const [currentTyping, setCurrentTyping] = useState([]);
  const [indicators, setIndicators] = useState({
    startIndex: 0,
    endIndex: 4,
  });

  useEffect(() => {
    function splitStringIntoGroups(string, wordsPerGroup = 8) {
      const words = string.split(" ");
      let groups = [];

      for (let i = 0; i < words.length; i += wordsPerGroup) {
        groups.push(words.slice(i, i + wordsPerGroup).join(" "));
      }

      return groups;
    }

    // setToBeTyped(splitStringIntoGroups(output));
    // setCurrentTyping(splitStringIntoGroups(output)[0]);

    let temp = splitStringIntoGroups(output);
    console.log(temp);
    let newToBeTyped = [...toBeTyped];
    for (let i = indicators.startIndex; i < indicators.endIndex; i++) {
      newToBeTyped.push(temp[i]);
    }
    setToBeTyped(newToBeTyped.slice(1));

    setCurrentTyping(temp[indicators.startIndex]);
  }, [output, indicators]);


  const handleBtnClick = () => {
    let newIndicators = { ...indicators };
    newIndicators.startIndex += 1;
    newIndicators.endIndex += 1;
    setIndicators(newIndicators);
    setToBeTyped([]);
    setCurrentTyping(toBeTyped[indicators.startIndex]);
    // setTyped([...typed, currentTyping]);
    setTyped(prevTyped=>{
      let newTyped = [...prevTyped , currentTyping]; 
      if(newTyped.length >4){
        // newTyped.shift();
        // return newTyped.slice(1);
        newTyped = newTyped.slice(newTyped.length-4);
      }
      return newTyped;
    })
  }

  return (
    <div>
    {
      typed.map((val , index) => {
        return (
          <div  index = {index} >
            <h2>{val}</h2>
          </div>
        );
      })
    }
    <br />
      <h2 style={{ color: "blue" }}>{currentTyping}</h2>
      <br />
      <button onClick={handleBtnClick}>clickme</button>
      <br />
      {toBeTyped.map((val , index) => {
        return (
          <div  index = {index} >
            <h2>{val}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default TypingTest;
