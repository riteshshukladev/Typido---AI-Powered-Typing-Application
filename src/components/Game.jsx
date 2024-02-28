import React from 'react'

const Game = ({message , onGameSet}) => {
  return (
    <div>
        <p>{message}</p>
        <button onClick={onGameSet}>Play Again</button>
    </div>
  )
}

export default Game