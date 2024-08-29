import React from 'react';

const PieChart = ({ data }) => {
  // Dimensions
  const radius = 100;
  const diameter = radius * 12;
  const center = radius;

  // Calculate total
  const total = data.reduce((acc, d) => acc + d.value, 0);
  let cumulativeValue = 0;

  const pathData = data.map(d => {
    const startAngle = (cumulativeValue / total) * 2 * Math.PI;
    cumulativeValue += d.value;
    const endAngle = (cumulativeValue / total) * 2 * Math.PI;

    const startX = center + radius * Math.cos(startAngle);
    const startY = center + radius * Math.sin(startAngle);
    const endX = center + radius * Math.cos(endAngle);
    const endY = center + radius * Math.sin(endAngle);

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
    const path = `
      M ${center} ${center}
      L ${startX} ${startY}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
      Z
    `;
    return { path, color: `hsl(${Math.random() * 360}, 70%, 60%)` };
  });

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md w-full h-full">
      <h3 className="text-lg font-semibold mb-4">Pie Chart</h3>
      <svg width="100%" height={diameter}>
        <g transform={`translate(${center}, ${center})`}>
          {pathData.map((d, i) => (
            <path key={i} d={d.path} fill={d.color} />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default PieChart;
