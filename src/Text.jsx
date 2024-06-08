import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import "./styleText.css";
import MetricCalculation from "./components/calculation/MetricCalculation";
import Stat from "./components/stat";

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
  const [minutes, setMinutes] = useState(0);
  const [matrics, setMatrics] = useState({
    accuracy: 0,
    grossWPM: 0,
    errorRate: 0,
    netWPM: 0,
    correctCounter: 0,
    keyStrokeAccuracy: 0,
  });

  const matricsValues = useRef({
    correctCounter: 0,
    errorCounter: 0,
    totalKeystrokes: 0,
    totalCharactersTyped: 0,
  });


  const splitStringIntoGroups = useCallback(
    (string, wordsPerGroup = 12) => {
      const words = string.split(" ");
      let groups = [];

      for (let i = 0; i < words.length; i += wordsPerGroup) {
        groups.push(words.slice(i, i + wordsPerGroup).join(" "));
      }

      return groups;
    },
    [output]
  );

  useEffect(() => {
    if (output) {
      let temp = splitStringIntoGroups(output);
      
      let newToBeTyped = [...toBeTyped];
      for (let i = indicators.startIndex; i < indicators.endIndex; i++) {
        newToBeTyped.push(temp[i]);
      }
      setToBeTyped(newToBeTyped.slice(1));

      setCurrentTyping(temp[indicators.startIndex]);
    }
  }, [output, indicators]);

  useEffect(() => {
    typingAreaRef.current.focus();
  }, []);

  // After completion Calculation of the matrics
  useEffect(() => {
    if (typingCompleted) {
      const calculatedMetrics = MetricCalculation({
        correctCounter: matricsValues.current.correctCounter,
        errorCounter: matricsValues.current.errorCounter,
        totalKeystrokes: matricsValues.current.totalKeystrokes,
        totalCharactersTyped: matricsValues.current.totalCharactersTyped,
        timeInMinutes: `${minutes}.${timer}`,
      });
      setMatrics(calculatedMetrics);
    }
  }, [typingCompleted]);

  useEffect(() => {
    if (isTyping) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev >= 59) {
            // Increment minutes and reset timer
            setMinutes((mPrev) => mPrev + 1);
            return 0;
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isTyping]);

  const handleBtnClick = useCallback(
    (filteredArray) => {
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
    },
    [setIndicators, setToBeTyped, setCurrentTyping, setTyped]
  );

  const handleKeyDown = (e) => {
    if (e.key.length === 1 || e.key === "Backspace") {
      const currentChar = currentTyping[currentIndex];
      const correct = e.key === currentChar;

      if (e.key !== "Backspace") {
        if (correct) {
          matricsValues.current.correctCounter++;
        } else {
          matricsValues.current.errorCounter++;
        }
        matricsValues.current.totalKeystrokes++;
        matricsValues.current.totalCharactersTyped++;
      }

      if (!isTyping) {
        setIsTyping(true);
      }

      let updatedCorrectness = [...typedCorrectness, correct];

      if (e.key === "Backspace") {
        if (currentIndex === 0) {
          setTypedCorrectness([]);
          setCurrentIndex(0);

          matricsValues.current.totalKeystrokes++;
        } else {
          updatedCorrectness = typedCorrectness.slice(
            0,
            typedCorrectness.length - 1
          );
          setTypedCorrectness(updatedCorrectness);
          setCurrentIndex(currentIndex - 1);
          matricsValues.current.totalKeystrokes++;
          matricsValues.current.totalCharactersTyped--;

         
        }
        return;
      }


      if (
        toBeTyped[0] === undefined &&
        currentIndex + 1 === currentTyping.length
      ) {
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
      let color = "grey";
      if (index < currentIndex) {
        color = typedCorrectness[index]
          ? "rgba(125, 209, 138, 1)"
          : "rgba(216, 89, 89, 1)";

      } else if (index === currentIndex) {
        color = "#4b5c3e";
      }
      return (
        <React.Fragment key={index}>
          {index === currentIndex && <span className="cursor"></span>}
          <span style={{ color }}>{char}</span>
        </React.Fragment>
      );
    });
  }, [currentTyping, currentIndex, typedCorrectness]);

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
    <div
      id="Parent-Container"
      className="bg-black w-screen h-screen px-0 py-0 mx-0 my-0"
    >
      <div className="typing-area max-w-full max-h-full	 px-5 py-5">
        <section className="typed_section text-center">
          {typed.map((val, index) => {
            return (
              <div
                key={index}
                className="typed pt-4 text-xl font-light tracking-wide"
              >
                {val.map((val, index) => {
                  return (
                    <span
                      key={index}
                      style={{
                        color: val.state
                          ? "rgba(125, 209, 138, 1)"
                          : "rgba(216, 89, 89, 1)",
                      }}
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
            className="typing border-slate-40 py-6 tracking-widest whitespace-pre"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            style={{
              cursor: "text",
              color: "rgb(156, 155, 155)",
              fontSize: "1.8rem",
              outline: "none",
              wordSpacing: "2px",
            }}
            ref={typingAreaRef}
            onBlur={() => typingAreaRef.current.focus()}
          >
            {characterSpan}
          </div>
        </section>

        <section className="to_be_typed_section  text-center">
          {toBeTyped.map((val, index) => {
            return (
              <div
                key={index}
                className="to_be_typed pb-4 text-xl font-light tracking-wide"
              >
                <h2>{val}</h2>
              </div>
            );
          })}
        </section>
      </div>

      <div className="timer">
        <span>
          {minutes}:{timer}
        </span>
      </div>

      {typingCompleted && <Stat matrics={matrics} className="Stat_Section" />}
    </div>
  );
}

export default TypingTest;
