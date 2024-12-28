import styles from './Keyboard.module.css';
import { KEYS } from './KEYS';

interface IKeyboardProps {
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetters: (letter: string) => void;
  disabled: boolean;
}

const Keyboard = ({
  activeLetters,
  inactiveLetters,
  addGuessedLetters,
  disabled,
}: IKeyboardProps) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(55px, 1fr))',
        gap: '.5rem',
      }}
    >
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);

        return (
          <button
            onClick={() => {
              addGuessedLetters(key);
            }}
            className={`${styles.btn} ${isActive && styles.active} ${isInactive && styles.inactive}`}
            key={key}
            disabled={isInactive || isActive || disabled}
          >
            {key.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
