import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function TypingTest() {
  const location = useLocation();
  const { output } = location.state;

  const [toBeTyped, setToBeTyped] = useState([]);

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
  }, [output]);

  useEffect(() => {
    toBeTyped.map((group, index) => {
      console.log(`Group ${index + 1}: ${group}`);
    });

    console.log(toBeTyped);
  }, [toBeTyped]);
}

export default TypingTest;