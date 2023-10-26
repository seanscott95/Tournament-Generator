import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Instructions = ({ isGenerated, eliminationType }) => {
  const showInstructionsFromLocal =
    localStorage.getItem('showInstructions') || false;
  const [showInstructions, setShowInstructions] = useState(
    showInstructionsFromLocal
  );

  useEffect(() => {
    localStorage.setItem('showInstructions', showInstructions);
    const showInstructionsLocal = JSON.parse(
      localStorage.getItem('showInstructions')
    );
    setShowInstructions(showInstructionsLocal);
  }, [showInstructions, setShowInstructions]);

  return (
    <section className="instructionsContainer">
      <button
        className="instructionsBtn"
        onClick={() => setShowInstructions((prev) => !prev)}
      >
        <FontAwesomeIcon className="icon" icon={faChevronDown} />
        INSTRUCTIONS
        <FontAwesomeIcon className="icon" icon={faChevronDown} />
      </button>
      <div className={showInstructions ? 'instructions' : 'instructions hide'}>
        {eliminationType === 'roundRobin' && !isGenerated && (
          <ol>
            <li>To get started enter the team names in the input below</li>
            <li>
              Once you have entered all the teams click Generate to start the
              tournament
            </li>
            <li>
              Read the instructions on the next page on how to select winners
              for each game
            </li>
          </ol>
        )}
        {eliminationType === 'roundRobin' && isGenerated && (
          <ol>
            <li>
              Click on the teams that won their games to turn their name green
            </li>
            <li>
              Once all the games have a selected winner click on Finish Tournament
            </li>
          </ol>
        )}
        {eliminationType !== 'roundRobin' && isGenerated && (
          <ol>
            <li>
              Click on the team that won their game to turn their name green
            </li>
            <li>
              Once all the games have a selected winner click on the Next Round
              button
            </li>
            <li>Repeat the process until the tournament is over</li>
          </ol>
        )}
        {eliminationType !== 'roundRobin' && !isGenerated && (
          <ol>
            <li>To get started enter the team names in the input below</li>
            <li>
              Total teams should be either 4, 8, 16, 32, 64 or 128 teams long
            </li>
            <li>
              Once you have entered all the teams click Generate to start the
              tournament
            </li>
            <li>
              Read the instructions on the next page on how to select winners
              for each game
            </li>
            <p className="instructionsNote">
              NOTE - YOU CAN REMOVE THE TEAM LIMIT OPTION IN THE SETTINGS
            </p>
          </ol>
        )}
      </div>
    </section>
  );
};

export default Instructions;
