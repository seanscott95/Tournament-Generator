import { useState } from 'react';

import TeamInputGroup from '../components/TeamInputGroup';
import TournamentKeeper from '../components/TournamentKeeper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import TournamentOver from '../components/TournamentOver';

const SingleGenerator = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [tournamentOver, setTournamentOver] = useState(false);
  const [minTeamLimit, setMinTeamLimit] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <section className="heading">
        <div className="pageHeader">
          {!tournamentOver && (
            <>
              <h2>Single Elimination Generator</h2>
              <FontAwesomeIcon
                onClick={() => setShowSettings((prev) => !prev)}
                className="icon"
                icon={faGear}
              />
            </>
          )}
        </div>
        <div className="instructions">
          {isGenerated
            ? !tournamentOver && (
                <ol>
                  <li>
                    Click on the team that won their game to turn their name
                    green
                  </li>
                  <li>
                    Once all the games have a selected winner click on the Next
                    Round button
                  </li>
                  <li>
                    Repeat the process until the tournament is over and enjoy!
                  </li>
                </ol>
              )
            : !tournamentOver && (
                <ol>
                  <li>
                    In Single Elimination if you lose one game you're out
                  </li>
                  <li>
                    To get started enter the team names in the input below
                  </li>
                  <li>
                    Total teams should be either 4, 8, 16, 32, 64 or 128 teams
                    long
                  <p className="instructionsNote">
                    NOTE - YOU CAN REMOVE THE TEAM LIMIT OPTION IN THE SETTINGS
                  </p>
                  </li>
                  <li>
                    Once you have entered all the teams click Generate to start tournament
                  </li>
                  <li>
                  Read the instructions on the next page on how to select winners for each game
                  </li>
                </ol>
              )}
        </div>
      </section>
      <section>
        {showSettings && !isGenerated && (
          <div className='minTeamInputGrp'>
            <div>
              <input
                type="checkbox"
                id="minTeamInput"
                name="minTeamInput"
                checked={minTeamLimit}
                onChange={() => setMinTeamLimit((prev) => !prev)}
              />
              <label htmlFor="minTeamInput">Team Limit</label>
            </div>
            <p className="warningTeamLimit">
              Turning off team limit can result in an uneven amount of teams
              suitable for Single Elimination. In rounds with an odd amount of
              teams, a team is randomly allocated a bye and therefore the win.
            </p>
          </div>
        )}
      </section>
      <section>
        {isGenerated && !tournamentOver && (
          <TournamentKeeper
            setTournamentOver={setTournamentOver}
            minTeamLimit={minTeamLimit}
            eliminationType='Single'
          />
        )}
      </section>
      <section>
        {!isGenerated && !tournamentOver && (
          <TeamInputGroup
            setIsGenerated={setIsGenerated}
            minTeamLimit={minTeamLimit}
          />
        )}
      </section>
      <section>
        {tournamentOver && (
          <TournamentOver
            setIsGenerated={setIsGenerated}
            setTournamentOver={setTournamentOver}
          />
        )}
      </section>
    </>
  );
};

export default SingleGenerator;
