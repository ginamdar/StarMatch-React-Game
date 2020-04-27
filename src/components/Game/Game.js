// Custom Hook
import React, {useEffect, useState} from "react";
import PlayAgain from '../PlayAgain/PlayAgain';
import StarDisplay from '../StarDisplay/StarDisplay';
import PlayNumber from '../PlayNumber/PlayNumber';
import utils from '../../math-utils';

const useGameState = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    // candidateNums,
    // AvailableNumbers
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);
    useEffect(() => {
        // console.log('Rendered');
        if (secondsLeft > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    });
    const setGameState = (newCandidateNums) => {
        if (utils.sum(newCandidateNums) != stars) {
            setCandidateNums(newCandidateNums)
        } else {
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n)
            );
            // redraw start
            setStars(utils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    }
    return { stars, availableNums, candidateNums, secondsLeft, setGameState };
}

const Game = (props) => {
    const {
        stars,
        availableNums,
        candidateNums,
        secondsLeft,
        setGameState
    } = useGameState();

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

    const resetGame = () => {
        props.startNewGame();
        // setStars(utils.random(1, 9));
        // setAvailableNums(utils.range(1, 9));
        // setCandidateNums([]);
        // setSecondsLeft(10);
    }

    const numberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate'
        }
        return 'available';
    };

    const onNumberClick = (number, currentStatus) => {
        if (gameStatus !== 'active' || currentStatus === 'used') {
            return;
        }
        const newCandidateNums = currentStatus === 'available'
            ? candidateNums.concat(number)
            : candidateNums.filter(cn => cn !== number);

        setGameState(newCandidateNums);
    }

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {gameStatus !== 'active' ? (
                            <PlayAgain onClick={resetGame} gameMessage={gameStatus}/>
                        )
                        :
                        <StarDisplay count={stars}></StarDisplay>
                    }
                </div>
                <div className="right">
                    {utils.range(1, 9).map(number =>
                        <PlayNumber
                            key={number}
                            number={number}
                            status={numberStatus(number)}
                            onClick={onNumberClick}
                        ></PlayNumber>
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};

export default Game;
