


import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import "chart.js/auto";
import { useLocation } from "react-router-dom";

const StatDisplay = () => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [normalizedData, setNormalizedData] = useState({});

  const {
    accuracy = 0,
    grossWPM = 0,
    errorRate = 0,
    netWPM = 0,
    correctWordsPM = 0,
    keyStrokeAccuracy = 0,
  } = location.state || {};

  useEffect(() => {
    const maxvalue = {
      maxAccuracy: 120,
      maxGrossWPM: 120,
      maxErrorRate: 100,
      maxNetWPM: 120,
      correctWordsPM: 1000,
      maxKeyStrokeAccuracy: 100,
    };

    const computeNormalizedValue = (value, max) => {
      return (value / max) * 100;
    };

    setNormalizedData  ({
      accuracy: computeNormalizedValue(accuracy, maxvalue.maxAccuracy),
      grossWPM: computeNormalizedValue(grossWPM, maxvalue.maxGrossWPM),
      errorRate: 100 - computeNormalizedValue(errorRate, maxvalue.maxErrorRate),
      netWPM: computeNormalizedValue(netWPM, maxvalue.maxNetWPM),
      correctCounter: computeNormalizedValue(
        correctWordsPM,
        maxvalue.correctWordsPM
      ),
      keyStrokeAccuracy: computeNormalizedValue(
        keyStrokeAccuracy,
        maxvalue.maxKeyStrokeAccuracy
      ),

    });



  }, [accuracy, grossWPM, errorRate, netWPM, correctWordsPM, keyStrokeAccuracy]); 


  
  const data = {
    labels: [
      "Accuracy",
      "Gross WPM",
      "Error Rate",
      "Net WPM",
      "Correct WPM",
      "Key Stroke Accuracy",
    ],
    datasets: [
      {
        label: "Metrics",
        data: [
          normalizedData.accuracy,
          normalizedData.grossWPM,
          normalizedData.errorRate,
          normalizedData.netWPM,
          normalizedData.correctCounter,
          normalizedData.keyStrokeAccuracy,
        ],
        backgroundColor: "rgba(132, 104, 104, 0.2)",
        borderColor: "#c96c6cce",
        borderWidth: 1.5,
        pointBackgroundColor: "#b1b1b16f",
        pointBorderColor: "#ffffffad",
      },
    ],
  };

  useEffect(() => {
  


    if (normalizedData.netWPM > 55) {
      setMessage(`<h3>Hii,</h3><br/><h4>Congratulations - You are doing great! You Have Typed <span>${Math.round(normalizedData.netWPM)}</span> Words Per Minute, With <span>${Math.round(normalizedData.accuracy)}%</span> Accuracy, excellent keep it up!</h4>`);
    } else if (Math.round(normalizedData.netWPM) > 40) {
      setMessage(`<h3>Hii,</h3><br/><h4>You are doing good - You Have Typed <span>${Math.round(normalizedData.netWPM)}</span> Words Per Minute, With <span>${Math.round(normalizedData.accuracy)}%</span> Accuracy, cool, keep it up!</h4>`);
    } else {
      setMessage(`<h3>Hii,</h3><br/><h4>Not Bad - You Have Typed <span>${Math.round(normalizedData.netWPM)}</span> Words Per Minute, With <span>${Math.round(normalizedData.accuracy)}%</span> Accuracy, keep practicing, you will get better soon.</h4>`);
    }
  }, [normalizedData.netWPM, normalizedData.accuracy]);

  const options = {
    scales: {
      r: { // Make sure to use 'r' for radial scales in Chart.js version 3 and later
        angleLines: {
          display: true,
          color: '#796c6c' // Custom color for radial lines (webs)
        },
        grid: {
          color: '#7e7e7e8f' // Optional: change the circular grid lines color
        },
        pointLabels: {
          color: '#fefefe', // Changes the color of the metrics at the corners
          font: {
            size: 14 ,// Optionally adjust the font size
            weight: 'light' // Optionally adjust the font weight
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    elements: {
      line: {
        borderWidth: 3
      }
    }
  };
  return (
    // <div className="display_stat">
    //   <Radar data={data} options={options} />
    //   <div dangerouslySetInnerHTML={{ __html: message }} />
    // </div>

   
    <div className="display_stat relative flex justify-center flex-col w-screen h-screen bg-black">
      <div className="display flex w-custom h-custom">
        <Radar data={data} options={options}/>
      </div>
      <section className="display_text text-center bg-white">
    
        <div dangerouslySetInnerHTML={{__html:message}}></div>
        
      </section>
    </div>
  );
};

export default StatDisplay;
