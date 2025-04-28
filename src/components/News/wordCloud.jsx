import React from 'react';
import WordCloud from 'react-wordcloud';

const WordCloudChart = ({ data }) => {
    const options = {
        rotations:0,
        rotationAngles: [0, 0], // all words horizontal
        fontSizes: [14, 50],
        scale: "sqrt", // instead of 'linear' (prevents oversized value distortions)
        fontFamily: "sans-serif",
        enableTooltip: false, // removes tooltip
        deterministic: true,  // makes layout consistent
        spiral: "archimedean",
        // Optional: define custom renderer for full control
        // This is not needed unless you're manually combining text+value
      };
      

  return (
    <div style={{ height: 400, width: '100%' }}>
      <WordCloud words={data} options={options} />
    </div>
  );
};

export default WordCloudChart;
