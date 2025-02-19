import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";

// Import shadcn/Recharts chart components
import { LabelList, RadialBar, RadialBarChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const StatDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [normalizedData, setNormalizedData] = useState({
    accuracy: 0,
    grossWPM: 0,
    errorRate: 0,
    netWPM: 0,
    correctCounter: 0,
    keyStrokeAccuracy: 0,
  });

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

    const computeNormalizedValue = (value, max) => (value / max) * 100;

    setNormalizedData({
      accuracy: computeNormalizedValue(accuracy, maxvalue.maxAccuracy),
      grossWPM: computeNormalizedValue(grossWPM, maxvalue.maxGrossWPM),
      errorRate: 100 - computeNormalizedValue(errorRate, maxvalue.maxErrorRate),
      netWPM: computeNormalizedValue(netWPM, maxvalue.maxNetWPM),
      correctCounter: computeNormalizedValue(correctWordsPM, maxvalue.correctWordsPM),
      keyStrokeAccuracy: computeNormalizedValue(keyStrokeAccuracy, maxvalue.maxKeyStrokeAccuracy),
    });
  }, [accuracy, grossWPM, errorRate, netWPM, correctWordsPM, keyStrokeAccuracy]);

  useEffect(() => {
    if (normalizedData.grossWPM > 55) {
      setMessage(
        `<h4>Hii, and Congratulations!! - You are doing great! You Have Typed <span>${Math.round(
          normalizedData.grossWPM
        )}</span> Words in a Minute, With An outstanding accuracy of <span>${Math.round(
          normalizedData.accuracy
        )}%</span>, excellent keep it up!</h4>`
      );
    } else if (Math.round(normalizedData.grossWPM) > 40) {
      setMessage(
        `<h4>Hii, You are doing good - You Have Typed <span>${Math.round(
          normalizedData.grossWPM
        )}</span> Words in a Minute, With An good accuracy of <span>${Math.round(
          normalizedData.accuracy
        )}%</span>, cool, keep it up!</h4>`
      );
    } else {
      setMessage(
        `<h4>Hii, Not Bad - You Have Typed <span>${Math.round(
          normalizedData.grossWPM
        )}</span> Words in a Minute, With An accuracy of <span>${Math.round(
          normalizedData.accuracy
        )}%</span> , keep practicing, you will get better soon.</h4>`
      );
    }
  }, [normalizedData.grossWPM, normalizedData.accuracy]);

  const handleReset = () => {
    navigate("/");
  };

  // Prepare chartData using the normalized metrics.
  const chartData = [
    { metric: "Accuracy", visitors: normalizedData.accuracy, fill: "hsl(var(--chart-1))" },
    { metric: "Gross WPM", visitors: normalizedData.grossWPM, fill: "hsl(var(--chart-2))" },
    { metric: "Error Rate", visitors: normalizedData.errorRate, fill: "hsl(var(--chart-3))" },
    { metric: "Net WPM", visitors: normalizedData.netWPM, fill: "hsl(var(--chart-4))" },
    { metric: "Correct WPM", visitors: normalizedData.correctCounter, fill: "hsl(var(--chart-5))" },
    { metric: "Key Stroke Accuracy", visitors: normalizedData.keyStrokeAccuracy, fill: "hsl(200,80%,50%)" },
  ];

  // Local chart configuration (if needed by ChartContainer)
  const chartConfig = {
    visitors: {
      label: "Score",
    },
  };

  return (
    <div className="display_stat flex justify-center items-center flex-col w-full h-screen bg-black">
      {/* Chart container remains unchanged */}
      <div className="display flex w-full h-72">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={20}  // Reduced innerRadius for a thicker bar
            outerRadius={120} // Increased outerRadius for a thicker bar
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="metric" />}
            />
            <RadialBar dataKey="visitors" background>
              <LabelList
                position="insideStart"
                dataKey="metric"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </div>

      {/* Message display remains unchanged */}
      <section className="text-center text-white">
        <div dangerouslySetInnerHTML={{ __html: message }} className="text-2xl w-[60%] mx-auto font-medium"></div>
      </section>

      {/* Reset button remains unchanged */}
      <button className="text-white btn mt-4" onClick={handleReset}>
        Retest
      </button>
    </div>
  );
};

export default StatDisplay;
