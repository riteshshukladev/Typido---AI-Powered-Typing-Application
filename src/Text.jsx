import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import './styleText.css';

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
  const [typingCompleted, setTypingCompleted] = useState(false);
  const [isMinutes, setIsMinutes] = useState('00');


  const splitStringIntoGroups = useCallback((string, wordsPerGroup = 12) => {
    const words = string.split(" ");
    let groups = [];

    for (let i = 0; i < words.length; i += wordsPerGroup) {
      groups.push(words.slice(i, i + wordsPerGroup).join(" "));
    }

    return groups;
  }, [output]);

  useEffect(() => {
    

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


  const handleBtnClick = useCallback((filteredArray) => {
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
      if (newTyped.length > 3) {
        return newTyped.slice(1);
      }
      return newTyped;
    });
  }, [setIndicators, setToBeTyped, setCurrentTyping, setTyped]);


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

      if (toBeTyped[0] === undefined && currentIndex + 1 === currentTyping.length) {
        clearInterval(timerRef.current);
        setTypingCompleted(true);
        typingAreaRef.current.blur();
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

  const characterSpan = useMemo(() => {
    return currentTyping.split("").map((char, index) => {
      let color = "white";
      if (index < currentIndex) {
        color = typedCorrectness[index] ? "rgba(125, 209, 138, 1)" : "rgba(216, 89, 89, 1)";
        console.log(typedCorrectness[index]);
      } else if (index === currentIndex) {
        color = "rgba(80, 107, 158, 1)";
      }
      return (
        <span key={index} style={{ color }}>
          {char}
        </span>
      );
    });
  },[ currentTyping, currentIndex, typedCorrectness]);



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


  if (typingCompleted) {
    return (
      <div>
        <h1>Typing Completed!</h1>
        <h2>Time taken: {timer} seconds</h2>  
      </div>
    );
  }

  return (
  

    <div id="Parent-Container" className="bg-black w-screen h-screen px-0 py-0 mx-0 my-0">
      <div className="typing-area max-w-full max-h-full	 px-5 py-5">
        <section className="typed_section text-center">
          {typed.map((val, index) => {
            return (
              <div key={index} className="typed pt-4 text-xl font-light tracking-wide">
                {val.map((val, index) => {
                  return (
                    <span
                      key={index}
                      style={{ color: val.state ? "rgba(125, 209, 138, 1)" : "rgba(216, 89, 89, 1)" }}
                    >
                      {val.char}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </section>

        <section className="Typing_section w-full px-5 py-5 text-center">
          <div
            className="typing border-t-0.2 border-b-0.2 border-slate-40 py-6 tracking-wide" 
            
            tabIndex={0}
            onKeyDown={handleKeyDown}
            style={{ cursor: "text", color: "white", fontSize: "1.5rem" , outline: "none", wordSpacing:'2px'}}
            ref={typingAreaRef}
            onBlur={() => typingAreaRef.current.focus()}
          >
            {characterSpan}
          </div>
        </section>

        <section className="to_be_typed_section  text-center">
          {toBeTyped.map((val, index) => {
            return (
              <div key={index} className="to_be_typed pb-4 text-xl font-light tracking-wide" >
                <h2>{val}</h2>
              </div>
            );
          })}
        </section>
      </div>

      <div className="timer">
        <h1>{timer}</h1>
        </div>
    </div>
  );
}

export default TypingTest;
