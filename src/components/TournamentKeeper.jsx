import { useState, useEffect } from 'react';
import useRRGenerator from '../hooks/useRRGenerator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrophy,
  faUserGroup,
  faArrowRotateRight,
} from '@fortawesome/free-solid-svg-icons';

const TournamentKeeper = () => {
  const { generateSingleElimination, setTeamNames } = useRRGenerator();

  let round = 1;
  // Retrieves all the games from local storage
  // const allGames = JSON.parse(localStorage.getItem('allGamesSingle'));
  let allGames = JSON.parse(localStorage.getItem('allGamesSingle'));
  // Removes all games with byes in them
  let allGamesNoByes = allGames
    .map((g) => g.filter((el) => el !== 'Bye'))
    .filter((e) => e.length !== 1);

  // Retrieves the list of team names from local storage
  let generatedNamesList = JSON.parse(
    localStorage.getItem('generatedNamesList')
  );
  // Removes the byes from the list
  let namesListNoByes = generatedNamesList.filter((el) => el !== 'Bye');

  // Formats the arr to an object to be used in the jsx
  const arrToObjLayout = (arr) => {
    return arr.map((game, index) => {
      if (game[0] === 'Bye' || game[1] === 'Bye') {
        const winner = game[0] === 'Bye' ? game[1] : game[0];
        return {
          game: index + 1,
          player1: game[0],
          player2: game[1],
          winner: winner,
          completed: true,
        };
      }
      return {
        game: index + 1,
        player1: game[0],
        player2: game[1],
        winner: '',
        completed: false,
      };
    });
  };

  let allGamesObj = arrToObjLayout(allGames);
  let allGamesNoByesObj = arrToObjLayout(allGamesNoByes);

  // Toggles the display matches with byes checkbox
  const [isChecked, setIsChecked] = useState(true);
  const handleShowByes = () => {
    setIsChecked((prev) => !prev);
  };

  // Button event handler that selects the winner on click
  const handleClickForWinner = (e, winner, game) => {
    // If there is already a winner exit function
    if (allGamesObj[game - 1].winner !== '') return;

    // Sets the allGamesObj object for the particular game to
    // completed is true, the winning team
    allGamesObj[game - 1].winner = winner;
    allGamesObj[game - 1].completed = true;
    // Adds the class of winner to the event element
    e.target.classList.add('winner');
  };

  // Refreshes who the winner and completed values of the selected game
  const refreshCardWinner = (game) => {
    allGamesObj[game - 1].winner = '';
    allGamesObj[game - 1].completed = false;

    // Removes the winner class from the team names of the selected game card
    const teamNameEl = document.querySelectorAll(`.game${game}`);
    teamNameEl.forEach((game) => game.classList.remove('winner'));
  };

  const handleNextRound = () => {
    const winners = allGamesObj.filter((e) => e.completed === true);

    // Checks to see if all games are completedallGamesObj.length === winners.length)
    if (allGamesObj.length === winners.length) {
      const winningTeams = winners.map((el) => el.winner);
      // localStorage.setItem(JSON.stringify(`SR${round}`, allGamesObj));
      generateSingleElimination(round, winningTeams);
      round++;
    };
  };

  useEffect(() => {
    console.log('useEFfect allgo', allGamesObj);
    allGames = JSON.parse(localStorage.getItem('allGamesSingle'));
  
    allGamesNoByes = allGames
      .map((g) => g.filter((el) => el !== 'Bye'))
      .filter((e) => e.length !== 1);

    generatedNamesList = JSON.parse(
      localStorage.getItem('generatedNamesList')
    );
    namesListNoByes = generatedNamesList.filter((el) => el !== 'Bye');
    allGamesObj = arrToObjLayout(allGames);
    allGamesNoByesObj = arrToObjLayout(allGamesNoByes);
  }, [allGamesObj, generateSingleElimination]);

  return (
    <section className="generatedTable">
      {generatedNamesList.length !== 0 && (
        <div className="generatedNamesList">
          <ul className="tournamentInfo">
            <li>
              <FontAwesomeIcon className="icon" icon={faTrophy} />
              Round Robin
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faUserGroup} />
              {namesListNoByes.length} Teams
            </li>
          </ul>
          <ul>
            {generatedNamesList &&
              namesListNoByes.map((team, index) => {
                return (
                  <li className="teamAdded leftBorder" key={team + index}>
                    <div className="teamNameText">
                      <p>{team}</p>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
      {allGamesObj.length >= 1 && (
        <div className="toggleShowByesInputGrp">
          <input
            type="checkbox"
            id="showByes"
            name="showByes"
            checked={isChecked}
            onChange={handleShowByes}
          />
          <label htmlFor="showByes"> Display matches with Byes</label>
        </div>
      )}
      {allGamesObj &&
        (isChecked ? allGamesObj : allGamesNoByesObj).map((game, index) => {
          const gameNumber = game.game;
          return (
            <div className="generatedTableItem" key={index}>
              <div className="gameContainer leftBorder">
                <div className="gameItemCard">
                  <div className="cardHeading">
                    <h3>Game {gameNumber}</h3>
                    {game.player1 === 'Bye' || game.player2 === 'Bye' ? (
                      <></>
                    ) : (
                      <FontAwesomeIcon
                        className="icon"
                        icon={faArrowRotateRight}
                        onClick={() => refreshCardWinner(gameNumber)}
                        value={gameNumber}
                      />
                    )}
                  </div>
                  <div className="cardBody">
                    <p
                      onClick={(e) =>
                        handleClickForWinner(e, game.player1, gameNumber)
                      }
                      className={`game${gameNumber} ${
                        game.winner === game.player1 ? 'winner' : ''
                      }`}
                    >
                      {game.player1}
                    </p>
                    <h1>VS</h1>
                    <p
                      onClick={(e) =>
                        handleClickForWinner(e, game.player2, gameNumber)
                      }
                      className={`game${gameNumber} ${
                        game.winner === game.player2 ? 'winner' : ''
                      }`}
                    >
                      {game.player2}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className='nextRoundBtnContainer'>
          <button onClick={handleNextRound}>NEXT ROUND</button>
        </div>
    </section>
  );
};

export default TournamentKeeper;
