import React, { useState } from 'react';
import Game from './Game/Game';

const StarMatch = () => {
    const [gameId, setGameId]  = useState(1);
    return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>
}

export default function App({ initialData }) {
  return (
    <div>
        <StarMatch></StarMatch>
    </div>
  );
}
