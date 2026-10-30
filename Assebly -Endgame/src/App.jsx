import "./App.css";
import Header from "./components/Header";
import { languages } from "./data";

function App() {
  const currentWord = "Reacting";
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return (
    <>
      <Header />

      <section className="game-status">
        <h2>You win!</h2>
        <p>Well Done🥳</p>
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
        {currentWord.split("").map((letter, index) => (
          <span key={index} className="letter-box">
            {letter}
          </span>
        ))}
      </section>

      <section className="keyboard">
        {alphabet.split("").map((letter) => (
          <button key={letter} className="key-btn" type="button">
            {letter.toUpperCase()}
          </button>
        ))}
      </section>
    </>
  );
}

export default App;
