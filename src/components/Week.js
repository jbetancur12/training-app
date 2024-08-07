import React, { useState } from 'react';
import Day from './Day';

function Week({ week }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="mb-8 border border-gray-200 rounded-lg shadow">
      <button 
        onClick={toggleOpen} 
        className="w-full p-4 text-left bg-gray-100 hover:bg-gray-200 focus:outline-none"
      >
        <h2 className="text-2xl font-bold">
          Week {week.week} ({week.start_date} - {week.end_date})
        </h2>
      </button>
      {isOpen && (
        <div className="p-4">
          {week.days.map((day, index) => (
            <Day key={index} day={day} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Week;
