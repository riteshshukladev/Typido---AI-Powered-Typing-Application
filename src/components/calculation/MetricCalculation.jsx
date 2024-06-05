import React from 'react'

const MetricCalculation = ({correctCounter , errorCounter , totalKeystrokes , totalCharactersTyped ,timeInMinutes }) => {
 

    const accuracy = ((correctCounter / totalCharactersTyped) * 100).toFixed(2);

    const grossWPM = ((totalKeystrokes / 5) / timeInMinutes).toFixed(2);

    const errorRate = ((errorCounter / totalCharactersTyped) * 100).toFixed(2);

    const netWPM = (grossWPM - errorRate).toFixed(2);

    const correctWordsPM = (correctCounter / 5) / timeInMinutes;

    const keyStrokeAccuracy = (correctCounter / totalKeystrokes) * 100;

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
