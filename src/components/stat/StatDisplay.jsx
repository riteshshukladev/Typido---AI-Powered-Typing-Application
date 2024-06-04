import React from 'react'

import { Radar } from 'react-chartjs-2'
import 'chart.js/auto'
import { useLocation } from 'react-router-dom'

const StatDisplay = () => {

  const location = useLocation()
  const { accuracy , grossWPM , errorRate , netWPM , correctCounter, keyStrokeAccuracy } = location.state;

  console.log(accuracy)


  const maxvalue = {
    maxAccuracy: 120,
    maxGrossWPM: 120,
    maxErrorRate: 100,
    maxNetWPM: 120,
    maxCorrectCounter: 1000,
    maxKeyStrokeAccuracy: 100
  }


  const computeNormalizedValue = (value, max) => {
    return (value / max)*100
  }


  const normalizedData = {
    accuracy: computeNormalizedValue(accuracy, maxvalue.maxAccuracy),
    grossWPM: computeNormalizedValue(grossWPM, maxvalue.maxGrossWPM),
    errorRate: 100-computeNormalizedValue(errorRate, maxvalue.maxErrorRate),
    netWPM: computeNormalizedValue(netWPM, maxvalue.maxNetWPM),
    correctCounter: computeNormalizedValue(correctCounter, maxvalue.maxCorrectCounter),
    keyStrokeAccuracy: computeNormalizedValue(keyStrokeAccuracy, maxvalue.maxKeyStrokeAccuracy)

  }



  console.log(normalizedData)

  const data = {
    labels: ['Accuracy', 'Gross WPM', 'Error Rate', 'Net WPM', 'Correct Counter', 'Key Stroke Accuracy'],
    datasets: [
      {
        label: 'Metrics',
        data: [normalizedData.accuracy, normalizedData.grossWPM, normalizedData.errorRate, normalizedData.netWPM, normalizedData.correctCounter, normalizedData.keyStrokeAccuracy],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  return (
    <Radar data={data} />
  )
}

export default StatDisplay;