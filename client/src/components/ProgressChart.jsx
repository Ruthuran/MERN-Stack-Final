import React, { useState, useEffect } from 'react';

const ProgressBar = ({ courseId, totalItems }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const completedItems = JSON.parse(localStorage.getItem(`completed_${courseId}`)) || [];
    const percentage = totalItems > 0 ? Math.round((completedItems.length / totalItems) * 100) : 0;
    setProgress(percentage);
  }, [courseId, totalItems]);

  return (
    <div className="my-4">
      <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
        <div
          className="bg-green-500 text-white text-sm font-semibold text-center leading-6"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
