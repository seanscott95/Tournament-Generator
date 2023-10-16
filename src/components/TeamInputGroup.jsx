import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useGenerator from '../hooks/useRRGenerator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

const TeamInputGroup = ({ setIsGenerated, minTeamLimit }) => {
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

  const [error, setError] = useState(false);
  const [teamMinError, setTeamMinError] = useState(false);
  const runError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  const handleGenerateButton = () => {
    if (!minTeamLimit) {
      if (teamNames.filter((item) => item !== null).length <= 2) {
        runError();
        return;
      };
    };
    if (teamNameInput !== '') {
      runError();
    };

    if (minTeamLimit) {
      const teamMinimum = [4, 8, 16, 32, 64, 128];
      const result = teamMinimum.some((number) => {
        return number === teamNames.length;
      });

      if (!result) {
        setTeamMinError(true);
        setTimeout(() => {
          setTeamMinError(false);
        }, 3000);
        return;
      };
    };

    setGeneratedNamesList([...teamNames]);

    if (teamNames.length % 2 !== 0) {
      if (!teamNames.includes('Bye')) {
        if (location.pathname === '/roundRobin') {
          teamNames.splice(teamNames.length / 2, 0, 'Bye');
        };
      };
    };

    if (location.pathname === '/roundRobin') generateRoundRobin();
    if (location.pathname === '/single') generateSingleElimination();
    if (location.pathname === '/double') generateDoubleElimination();

    setTeamNames([null, null, null]);
    setIsGenerated(true);
  };

  // Allows the user to click enter to add the inputed team name
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTeamName();
    };
  };

  // Adds an event listener on the window specifically for enter key
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
  // Adds the teams names from local storage to the teamNames state
  useEffect(() => {
    if (gNL !== null) {
      let list = gNL.filter((el) => el !== 'Bye');
      setTeamNames(list);
    };
  }, []);

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
            // onChange={(e) => console.log('e', e)}
          />
        </div>
        <button
          onClick={addTeamName}
          
        >ADD</button>
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
          {error && teamNameInput !== '' && (
            <p>Please make sure input is empty</p>
          )}
          {error &&
            !minTeamLimit &&
            teamNames.filter((item) => item !== null).length <= 2 && (
              <p>Please add at least three teams</p>
            )}
          {teamMinError && (
            <p>Please have exactly 4, 8, 16, 32, 64 or 128 teams</p>
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
