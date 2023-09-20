import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import useGenerator from '../hooks/useRRGenerator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

const TeamInputGroup = ({ setIsGenerated }) => {

  const location = useLocation();

  const {
    addTeamName,
    teamNameInput,
    setTeamNameInput,
    setTeamNames,
    teamNames,
    generateRoundRobin,
    removeTeamName,
    setGeneratedNamesList,
    generateSingleElimination,
    generateDoubleElimination,
  } = useGenerator();

  // If user has previous data in local storage, data will render for
  // the list of team names that can be inputted
  const gNL = JSON.parse(localStorage.getItem('generatedNamesList'));
  useEffect(() => {
    if (gNL !== null) {
      let list = gNL.filter(el => el !== 'Bye');
      setTeamNames(list);
    };
  },[]);

  const [message, setMessage] = useState(false);

  const handleGenerateButton = () => {
    if (teamNameInput !== '') {
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 3000);
      return;
    };
    if (teamNames.filter((item) => item !== null).length <= 2) {
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 3000);
      return;
    };

    setGeneratedNamesList([...teamNames]);

    if (teamNames.length % 2 !== 0) {
      if (!teamNames.includes('Bye')) {
        if (location.pathname === '/roundRobin') {
          teamNames.splice(teamNames.length / 2, 0, 'Bye');
        }
      };
    };

    if (location.pathname === '/roundRobin') generateRoundRobin();
    if (location.pathname === '/single') generateSingleElimination();
    if (location.pathname === '/double') generateDoubleElimination();

    setTeamNames([null, null, null]);
    setIsGenerated(true);
  };

  return (
    <>
      <section className="inputGroupContainer">
        <div className="inputGroup">
          <label htmlFor="teams">
            <FontAwesomeIcon className="icon" icon={faUserGroup} />
            TEAM:
          </label>
          <input
            type="text"
            id="teams"
            name="teams"
            value={teamNameInput}
            onChange={(e) => setTeamNameInput(e.target.value)}
          />
        </div>
        <button onClick={addTeamName}>ADD</button>
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
      <section className="errorMessageSection">
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
    </>
  );
};

export default TeamInputGroup;
