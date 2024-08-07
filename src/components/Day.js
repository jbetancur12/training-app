import React, { useState } from 'react';
import Section from './Section';

const daysOfWeek = [
  'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'
];

function Day({ day }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Convert day index to the day of the week
  const dayName = daysOfWeek[day.day % 7];

  return (
    <div className="mb-6 border border-gray-200 rounded-lg shadow">
      <button 
        onClick={toggleOpen} 
        className="w-full p-4 text-left bg-gray-100 hover:bg-gray-200 focus:outline-none"
      >
        <h3 className="text-xl font-semibold">
          {dayName} 
        </h3>
      </button>
      {isOpen && (
        <div className="p-4">
          {day.sections.map((section, index) => (
            <Section key={index} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Day;
