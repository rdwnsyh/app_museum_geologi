// resources/js/Components/LineChart.jsx

import React from 'react';

const LineChart = () => {
  // Sample data
  const data = [
    { label: 'January', value: 65 },
    { label: 'February', value: 59 },
    { label: 'March', value: 80 },
    { label: 'April', value: 81 },
    { label: 'May', value: 56 },
    { label: 'June', value: 55 },
    { label: 'July', value: 40 },
    { label: 'August', value: 80 },
    { label: 'September', value: 81 },
    { label: 'October', value: 56 },
    { label: 'November', value: 55 },
    { label: 'December', value: 40 }

  ];

  // Dimensions and margins
  const width = 800;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };

  // Compute chart dimensions
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Scale functions
  const xScale = (index) => (index / (data.length - 1)) * innerWidth;
  const yScale = (value) => innerHeight - (value / 100) * innerHeight;

  // Create path data
  const pathData = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i) + margin.left},${yScale(d.value) + margin.top}`)
    .join(' ');

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md w-full h-full">
      <h3 className="text-lg font-semibold mb-4">Sales Over Time</h3>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <path d={pathData} fill="none" stroke="#42A5F5" strokeWidth="2" />
          {/* X-axis */}
          {data.map((d, i) => (
            <text
              key={i}
              x={xScale(i)}
              y={innerHeight + 15}
              fontSize="10"
              textAnchor="middle"
            >
              {d.label}
            </text>
          ))}
          {/* Y-axis */}
          <text x={-margin.left / 2} y={innerHeight / 2} fontSize="10" textAnchor="middle" transform={`rotate(-90, ${-margin.left / 2}, ${innerHeight / 2})`}>
            Sales
          </text>
        </g>
      </svg>
    </div>
  );
};

export default LineChart;
