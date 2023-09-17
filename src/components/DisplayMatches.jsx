import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faUserGroup } from '@fortawesome/free-solid-svg-icons';

const DisplayMatches = () => {
  const allGames = JSON.parse(localStorage.getItem('allGames'));
  const generatedNamesList = JSON.parse(localStorage.getItem('generatedNamesList'));

  const allGamesByesRemoved = allGames.map(game => game.map(g => g.filter(el => el !== 'Bye')).filter((e) => e.length !== 1));

  const namesListByesRemoved = generatedNamesList.filter(el => el !== 'Bye');

  const [isChecked, setIsChecked] = useState(true);
  const handleShowByes = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <>
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
                namesListByesRemoved.map((team, index) => {
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
          (isChecked ? allGames : allGamesByesRemoved).map((game, index) => {
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
    </>
  );
};

export default DisplayMatches;