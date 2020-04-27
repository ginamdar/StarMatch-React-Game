import React from "react";

const PlayAgain = props => (
    <div className="game-done">
        <div
            className="message"
            style={{ color: props.gameMessage === 'lost' ? 'red' : 'green'}}
        >
            {props.gameMessage === 'lost' ? 'Game Over' : 'Nice!'}
        </div>
        <button onClick={props.onClick}>Play Again</button>
    </div>
)

export default PlayAgain;
