import React from 'react'

const MetricCalculation = ({ correctCounter, errorCounter, totalKeystrokes, totalCharactersTyped, timeInMinutes }) => {
    
    timeInMinutes = parseFloat(timeInMinutes);
 

    const accuracy = ((correctCounter / totalCharactersTyped) * 100).toFixed(2);

    const grossWPM = ((totalKeystrokes / 5) / timeInMinutes).toFixed(2);

    const errorRate = ((errorCounter / totalCharactersTyped) * 100).toFixed(2);

    const netWPM = (grossWPM - errorRate).toFixed(2);

    const correctWordsPM = (correctCounter / 5) / timeInMinutes;

    const keyStrokeAccuracy = (correctCounter / totalKeystrokes) * 100;

    if (isNaN(accuracy) || isNaN(grossWPM) || isNaN(errorRate) || isNaN(netWPM) || isNaN(correctWordsPM) || isNaN(keyStrokeAccuracy)) {
        return {
            accuracy: 0,
            grossWPM: 0,
            errorRate: 0,
            netWPM: 0,
            correctWordsPM: 0,
            keyStrokeAccuracy: 0,
        }
    }



    return {
        accuracy,
        grossWPM,
        errorRate,
        netWPM,
        correctWordsPM,
        keyStrokeAccuracy,
    }
}

export default MetricCalculation;
