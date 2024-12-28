import { useCallback, useEffect, useState } from 'react';
import words from './wordsList.json';
import { HangmanDrawing, HangmanWord, Keyboard } from './COMPONENTS_LIST';

const getWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter),
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split('')
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetters = useCallback(
    (letter: string): void => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isLoser, isWinner],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      const key = e.key;
      if (!key.match(/^[a-z]/)) return;
      e.preventDefault();
      addGuessedLetters(key);
    };
    document.addEventListener('keypress', handler);
    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, [addGuessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      const key = e.key;
      if (key !== 'Enter') return;
      e.preventDefault();
      setWordToGuess(getWord());
      setGuessedLetters([]);
    };
    document.addEventListener('keypress', handler);
    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        margin: '0 auto',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: '2rem', textAlign: 'center' }}>
        {isWinner && 'Winner! - Click «Enter» to play again'}
      </div>
      <div style={{ fontSize: '2rem', textAlign: 'center' }}>
        {isLoser && 'Nice try! - Click «Enter» to try again'}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div
        style={{
          alignSelf: 'stretch',
        }}
      >
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter),
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetters={addGuessedLetters}
        />
      </div>
    </div>
  );
}

export default App;
