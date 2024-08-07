import React from 'react';

function Section({ section }) {
  return (
    <div className="mb-4 p-4 border rounded-lg">
      <h4 className="text-lg font-semibold mb-2">{section.name}</h4>
      {section.type === 'cycle' ? (
        <div>
          {section.exercises.map((exercise, index) => (
            <div key={index} className="mb-2">
              <p className="text-gray-700"><strong>Exercise:</strong> {exercise.name}</p>
              <p className="text-gray-700"><strong>Repetitions:</strong> {exercise.repetitions}</p>
              <p className="text-gray-700"><strong>Reserve Reps:</strong> {exercise.reserve_reps}</p>
              <p className="text-gray-700"><strong>Rest:</strong> {exercise.rest} seconds</p>
              <a href={exercise.video_tutorial} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Watch Video</a>
        
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700"><strong>Rest Time:</strong> {section.time} seconds</p>
      )}
    </div>
  );
}

export default Section;
