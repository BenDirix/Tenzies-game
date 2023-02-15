import React from "react";

export default function Die({id,value,isHeld, holdDice}){  
  return(
    <div className={isHeld ? "heldDice" : "dice"} onClick={() => holdDice(id)}>
      <h4 className="diceNumber">{value}</h4>
    </div>
    
  )
}