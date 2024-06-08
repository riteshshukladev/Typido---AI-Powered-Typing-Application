


import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import "chart.js/auto";
import { useLocation,useNavigate } from "react-router-dom";
import "./style.css"
const StatDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  


    if (normalizedData.grossWPM > 55) {
      setMessage(`<h4>Hii, and Congratulations!! - You are doing great! You Have Typed <span>${Math.round(normalizedData.grossWPM)}</span> Words in a Minute, With An outstanding accuracy of <span>${Math.round(normalizedData.accuracy)}%</span>, excellent keep it up!</h4>`);
    } else if (Math.round(normalizedData.grossWPM) > 40) {
      setMessage(`<h4>Hii, You are doing good - You Have Typed <span>${Math.round(normalizedData.grossWPM)}</span> Words in a Minute, With An good accuracy of <span>${Math.round(normalizedData.accuracy)}%</span>, cool, keep it up!</h4>`);
    } else {
      setMessage(`<h4>Hii, Not Bad - You Have Typed <span>${Math.round(normalizedData.grossWPM)}</span> Words in a Minute, With An accuracy of <span>${Math.round(normalizedData.accuracy)}%</span> , keep practicing, you will get better soon.</h4>`);
    }
  }, [normalizedData.grossWPM, normalizedData.accuracy]);

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

  const handleReset = () => {
    navigate("/");
  };

  return (
  

   
    <div className="display_stat flex justify-center items-center flex-col w-full	h-full bg-black">
      <div className="display flex w-custom h-custom">
        <Radar data={data} options={options}/>
      </div>
      <section className="display_text text-center text-white	">
    
        <div dangerouslySetInnerHTML={{__html:message}}></div>
        
      </section>

      <button className="text-white btn" onClick={handleReset}>Retest</button>
    </div>
  );
};

export default StatDisplay;
