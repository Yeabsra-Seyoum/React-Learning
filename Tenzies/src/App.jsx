import React from "react";
import "./App.css";
import Die from "./Die.jsx";
import Confetti from "./Confetti.jsx";

function App() {
  const [won, setWon] = React.useState(false);
  // Update the array of numbers in state to be
  //  an array of objects instead. Each object should look like:
  //  { value: <random number>, isHeld: false }
  const [dice, setDice] = React.useState(generateAllNewDice);
  const diceElement = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      taken={() => holdDie(die.id)}
    />
  ));

  function generateAllNewDice() {
    // The initializer must return the first dice array; it must not call setDice
    // because setDice is not initialized until useState has finished running.
    return new Array(10).fill(0).map((_, index) => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: index,
    }));
  }

  const targetNUmber = React.useRef(null);

  function holdDie(id) {
    const clickedDie = dice.find((die) => die.id === id);
    if (targetNUmber.current === null) {
      targetNUmber.current = clickedDie.value;
    }

    const newDice = dice.map((die) => {
      return die.id === id && die.value === targetNUmber.current
        ? { ...die, isHeld: !die.isHeld }
        : die;
    });

    setDice(newDice);
    if (
      newDice.every((die) => die.value === targetNUmber.current && die.isHeld)
    ) {
      setWon(true);
    }
  }

  function rollDice() {
    // Use the current dice state so held dice keep their value and identity,
    // while only unheld dice receive a new random value.

    setDice((prevDice) =>
      prevDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) },
      ),
    );
  }

  function newGame() {
    setDice(generateAllNewDice);
    targetNUmber.current = null;
    setWon(false);
  }

  return (
    <main>
      {won && (
        <>
          <p className="win-message" role="status">You won! 🎉</p>
          <Confetti />
        </>
      )}
      <div className="dice-container">{diceElement}</div>
      <button className="roll-dice" onClick={won ? newGame : rollDice}>
        {won ? "Start new game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
