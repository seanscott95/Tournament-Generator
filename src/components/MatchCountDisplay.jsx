import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

const MatchCountDisplay = ({ allGamesObj }) => {
  console.log('allGO', allGamesObj);
  let length = allGamesObj.length;
  const [count, setCount] = useState(0);
  const [round, setRound] = useState('');

  useEffect(() => {
    let c = 0;
    allGamesObj.forEach((game) => {
      if (game.completed === true) {
        console.log('hit');
        console.log('c1', c);
        c++;
      }
    });
    console.log('c2', c);
    setCount(c);
    console.log('count', count);
    // Updates the round state with the round value in local storage
    const roundFromLocal = JSON.parse(localStorage.getItem('round')) || '';
    if (roundFromLocal !== null) setRound(roundFromLocal);
  }, [allGamesObj]);
  
  return (
    <div className="matchCountInformation">
      <div className="roundTitle">
        <h1>Round {round}</h1>
      </div>
      <div className="matchFinishedIcon">
        {allGamesObj &&
          allGamesObj.map((game, index) => {
            return (
              <div key={game + index}>
                {game.completed ? (
                  <p className="completed">
                    <FontAwesomeIcon className="icon" icon={faUserGroup} />
                  </p>
                ) : (
                  <p className="notCompleted">
                    <FontAwesomeIcon className="icon" icon={faUserGroup} />
                  </p>
                )}
              </div>
            );
          })}
        {allGamesObj && <p>{`${count}/${length}`}</p>}
      </div>
    </div>
  );
};

export default MatchCountDisplay;
