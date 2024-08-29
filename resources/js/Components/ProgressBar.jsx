import React from 'react';

const ProgressBar = ({ title, total, progress, color = 'blue' }) => {
  const colorClass = {
    success: 'bg-green-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  }[color] || 'bg-gray-500';

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md h-full flex flex-col justify-between">
      <div>
        <h2 className="text-sm font-semibold">{title}</h2>
        <div className="text-sm text-gray-600">{total}</div>
      </div>
      <div className="relative h-2 w-full rounded-full bg-gray-200 mt-2">
        <div
          className={`absolute top-0 left-0 h-full rounded-full ${colorClass}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
