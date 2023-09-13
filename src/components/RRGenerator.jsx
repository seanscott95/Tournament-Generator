import { useState } from 'react';
import useGenerator from '../hooks/useRRGenerator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faUserGroup } from '@fortawesome/free-solid-svg-icons';

const Generator = () => {
  const {
    addTeamName,
    teamNameInput,
    setTeamNameInput,
    teamNames,
    setTeamNames,
    generateRoundRobin,
    allGames,
    removeTeamName,
    setGeneratedNamesList,
    generatedNamesList,
    listWithByesRemoved,
  } = useGenerator();

  const [message, setMessage] = useState(false);

  const handleGenerateButton = () => {
    if (teamNameInput !== '') {
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 3000);
      return;
    }
    if (teamNames.filter((item) => item !== null).length <= 2) {
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 3000);
      return;
    }

    setGeneratedNamesList([...teamNames]);

    if (teamNames % 2 !== 0) {
      teamNames.splice(teamNames.length / 2, 0, 'Bye');
    }

    generateRoundRobin();
    setTeamNames([null, null, null]);
  };

  const [isChecked, setIsChecked] = useState(true);

  const handleShowByes = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="generatorContainer">
      <section className="heading">
        <h1>Welcome to the Round Robin Generator!!</h1>
        <p>To get started enter your team names in the input below:</p>
      </section>
      <section className="inputGroupContainer">
        <div className="leftBorder">
          <label htmlFor="teams"><FontAwesomeIcon className="icon" icon={faUserGroup} />TEAM:</label>
          <input
            type="text"
            id="teams"
            name="teams"
            value={teamNameInput}
            onChange={(e) => setTeamNameInput(e.target.value)}
          />
          <button onClick={addTeamName}>ADD</button>
        </div>
      </section>
      <section>
        <ul>
          {teamNames &&
            teamNames.map((team, index) => {
              return (
                <li className="teamAdded leftBorder" key={team + index}>
                  <div className="teamNameText">
                    <p>{team}</p>
                  </div>
                  {team === null ? (
                    <div>
                      <p>X</p>
                    </div>
                  ) : (
                    <div>
                      <p onClick={(e) => removeTeamName(e)} value={team}>
                        X
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
        </ul>
      </section>
      <section className='errorMessageSection'>
        <div className="errorMessage">
          {message && teamNameInput !== '' && (
            <p>Please make sure input is empty</p>
          )}
          {message && teamNames.filter((item) => item !== null).length <= 2 && (
            <p>Please add at least three teams</p>
          )}
        </div>
        <div className="generateBtnContainer">
          <button onClick={handleGenerateButton}>GENERATE</button>
        </div>
      </section>
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
                {generatedNamesList.length} Teams
              </li>
            </ul>
            <ul>
              {generatedNamesList &&
                generatedNamesList.map((team, index) => {
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
        {allGames.length >= 1 && (
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
        {allGames &&
          (isChecked ? allGames : listWithByesRemoved).map((game, index) => {
            return (
              <div className="generatedTableItem ">
                <h1>ROUND {index + 1}</h1>
                <div className="gameContainer leftBorder">
                  {game.map((g, index) => {
                    return (
                      <div className="gameItemCard">
                        <h3>Game {index + 1}</h3>
                        <div>
                          <p>{g[0]}</p>
                          <h1>VS</h1>
                          <p>{g[1]}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
};

export default Generator;
