import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function StartDateSelector({ startDate, onDateChange }) {
  // Asegúrate de que startDate sea una instancia válida de Date
  const validDate = startDate instanceof Date && !isNaN(startDate) ? startDate : new Date();

  const formattedDate = validDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex items-center space-x-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de inicio:</label>
        <DatePicker
          selected={validDate}
          onChange={(date) => onDateChange(date)}
          dateFormat="yyyy-MM-dd" // Cambia el formato si es necesario
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="text-gray-700">
        <strong>Fecha seleccionada: </strong>{formattedDate}
      </div>
    </div>
  );
}

export default StartDateSelector;
