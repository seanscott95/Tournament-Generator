import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

const MatchCountDisplay = ({
  arrOfAllGamesObjs,
  arrOfAllGamesObjsNoByes,
  completedGames,
}) => {
  const [round, setRound] = useState('');
  const [allGamesArr, setAllGamesArr] = useState([]);
  const [length, setLength] = useState('');

  useEffect(() => {
    const newArr = arrOfAllGamesObjs;
    setAllGamesArr(newArr);
    setLength(newArr.length);

    const roundFromLocal = JSON.parse(localStorage.getItem('round')) || '';
    if (roundFromLocal !== null) setRound(roundFromLocal);
  }, [arrOfAllGamesObjs, completedGames]);

  return (
    <div className="matchCountInformation">
      <div className="roundTitle">
        <h1>Round {round}</h1>
      </div>
      <div className="matchFinishedIcon">
        {allGamesArr &&
          allGamesArr.map((game, index) => {
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
        {arrOfAllGamesObjs && <p>{`${completedGames.length}/${length}`}</p>}
      </div>
    </div>
  );
};

export default MatchCountDisplay;
