import { useState, useEffect } from 'react';

import MatchCountDisplay from './MatchCountDisplay';
import useRRGenerator from '../hooks/useRRGenerator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrophy,
  faUserGroup,
  faArrowRotateRight,
} from '@fortawesome/free-solid-svg-icons';

const TournamentKeeper = ({ setTournamentOver, minTeamLimit }) => {
  const { generateSingleElimination, allGames: allGamesFromHook } = useRRGenerator();
  
  const [message, setMessage] = useState('');
  const [completedGames, setCompletedGames] = useState([]);
  const [round, setRound] = useState(1);
  // Toggles the display matches with byes checkbox
  const [isChecked, setIsChecked] = useState(true);

  const [allGames, setAllGames] = useState([]);
  const [allGamesNoByes, setAllGamesNoByes] = useState([]);

  const [originalTeams, setOriginalTeams] = useState([]);
  const [originalTeamsNoByes, setOriginalTeamsNoByes] = useState([]);

  const [arrOfAllGamesObjs, setArrOfAllGamesObjs] = useState([]);
  const [arrOfAllGamesObjsNoByes, setArrOfAllGamesObjsNoByes] = useState([]);

  useEffect(() => {
    const tempArrOfAllGamesNoByes = arrOfAllGamesObjs
      .filter((g) => g.player1 !== 'Bye')
      .filter((g) => g.player2 !== 'Bye')
      setArrOfAllGamesObjsNoByes(tempArrOfAllGamesNoByes);

  }, [arrOfAllGamesObjs]);

  // Formats an arr into an object to be used in the jsx
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

  // Toggles the display matches with byes checkbox
  const handleShowByes = () => {
    setIsChecked((prev) => !prev);
  };

  // Button event handler that selects the winner on click
  const handleClickForWinner = (e, winner, game) => {
    let tempAllGames = arrOfAllGamesObjs;
    // let tempAllGames = isChecked ? arrOfAllGamesObjs : arrOfAllGamesObjsNoByes;
    // If there is already a winner exit function
    if (tempAllGames[game - 1].winner !== '') return;
    if (completedGames.includes(game)) return;

    // Sets the tempAllGames object for the particular game to
    // completed is true, the winning team
    tempAllGames[game - 1].winner = winner;
    tempAllGames[game - 1].completed = true;

    // Adds the class of winner to the event element
    e.target.classList.add('winner');
    setCompletedGames((prev) => [...prev, game]);

    setArrOfAllGamesObjs(tempAllGames);
    // isChecked ? setArrOfAllGamesObjs(tempAllGames) : setArrOfAllGamesObjsNoByes(tempAllGames);
  };

  // Refreshes who the winner and completed values of the selected game
  const refreshCardWinner = (game) => {
    let tempAllGames = arrOfAllGamesObjs;
    // let tempAllGames = isChecked ? arrOfAllGamesObjs : arrOfAllGamesObjsNoByes;
    tempAllGames[game - 1].winner = '';
    tempAllGames[game - 1].completed = false;

    // Removes the winner class from the team names of the selected game card
    const teamNameEl = document.querySelectorAll(`.game${game}`);
    teamNameEl.forEach((game) => game.classList.remove('winner'));
    
    setCompletedGames((prev) => prev.filter((g) => g !== game));
    
    setArrOfAllGamesObjs(tempAllGames);
    // isChecked ? setArrOfAllGamesObjs(tempAllGames) : setArrOfAllGamesObjsNoByes(tempAllGames);
  };

  const handleNextRound = () => {
    // Throw error if all games do not have a winner
    const winners = arrOfAllGamesObjs.filter((e) => e.completed === true);
    if (arrOfAllGamesObjs.length !== winners.length) {
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 3000);
      return;
    };

    // Saves and updates each round to local storage
    const prevRounds = JSON.parse(localStorage.getItem('SE')) || {};
    localStorage.setItem(
      `SE`,
      JSON.stringify({
        ...prevRounds,
        [`Round${round}`]: {
          ...arrOfAllGamesObjs,
        },
      })
    );

    // Checks to see if all games are completed
    if (arrOfAllGamesObjs.length === winners.length) {
      const winningTeams = winners.map((el) => el.winner);
      // Ends the tournament
      if (winningTeams.length === 1) {
        setRound(1);
        setTournamentOver(true);
        return;
      };
      // Checks to see if a Bye is needed to be added to the winning team,
      // winning teams length needs to be an even number to work
      // If team limit is off then this will solve the issues associated
      if (winningTeams.length % 2 !== 0) {
        if (!winningTeams.includes('Bye')) {
          winningTeams.push('Bye');
        };
      };

      // Removes all winner classes from current game cards
      const teamNameEl = document.querySelectorAll('.cardBody p');
      teamNameEl.forEach((game) => game.classList.remove('winner'));

      setRound((prev) => prev + 1);
      generateSingleElimination(winningTeams);
      // Resets each displayed game card
      arrOfAllGamesObjs.forEach((g) => {
        refreshCardWinner(g.game);
      });
      arrOfAllGamesObjsNoByes.forEach((g) => {
        refreshCardWinner(g.game);
      });
    };
  };

  useEffect(() => {
    const originalNamesList = JSON.parse(
      localStorage.getItem('originalNamesList')
    );
    if (originalNamesList !== null) {
      const originalNamesListNoByes = originalNamesList.filter(
        (el) => el !== 'Bye'
      );
      setOriginalTeams(originalNamesList);
      setOriginalTeamsNoByes(originalNamesListNoByes);
    };
  }, []);

  useEffect(() => {
    const newAllGames = arrToObjLayout(allGames);
    const newAllGamesNoByes = arrToObjLayout(allGamesNoByes);
    setArrOfAllGamesObjs(newAllGames);
    setArrOfAllGamesObjsNoByes(newAllGamesNoByes);
  }, [allGames, allGamesNoByes, setArrOfAllGamesObjs, setArrOfAllGamesObjsNoByes]);

  useEffect(() => {
    const allGamesFromLocal = JSON.parse(localStorage.getItem('allGamesSingle'));
    if (allGamesFromLocal !== null) {
      setAllGames(allGamesFromLocal);

      const allGamesFromLocalNoByes = allGamesFromLocal
        .map((g) => g.filter((el) => el !== 'Bye'))
        .filter((e) => e.length !== 1);

      setAllGamesNoByes(allGamesFromLocalNoByes);
    };
  }, [allGamesFromHook]);

  return (
    <section className="generatedTable">
      {originalTeams.length !== 0 && (
        <div className="generatedNamesList">
          <div className="tournamentInfo">
            <ul>
              <li>
                <FontAwesomeIcon className="icon" icon={faTrophy} />
                Single Elimination
              </li>
              <li>
                <FontAwesomeIcon className="icon" icon={faUserGroup} />
                {originalTeamsNoByes.length} Teams
              </li>
            </ul>
          </div>
          <ul>
            {originalTeams &&
              originalTeamsNoByes.map((team, index) => {
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
      {!minTeamLimit && arrOfAllGamesObjs.length >= 1 && (
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
      <div className="showFinishedMatchesContainer">
        {arrOfAllGamesObjs && (
          <MatchCountDisplay
            arrOfAllGamesObjsNoByes={arrOfAllGamesObjsNoByes}
            arrOfAllGamesObjs={arrOfAllGamesObjs}
            completedGames={completedGames}
            isChecked={isChecked}
          />
        )}
      </div>
      <div className="tableItemContainer ">
        {arrOfAllGamesObjs.length >= 1 &&
          (isChecked ? arrOfAllGamesObjs : arrOfAllGamesObjsNoByes).map((game, index) => {
            const gameNumber = game.game;
            return (
              <div className="generatedTableItem" key={index}>
                <div className="gameContainer">
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
      </div>
      <section className="errorMessageSection">
        <div className="errorMessage">
          {message && <p>Please make sure all games are completed</p>}
        </div>
        <div className="nextRoundBtnContainer">
          {allGames.length === 1 ? (
            <button onClick={handleNextRound}>FINISH TOURNAMENT</button>
          ) : (
            <button onClick={handleNextRound}>NEXT ROUND</button>
          )}
        </div>
      </section>
    </section>
  );
};

export default TournamentKeeper;
