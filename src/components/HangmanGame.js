import React, { useState, useEffect } from 'react';
import AlphabetButtons from './AlphabetButtons';
import GameOver from './GameOver';
import HangmanFigure from './HangmanFigure';
import WordToGuess from './WordToGuess';
import words from '../data/words.json';

const HangmanGame = () => {
    const [wordIndex, setWordIndex] = useState(-1); // Index of the current word
    const [word, setWord] = useState('');
    const [hint, setHint] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [hintVisible, setHintVisible] = useState(false);
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
        } else {
            // If all words have been used, reset to the first word
            setWordIndex(0);
        }
    };

    // Function to handle letter selection
    const handleLetterSelection = (letter) => {
        if (!guessedLetters.includes(letter)) {
            const newGuessedLetters = [...guessedLetters, letter];
            setGuessedLetters(newGuessedLetters);
            if (!word.includes(letter)) {
                setIncorrectGuesses(incorrectGuesses + 1);
                setScore(score - incorrectGuessPenalty); // Decrease score on incorrect guess
            } else {
                setScore(score + correctGuessScore); // Increase score on correct guess
            }
            setDisabledButtons([...disabledButtons, letter]); // Disable the clicked button
        }
    };

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

    useEffect(() => {
        if (checkWin() || checkLoss()) {
            setGameOver(true);
        }
        if (checkLoss()) {
            setDisabledButtons([...disabledButtons, ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']); // Disable all buttons on loss
        }
    }, [guessedLetters, incorrectGuesses]);

    useEffect(() => {
        startNewGame();
    }, []);

    return (
        <div>
            <h1>Hangman Game</h1>
            <HangmanFigure wrongAttempts={incorrectGuesses} />
            <WordToGuess word={word} guessedLetters={guessedLetters} />
            <AlphabetButtons
                onClick={(letter) => handleLetterSelection(letter)}
                disabled={gameOver || checkLoss()} // Disable buttons on game over or loss
                disabledLetters={disabledButtons} // Pass disabled letters as prop
            />
            <button onClick={() => setHintVisible(!hintVisible)}>Show Hint</button>
            {hintVisible && <p>Hint: {hint}</p>}
            {gameOver && (
                <p>
                    {checkWin() ? 'Congratulations! You won!' : 'Sorry, you lost!'}
                </p>
            )}
            <GameOver
                isWin={checkWin()}
                isLoss={checkLoss()}
                onRestart={startNewGame}
            />
            <p>Score: {score}</p>
            <button onClick={startNewGame}>Next</button> {/* Next button */}
            <button onClick={startNewGame}>Restart</button> {/* Restart button */}
        </div>
    );
};

export default HangmanGame;
