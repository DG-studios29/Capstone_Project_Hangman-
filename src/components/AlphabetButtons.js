import React from 'react';

const AlphabetButtons = ({ onClick }) => {
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="alphabet-buttons">
      {alphabets.map((letter, index) => (
        <button key={index} onClick={() => onClick(letter)}>
          {letter}
        </button>
      ))}
    </div>
  );
};

export default AlphabetButtons;
