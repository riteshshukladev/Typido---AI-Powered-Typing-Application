import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

function TypingTest() {
  const location = useLocation();
  const { output } = location.state;


  function splitStringIntoGroups(string, wordsPerGroup = 8) {
    const words = string.split(" ");
    const groups = [];
    
    for (let i = 0; i < words.length; i += wordsPerGroup) {
        groups.push(words.slice(i, i + wordsPerGroup).join(" "));
    }
    
    return groups;
}

var  toBeTyped = [];
    
 toBeTyped= splitStringIntoGroups(output);

 toBeTyped.forEach((group, index) => {
   console.log(`Group ${index + 1}: ${group}`);

 });

}

export default TypingTest;
