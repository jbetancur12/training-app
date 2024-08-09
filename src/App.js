import React, { useEffect, useState } from 'react';
import StartDateSelector from './components/StartDateSelector';
import RoutineSelector from './components/RoutineSelector';

import app from './firebase';
import { ref, getDatabase, set, onValue } from "firebase/database";

import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [selectedRoutine, setSelectedRoutine] = useState('level1');

  const [startDate, setStartDate] = useState(() => {
    const storedDate = localStorage.getItem('startDate');
    return storedDate ? new Date(storedDate) : new Date();
  });

  const [currentWeek, setCurrentWeek] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);

  const dayNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const routines = ['level1', 'level2', 'level3', 'level4', 'level5', 'level6'];

 useEffect(() => {
  const fetchData = async () => {
    try {
      const db = getDatabase();
      const routineRef = ref(db, 'settings/routine');
      const startDateRef = ref(db, 'settings/startDate');

      // Leer la rutina seleccionada
      onValue(routineRef, (snapshot) => {
        const routine = snapshot.val();
        if (routine) {
            
          setSelectedRoutine(routine);
        }
      });

      // Leer la fecha desde Realtime Database
      onValue(startDateRef, (snapshot) => {
        const dataItem = snapshot.val();
        if (dataItem) {
          const storedDate = new Date(dataItem.startDate);
          if (storedDate instanceof Date && !isNaN(storedDate)) {
            setStartDate(storedDate);
            localStorage.setItem('startDate', dataItem.startDate);
          }
        }
      });

      // Leer los datos de entrenamiento para la rutina seleccionada
      const response = await fetch(`/${selectedRoutine}.json`);
      const jsonData = await response.json();
      setData(jsonData);

      // Calcular la semana y el día actual
      const today = new Date();
      const start = new Date(startDate);
      const daysSinceStart = Math.floor((today - start) / (1000 * 60 * 60 * 24));
      const weekNumber = Math.floor(daysSinceStart / 7);
      const dayOfWeek = daysSinceStart % 7;

      if (jsonData) {
        const week = jsonData.weeks[weekNumber];
        if (week) {
          setCurrentWeek(week);
          const day = week.days.find(d => d.day === dayOfWeek);
          setCurrentDay(day || null);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  fetchData();
}, [startDate, selectedRoutine]);

  const handleDateChange = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      const formattedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      setStartDate(date);
      localStorage.setItem('startDate', formattedDate);

      // Actualizar en Firebase
      const db = getDatabase();
      const dbRef = ref(db, 'settings/startDate');
      set(dbRef, { startDate: formattedDate })
        .then(() => console.log("Fecha actualizada en Firebase"))
        .catch((error) => console.error("Error actualizando Firebase:", error));
    }
  };
    
const handleRoutineChange = (routine) => {
  setSelectedRoutine(routine);

  // Actualizar la rutina en Firebase
  const db = getDatabase();
  const routineRef = ref(db, 'settings/routine');
  set(routineRef, routine)
    .then(() => console.log("Rutina actualizada en Firebase"))
    .catch((error) => console.error("Error actualizando Firebase:", error));
};

  const calculateWeeks = (weeks) => {
    // Implementa la lógica para ajustar las semanas si es necesario
    return weeks;
  };

  if (!data) {
    return <div className="text-center p-4">Loading...</div>;
  }

  const adjustedWeeks = calculateWeeks(data.weeks);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <StartDateSelector startDate={startDate} onDateChange={handleDateChange} />
      </div>
      <RoutineSelector routines={routines} onRoutineChange={handleRoutineChange} selectedRoutine={selectedRoutine}/>

      <div className="space-y-4">
        {adjustedWeeks.map((week, weekIndex) => (
          <details key={weekIndex} open={currentWeek && currentWeek.week === week.week} className="p-4 border rounded-lg bg-white shadow">
            <summary className="cursor-pointer font-bold text-lg text-gray-700">Semana {week.week + 1}</summary>
            {week.days.map((day, dayIndex) => (
              <details key={dayIndex} open={currentDay && currentDay.day === day.day} className="p-4 mt-2 border rounded-lg bg-gray-50">
                <summary className="cursor-pointer font-semibold text-gray-600">{dayNames[day.day]}</summary>
                <ul className="list-disc pl-6 mt-2">
                  {day.sections.map((section, sectionIndex) => (
                    <li key={sectionIndex} className="mb-2">
                      <strong>{section.name}:</strong>
                      {section.type === 'cycle' ? (
                        <ul className="list-disc pl-4 mt-1">
                          {section.exercises.map((exercise, exerciseIndex) => (
                            <li key={exerciseIndex} className="mb-2">
                              <p><strong>Exercise:</strong> {exercise.name}</p>
                              <p><strong>Video:</strong> <a href={exercise.video_tutorial} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Watch Video</a></p>
                              <p><strong>Series:</strong> {section.reps}</p>
                              <p><strong>Repetitions:</strong> {exercise.repetitions}</p>
                              <p><strong>Reserve Reps:</strong> {exercise.reserve_reps}</p>
                              <p><strong>Rest:</strong> {exercise.rest} seconds</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p><strong>Rest:</strong> {section.time} seconds</p>
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </details>
        ))}
      </div>
    </div>
  );
}

export default App;
