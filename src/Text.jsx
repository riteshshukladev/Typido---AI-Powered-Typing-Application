import React, { useState, useEffect , useRef } from "react";
import { useLocation } from "react-router-dom";

function TypingTest() {
  const location = useLocation();
  const { output } = location.state;

  const [toBeTyped, setToBeTyped] = useState([]);
  const [typed, setTyped] = useState([]);
  const [currentTyping, setCurrentTyping] = useState('');
  const [indicators, setIndicators] = useState({
    startIndex: 0,
    endIndex: 4,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const typingAreaRef = useRef(null);
  const [typedCorrectness, setTypedCorrectness] = useState([]);


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



  useEffect(() => {
    typingAreaRef.current.focus();
  }, []);


  const handleBtnClick = () => {
    let newIndicators = { ...indicators };
    newIndicators.startIndex += 1;
    newIndicators.endIndex += 1;
    setIndicators(newIndicators);
    setToBeTyped([]);
    setCurrentTyping(toBeTyped[indicators.startIndex]);
    // setTyped([...typed, currentTyping]);
    setTyped(prevTyped => {
      let newTyped = [...prevTyped, currentTyping];
      if (newTyped.length > 4) {
        // newTyped.shift();
        // return newTyped.slice(1);
        newTyped = newTyped.slice(newTyped.length - 4);
      }
      return newTyped;
    })
  }


  const handleKeyDown = (e) => {
    if (e.key.length === 1 || e.key === 'Backspace') { // Only process character keys and Backspace
      const currentChar = currentTyping[currentIndex];
      const correct = e.key === currentChar;
      setTypedCorrectness((prev) => [...prev, correct]);
      if (e.key === 'Backspace') {
        setCurrentIndex((prev) => {
          if (prev === 0) {
            setTypedCorrectness([]);
            return 0;
          }
          setTypedCorrectness((prev) => prev.slice(0, prev.length - 1));
          return prev - 1;
        });
      return;
    }
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      if (newIndex === currentTyping.length) {
        setTypedCorrectness([]);
        handleBtnClick();
        return 0;
      }
      return newIndex;
    });
  }
};

  // window.onload=() => {
  //   typingAreaRef.current.focus();
  // }


  const characterSpan = () =>{
    return currentTyping.split('').map((char, index) => {
      let color = 'black';
       if (index < currentIndex) {
         color = typedCorrectness[index] ? 'green' : 'red';
         console.log(typedCorrectness[index])
      }
      else if (index === currentIndex) {
        color = 'lightblue';
      }
      return <span key={index} style={{ color }}>{char}</span>
    })
  }


  return (
    <div>
    {
      typed.map((val , index) => {
        return (
          <div index = {index} >
            <h2>{val}</h2>
          </div>
        );
      })
    }

      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        style={{ cursor: 'text', color: 'white'  ,fontSize:'1.5rem'}}
        ref={typingAreaRef}
        onBlur={() => typingAreaRef.current.focus()}
      >
        {console.log(characterSpan())}
        {characterSpan()}
      </div>


      {toBeTyped.map((val , index) => {
        return (
          <div index = {index} >
            <h2>{val}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default TypingTest;

