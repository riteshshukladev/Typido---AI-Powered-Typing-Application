import React from "react";

const MetricCalculation = ({
  correctCounter,
  errorCounter,
  totalKeystrokes,
  totalCharactersTyped,
  timeInMinutes,
}) => {
  // Ensure timeInMinutes is not zero and is a valid number
  timeInMinutes = Math.max(parseFloat(timeInMinutes) || 0.01, 0.01);

  // Guard against division by zero
  const safeDiv = (a, b) => (b === 0 ? 0 : a / b);

  // Ensure all inputs are valid numbers
  correctCounter = parseInt(correctCounter) || 0;
  errorCounter = parseInt(errorCounter) || 0;
  totalKeystrokes = parseInt(totalKeystrokes) || 0;
  totalCharactersTyped = parseInt(totalCharactersTyped) || 0;

  const accuracy = safeDiv(correctCounter, totalCharactersTyped) * 100;
  const grossWPM = safeDiv(totalKeystrokes / 5, timeInMinutes);
  const errorRate = safeDiv(errorCounter, totalCharactersTyped) * 100;
  const netWPM = Math.max(grossWPM - errorRate, 0); // Ensure netWPM is not negative
  const correctWordsPM = safeDiv(correctCounter / 5, timeInMinutes);
  const keyStrokeAccuracy = safeDiv(correctCounter, totalKeystrokes) * 100;

  return {
    accuracy: accuracy.toFixed(2),
    grossWPM: grossWPM.toFixed(2),
    errorRate: errorRate.toFixed(2),
    netWPM: netWPM.toFixed(2),
    correctWordsPM: correctWordsPM.toFixed(2),
    keyStrokeAccuracy: keyStrokeAccuracy.toFixed(2),
  };
};

export default MetricCalculation;
