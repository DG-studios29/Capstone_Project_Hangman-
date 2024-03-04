import React, { useState, useEffect } from 'react';
import AlphabetButtons from './AlphabetButtons';
import GameOver from './GameOver';
import HangmanFigure from './HangmanFigure';
import WordToGuess from './WordToGuess';
import words from '../data/words.json';
import '../Hangman.css'; // Import the CSS file
import Green from '../hangmandrawings/green.gif'; // Import the GIF file
import Red from '../hangmandrawings/red.gif'; // Import the GIF file

const HangmanGame = () => {
    const [wordIndex, setWordIndex] = useState(-1); // Index of the current word
    const [word, setWord] = useState('');
    const [hint, setHint] = useState('');
    const [scoreIncreased, setScoreIncreased] = useState(false);
    const [scoreDecreased, setScoreDecreased] = useState(false);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [wordToGuess, setWordToGuess] = useState('');
    const [hintVisible, setHintVisible] = useState(false);
    const [currentWord, setCurrentWord] = useState('');
    const [disabledButtons, setDisabledButtons] = useState([]); // State to track disabled buttons
    const [score, setScore] = useState(0); // Score state
    const maxIncorrectGuesses = 11;
    const correctGuessScore = 5;
    const incorrectGuessPenalty = 2;

    // Function to start a new game or move to the next word
    const startNewGame = () => {
        const nextIndex = wordIndex + 1;
        if (nextIndex < words.length) {
            const { word: newWord, hint: newHint } = words[nextIndex];
            setWord(newWord.toUpperCase());
            setHint(newHint);
            setGuessedLetters([]);
            setIncorrectGuesses(0);
            setGameOver(false);
            setHintVisible(false);
            setDisabledButtons([]);
            setWordIndex(nextIndex);
            setCurrentWord(newWord); // Update currentWord here
        } else {
            // If all words have been used, reset to the first word
            setWordIndex(0);
            setCurrentWord(words[0].word.toUpperCase()); // Update currentWord to the first word
        }
    };

   

    // Function to handle letter selection
    const handleLetterSelection = (letter) => {
        if (!guessedLetters.includes(letter)) {
            const newGuessedLetters = [...guessedLetters, letter];
            setGuessedLetters(newGuessedLetters);
            if (!word.includes(letter)) {
                setIncorrectGuesses(incorrectGuesses + 1);
                // Deduct points for incorrect guess
                setScore(score - incorrectGuessPenalty);
                {score > 0 && <img src={Red} alt="Score Down" />}
            } else {
                // Award points for correct guess
                setScore(score + correctGuessScore);
                
            }
        }
    };

    const restartGame = () => {
        setScore(0);
        setGameOver(false);
        setHintVisible(false);
        setWordToGuess(selectRandomWord());
        startNewGame(); // Call startNewGame to properly reset the game state
        

    };


     // Function to select a random word from the word list
     const selectRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    };

    useEffect(() => {
        // Logic to detect score changes
        if (score > 0) {
            setScoreIncreased(true);
            setTimeout(() => {
                setScoreIncreased(false);
            }, 3000); // Hide the GIF after 3 seconds
        } else if (score < 0) {
            setScoreDecreased(true);
            setTimeout(() => {
                setScoreDecreased(false);
            }, 3000); // Hide the GIF after 3 seconds
        }
    }, [score]);

    useEffect(() => {
        startNewGame();
    }, []);

    useEffect(() => {
        // Initialize the word to guess when the component mounts
        setWordToGuess(selectRandomWord());
    }, []);

    useEffect(() => {
        if (checkWin() || checkLoss()) {
            setGameOver(true);
        }
    }, [guessedLetters, incorrectGuesses]);
    
    useEffect(() => {
        if (checkLoss()) {
            setDisabledButtons('ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // Disable all buttons on loss
        }
    }, [incorrectGuesses]);
    
    // Function to check if the player has won
    const checkWin = () => {
        for (const letter of word) {
            if (!guessedLetters.includes(letter)) {
                return false;
            }
        }
        return true;
    };
    
    // Function to check if the player has lost
    const checkLoss = () => {
        return incorrectGuesses >= maxIncorrectGuesses;
    };

   

    return (
        <div>
            <div className='hangman-header'>
            <h1>Hangman Game</h1>
            </div>
            
            <HangmanFigure wrongAttempts={incorrectGuesses} />
            <WordToGuess word={word} guessedLetters={guessedLetters} />
            <AlphabetButtons
                onClick={(letter) => handleLetterSelection(letter)}
                disabled={gameOver || checkLoss()} // Disable buttons on game over or loss
                disabledLetters={disabledButtons} // Pass disabled letters as prop
            />
            <div className="action-buttons">
            <div className="hint-container">
            <button onClick={() => setHintVisible(!hintVisible)}>Hint</button>
            </div>
            
            {hintVisible && <p>Hint: {hint}</p>}
            </div>
            {gameOver && (
                <div className='game-over-message'>
                <p>
                {checkWin() ? 'Congratulations! You won!' : `Sorry, you lost! The word was: ${currentWord}`}
                </p>
                </div>
            )}
            <GameOver
                isWin={checkWin()}
                isLoss={checkLoss()}
                onRestart={startNewGame}
            />

           
            
            {typeof wordToGuess === 'string' && <WordToGuess word={wordToGuess} />}
            {/* Render WordToGuess component only if wordToGuess is a string */}
            <div className="action-buttons">
            <button onClick={startNewGame}>Next</button> {/* Next button */}
            <button onClick={restartGame}>Restart</button>
            </div>
            <div className="hangman-game">
            <div className="score-container">Score: {score}</div>
            {/* Other game components */}
            
        </div>
        </div>
        
    );

   
};

export default HangmanGame;
