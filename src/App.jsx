import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Die from './components/Die';
import './App.css'

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(()=>{

    let result = dice.every(d =>{
      return d.isHeld && d.value === dice[0].value
    })
    if(result){
      setTenzies(true);
      console.log("You won!")
    }
  },[dice])

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false
    }
  }
  function allNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }


  const diceElements = dice.map((diceEl) => {
    return <Die
      key={diceEl.id}
      id={diceEl.id}
      value={diceEl.value}
      isHeld={diceEl.isHeld}
      holdDice={onHoldDice}
    />
  })

  function rollDice() {
    setDice(oldDice => {
      return oldDice.map(oldDie => {
        return oldDie.isHeld ? oldDie : generateNewDie();
      })
    });
  }
  function rerollDice(){
    setDice(allNewDice())
    setTenzies(false)
  }
  function onHoldDice(id) {
    setDice((oldDice) => {
      return oldDice.map(oldDie => {
        return oldDie.id === id ? { ...oldDie, isHeld: !oldDie.isHeld } : oldDie
      })
    })
  }

  return (
    <div className="App">
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="container">
        {diceElements}
      </div>
      {!tenzies && <button
        className='btnRoll'
        onClick={rollDice}>Roll
      </button>}
      {tenzies && <button
        className='btnRoll'
        onClick={rerollDice}>Reset Game
      </button>}
    </div>
  )
}

export default App
