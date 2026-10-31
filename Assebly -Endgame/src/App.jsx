import { useState } from "react";
import "./App.css";
import { languages } from "./data";

function App() {
  const [currentWord, seCurrentWord] = useState("REACTA");
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const [gussedLetter, setGussedLetter] = useState([]);

  const wrongGuessCount = gussedLetter.filter(
    (letter) => !currentWord.toLowerCase().includes(letter.toLowerCase()),
  ).length;

  console.log(wrongGuessCount);
  function addGuessedLetter(letter) {
    if (gussedLetter.includes(letter)) {
      return;
    }
    setGussedLetter((prev) => [...prev, letter]);
  }

  const isGameWon = currentWord
    .toLowerCase()
    .split("")
    .every((letter) => gussedLetter.includes(letter));

  const isGameLost = wrongGuessCount >= languages.length - 1;
  return (
    <>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the world in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>

      <section
        className={`game-status ${isGameWon ? "game-won" : isGameLost ? "game-lost" : ""}`}
      >
        {isGameWon && (
          <>
            <h2>You win!</h2>
            <p>Well Done 🥳</p>
          </>
        )}

        {isGameLost && (
          <>
            <h2>Game Over!!</h2>
            <p>You lose! Better start learning Assembly 😭</p>
          </>
        )}
      </section>

      <section className="language-chips">
        {languages.map((lang) => (
          <span
            key={lang.name}
            style={{
              backgroundColor: lang.backgroundColor,
              color: lang.color,
            }}
          >
            {lang.name}
          </span>
        ))}
      </section>

      <section className="word">
        {currentWord.split("").map((letter, index) => {
          const isGuessed = gussedLetter.includes(letter.toLowerCase());
          return (
            <span key={index} className="letter-box">
              {isGuessed ? letter.toUpperCase() : ""}
            </span>
          );
        })}
      </section>

      <section className="keyboard">
        {alphabet.split("").map((letter) => (
          <button
            key={letter.toUpperCase()}
            className="key-btn"
            type="button"
            onClick={() => addGuessedLetter(letter)}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </section>

      <section>
        <button className="new-game">New Game</button>
      </section>
    </>
  );
}

export default App;
