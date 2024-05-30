import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function TypingTest() {
  const location = useLocation();
  const { output } = location.state;

  const [toBeTyped, setToBeTyped] = useState([]);
  const [typed, setTyped] = useState([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [indicators, setIndicators] = useState({
    startIndex: 0,
    endIndex: 4,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const typingAreaRef = useRef(null);
  const [typedCorrectness, setTypedCorrectness] = useState([]);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    function splitStringIntoGroups(string, wordsPerGroup = 8) {
      const words = string.split(" ");
      let groups = [];

      for (let i = 0; i < words.length; i += wordsPerGroup) {
        groups.push(words.slice(i, i + wordsPerGroup).join(" "));
      }

      return groups;
    }

    let temp = splitStringIntoGroups(output);
    console.log(temp);
    let newToBeTyped = [...toBeTyped];
    for (let i = indicators.startIndex; i < indicators.endIndex; i++) {
      newToBeTyped.push(temp[i]);
    }
    setToBeTyped(newToBeTyped.slice(1));

    setCurrentTyping(temp[indicators.startIndex]);
  }, [output, indicators]);

  useEffect(() => {
    typingAreaRef.current.focus();
  }, []);

  useEffect(() => {
    if (isTyping) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isTyping]);

  const handleBtnClick = (filteredArray) => {
    setIndicators((prev) => {
      const newIndicators = {
        ...prev,
        startIndex: prev.startIndex + 1,
        endIndex: prev.endIndex + 1,
      };

      setToBeTyped([]);

      setCurrentTyping((prev) => prev[newIndicators.startIndex]);

      return newIndicators;
    });

    setTyped((prev) => {
      const newTyped = [...prev, filteredArray];
      if (newTyped.length > 4) {
        return newTyped.slice(1);
      }
      return newTyped;
    });
  };


  const handleKeyDown = (e) => {
    if (e.key.length === 1 || e.key === "Backspace") {
      const currentChar = currentTyping[currentIndex];
      const correct = e.key === currentChar;

      
      if (!isTyping) {
        setIsTyping(true);
      }

      let updatedCorrectness = [...typedCorrectness, correct];

      if (e.key === "Backspace") {
        if (currentIndex === 0) {
          setTypedCorrectness([]);
          setCurrentIndex(0);
        } else {
          updatedCorrectness = typedCorrectness.slice(
            0,
            typedCorrectness.length - 1
          );
          setTypedCorrectness(updatedCorrectness);
          setCurrentIndex(currentIndex - 1);
        }
        return;
      }

      if (currentIndex + 1 === currentTyping.length) {
        // Immediately create and use the filtered array
        const filteredArray = createFilteredTyped(
          updatedCorrectness,
          currentTyping
        );
        handleBtnClick(filteredArray);
        setTypedCorrectness([]); 
        setCurrentIndex(0); 
      } else {
        setTypedCorrectness(updatedCorrectness);
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const characterSpan = () => {
    return currentTyping.split("").map((char, index) => {
      let color = "black";
      if (index < currentIndex) {
        color = typedCorrectness[index] ? "green" : "red";
        console.log(typedCorrectness[index]);
      } else if (index === currentIndex) {
        color = "lightblue";
      }
      return (
        <span key={index} style={{ color }}>
          {char}
        </span>
      );
    });
  };

  const createFilteredTyped = (typedCorrectness, currentTyping) => {
    let filteredArray = [];
    for (let i = 0; i < typedCorrectness.length; i++) {
      filteredArray.push({
        state: typedCorrectness[i],
        char: currentTyping[i],
      });
    }
    return filteredArray;
  };
  return (
    <div>
      {typed.map((val, index) => {
        return (
          <div index={index}>
            <h2>
              {val.map((val, index) => {
                return (
                  <span
                    index={index}
                    style={{ color: val.state ? "green" : "red" }}
                  >
                    {val.char}
                  </span>
                );
              })}
            </h2>
          </div>
        );
      })}

      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        style={{ cursor: "text", color: "white", fontSize: "1.5rem" }}
        ref={typingAreaRef}
        onBlur={() => typingAreaRef.current.focus()}
      >
        {console.log(characterSpan())}
        {characterSpan()}
      </div>

      <div>{timer}</div>
      {toBeTyped.map((val, index) => {
        return (
          <div index={index}>
            <h2>{val}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default TypingTest;
