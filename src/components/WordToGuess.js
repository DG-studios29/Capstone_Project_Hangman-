import React from 'react';

const WordToGuess = ({ word, guessedLetters }) => {
  if (!word) {
    return null; // Return null if word is not yet initialized
  }

  const displayWord = word
    .split('')
    .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');

  return <div className="word-to-guess">{displayWord}</div>;
};

export default WordToGuess;
