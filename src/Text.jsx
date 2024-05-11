import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

function TypingTest() {
  const location = useLocation();
  const { output } = location.state;

  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
        
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isActive]);

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
  };

  const formattedTime = useMemo(() => {
    return new Date(timer * 1000).toISOString().substr(11, 8);
  }, [timer]);


  const characterSpan = useMemo(() => {

    
    return output.split('').map((char, index) => {
      let color = 'white';
      if (index < userInput.length) {
        console.log('char:', char);
        
        color = char === userInput[index] ? 'green' : 'red';
      }
      return <span key={index} style={{ color }}>{char}</span>;
    });
  }, [output, userInput]);

  return (
    <div style={{ backgroundColor: 'black' }}>
      <button onClick={() => setIsActive(true)}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <span style={{backgroundColor: 'white'}}>{formattedTime}</span>
      <div>{characterSpan}</div>
      
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={!isActive}
      />
    </div>
  );
}

export default TypingTest;
