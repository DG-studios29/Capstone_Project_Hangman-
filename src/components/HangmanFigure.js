import React from 'react';
import hangmanStep1 from '../hangmandrawings/state1.GIF'; // Import the image
import hangmanStep2 from '../hangmandrawings/state2.GIF'; // Import the image
import hangmanStep3 from '../hangmandrawings/state3.GIF'; // Import the image
import hangmanStep4 from '../hangmandrawings/state4.GIF'; // Import the image
import hangmanStep5 from '../hangmandrawings/state5.GIF'; // Import the image
import hangmanStep6 from '../hangmandrawings/state6.GIF'; // Import the image
import hangmanStep7 from '../hangmandrawings/state7.GIF'; // Import the image
import hangmanStep8 from '../hangmandrawings/state8.GIF'; // Import the image
import hangmanStep9 from '../hangmandrawings/state9.GIF'; // Import the image
import hangmanStep10 from'../hangmandrawings/state10.GIF'; // Import the image
import hangmanStep11 from'../hangmandrawings/state11.GIF'; // Import the image

const HangmanFigure = ({ wrongAttempts  }) => {
    const hangmanSteps = [
      hangmanStep1, // Use the imported GIFs
      hangmanStep2,
      hangmanStep3,
      hangmanStep4,
      hangmanStep5,
      hangmanStep6,
      hangmanStep7,
      hangmanStep8,
      hangmanStep9,
      hangmanStep10,
      hangmanStep11
      // Add other Hangman GIFs here for different incorrect guesses
    ];
  
   // Ensure that the incorrectGuesses index does not exceed the number of available Hangman steps
  const index = Math.min(wrongAttempts , hangmanSteps.length - 1);
  const imagePath = hangmanSteps[index];

  return (
    <div className="hangman-figure">
      {/* Use the dynamically selected Hangman GIF */}
      <img src={imagePath} alt={`Hangman step ${wrongAttempts }`} />
    </div>
  );
};
  
export default HangmanFigure;
