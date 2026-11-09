import { useState, useEffect } from "react";
import "./App.css";
import { languages, words, getFarewellText } from "./data";
import { clsx } from "clsx";
import confetti from "canvas-confetti";

export default function App() {
  const wordIndex = Math.floor(Math.random() * words.length);
  const word = words[wordIndex];
  const [currentWord, setCurrentWord] = useState(word);
  const [guessedLetter, setGuessedLetter] = useState([]);
  const [farewellMessage, setFarewellMessage] = useState("");
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const wrongGuessCount = guessedLetter.filter(
    (letter) => !currentWord.toLowerCase().includes(letter.toLowerCase()),
  ).length;

  function addGuessedLetter(letter) {
    if (guessedLetter.includes(letter)) return;

    setGuessedLetter((prev) => [...prev, letter]);

    if (!currentWord.includes(letter)) {
      setFarewellMessage(getFarewellText(languages[wrongGuessCount].name));
    }
  }

  const isGameWon = currentWord
    .toLowerCase()
    .split("")
    .every((letter) => guessedLetter.includes(letter));

  const isGameLost = wrongGuessCount >= languages.length - 1;

  function newGame() {
    setGuessedLetter([]);
    setCurrentWord(word);
    setFarewellMessage("");
  }

  // Confetti Celebration
  const celebrateWin = () => {
    const end = Date.now() + 3000;
    const colors = ["#bb0000", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  useEffect(() => {
    if (isGameWon) {
      celebrateWin();
    }
  }, [isGameWon]);

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
        {!isGameWon && !isGameLost && farewellMessage && (
          <p className="farewell-message">{farewellMessage}</p>
        )}

        {isGameWon && (
          <>
            <h2>You win!</h2>
            <p>Well Done 🥳</p>
          </>
        )}
        {isGameLost && (
          <>
            <h2>Game Over!!</h2>
            <p>You better start learning Assembly</p>
          </>
        )}
      </section>

      <section className="language-chips">
        {languages.map((lang, index) => {
          const isLost = index < wrongGuessCount;
          return (
            <span
              key={lang.name}
              className={`chip ${isLost ? "lost" : ""}`}
              style={{
                backgroundColor: lang.backgroundColor,
                color: lang.color,
              }}
            >
              {lang.name}
            </span>
          );
        })}
      </section>

      <section className="word">
        {currentWord.split("").map((letter, index) => {
          const isGuessed = guessedLetter.includes(letter.toLowerCase());
          const shouldRevealLetter = isGameLost || isGuessed;
          const letterClass = clsx("letter-box", {
            "revealed-letter": isGameLost && !isGuessed,
          });

          return (
            <span key={index} className={letterClass}>
              {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
          );
        })}
      </section>

      <section className="keyboard">
        {alphabet.split("").map((letter) => {
          const isGuessed = guessedLetter.includes(letter);
          const isCorrect =
            isGuessed && currentWord.toLowerCase().includes(letter);
          const isWrong = isGuessed && !isCorrect;
          return (
            <button
              key={letter.toUpperCase()}
              className={clsx("key-btn", {
                "guessed-correct": isCorrect,
                "guessed-wrong": isWrong,
              })}
              type="button"
              onClick={() => addGuessedLetter(letter)}
              disabled={isGuessed || isGameWon || isGameLost}
            >
              {letter.toUpperCase()}
            </button>
          );
        })}
      </section>

      <section>
        <button className="new-game" onClick={newGame}>
          New Game
        </button>
      </section>
    </>
  );
}
