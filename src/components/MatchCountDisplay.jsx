import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

const MatchCountDisplay = ({
  arrOfAllGamesObjs,
  arrOfAllGamesObjsNoByes,
  completedGames,
  isChecked,
}) => {
  const [round, setRound] = useState('');
  const [allGamesArr, setAllGamesArr] = useState([]);
  const [allGamesArrNoByes, setAllGamesArrNoByes] = useState([]);
  const [lengthOfAllGames, setLengthOfAllGames] = useState(0);
  const [completedGamesArr, setCompletedGamesArr] = useState([]);

  useEffect(() => {
    let newArr = arrOfAllGamesObjs;
    setAllGamesArr(newArr);
    const newArrNoByes = arrOfAllGamesObjsNoByes;
    setAllGamesArrNoByes(newArrNoByes);

    setCompletedGamesArr(completedGames);
    
    // Changes length of all games finished fraction displayed
    if (!isChecked) {
      newArr = arrOfAllGamesObjsNoByes;
    };
    setLengthOfAllGames(newArr.length);

    // Adds a Bye to the completed games to show correct number of
    // finished games in fraction displayed
    newArr.forEach((g) => {
      if (isChecked) {
        if (g.player1 === 'Bye' || g.player2 === 'Bye') {
          setCompletedGamesArr((prev) => [...prev, 'Bye']);
        };
      };
    });

    // Sets the round state variable depending on the round local storage value
    const roundFromLocal = JSON.parse(localStorage.getItem('round')) || '';
    if (roundFromLocal !== null) setRound(roundFromLocal);
  }, [arrOfAllGamesObjs, arrOfAllGamesObjsNoByes, completedGames, isChecked]);

  return (
    <div className="matchCountInformation">
      <div className="roundTitle">
        <h1>Round {round}</h1>
      </div>
      <div className="matchFinishedIcon">
        {allGamesArr &&
          (isChecked ? allGamesArr : allGamesArrNoByes).map((game, index) => {
            // allGamesArr.map((game, index) => {
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
        {allGamesArr && (
          <p>{`${completedGamesArr.length}/${lengthOfAllGames}`}</p>
        )}
      </div>
    </div>
  );
};

export default MatchCountDisplay;
