import React from 'react';

function RoutineSelector({ routines, onRoutineChange, selectedRoutine }) {
  return (
    <select value={selectedRoutine} onChange={(e) => onRoutineChange(e.target.value)} className="mb-4">
      {routines.map((routine) => (
        <option key={routine} value={routine}>
          {routine}
        </option>
      ))}
    </select>
  );
}

export default RoutineSelector;
