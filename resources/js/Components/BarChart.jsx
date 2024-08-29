import React from 'react';

const BarChart = ({ data }) => {
    
  // Dimensions and margins
  const width = 400;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };

  // Compute chart dimensions
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Scale functions
  const xScale = (index) => (index / (data.length - 1)) * innerWidth;
  const yScale = (value) => innerHeight - (value / Math.max(...data.map(d => d.value))) * innerHeight;

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md w-full h-full">
      <h3 className="text-lg font-semibold mb-4">Bar Chart</h3>
      <svg width="100%" height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {data.map((d, i) => (
            <rect
              key={i}
              x={xScale(i)}
              y={yScale(d.value)}
              width={(innerWidth / data.length) - 10}
              height={innerHeight - yScale(d.value)}
              fill="#FF4C00"
            />
          ))}
          {/* X-axis labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={xScale(i) + (innerWidth / data.length) / 2}
              y={innerHeight + 15}
              fontSize="6"
              textAnchor="middle"
            >
              {d.label}
            </text>
          ))}
          {/* Y-axis label */}
          <text x={-margin.left / 2} y={innerHeight / 2} fontSize="10" textAnchor="middle" transform={`rotate(-90, ${-margin.left / 2}, ${innerHeight / 2})`}>
            Value
          </text>
        </g>
      </svg>
    </div>
  );
};

export default BarChart;
