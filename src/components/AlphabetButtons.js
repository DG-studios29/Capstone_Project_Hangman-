// AlphabetButtons.js

import React from 'react';

const AlphabetButtons = ({ onClick, disabledLetters }) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const handleClick = (letter) => {
        onClick(letter);
    };

    return (
        <div className="alphabet-buttons">
            {alphabet.split('').map((letter, index) => (
                <button 
                    key={index}
                    onClick={() => handleClick(letter)}
                    disabled={disabledLetters.includes(letter)} // Disable button if the letter is guessed
                >
                    {letter}
                </button>
            ))}
        </div>
    );
};

export default AlphabetButtons;
