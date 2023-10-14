import { useState } from 'react';

import TeamInputGroup from './TeamInputGroup';
import TournamentKeeper from './TournamentKeeper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const SingleGenerator = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [tournamentOver, setTournamentOver] = useState(false);
  const [minTeamLimit, setMinTeamLimit] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <section className="heading">
        <div className="pageHeader">
          <h2>Welcome to the Single Elimination Generator!!</h2>
          <FontAwesomeIcon
            onClick={() => setShowSettings((prev) => !prev)}
            className="icon"
            icon={faGear}
          />
        </div>
        <div className="instructions">
          {isGenerated ? (
            
            <ol>
            <li>
              Click on the team that won their game to turn there name green
            </li>
            <li>
              Once all the games have a selected winner click on the next
              round button
            </li>
            <li>Repeat the process until the tournament is over and enjoy!</li>
          </ol>
          ) : (
            <ol>
              <li>To get started enter your team names in the input below</li>
              <li>
                Total teams should be either 4, 8, 16, 32, 64 or 128 teams long
              </li>
              <li>
                Once finished click the Generate button to start tournament
              </li>
              <li>
                NOTE - You can remove the team limit option in the settings
              </li>
            </ol>
          )}
        </div>
      </section>
      <section className="minTeamInputGrp">
        {showSettings && (
          <div>
            <input
              type="checkbox"
              id="minTeamInput"
              name="minTeamInput"
              checked={minTeamLimit}
              onChange={() => setMinTeamLimit((prev) => !prev)}
            />
            <label htmlFor="minTeamInput">Team Limit</label>
            <p className="warningTeamLimit">
              Turning off team limit can result in an uneven amount of teams
              suitable for single elimination. In rounds with an odd amount of
              teams, a team is randomly allocated a bye and therefore the win.
            </p>
          </div>
        )}
      </section>
      <section>
        {isGenerated && !tournamentOver ? (
          <TournamentKeeper
            setTournamentOver={setTournamentOver}
            minTeamLimit={minTeamLimit}
          />
        ) : (
          <TeamInputGroup
            setIsGenerated={setIsGenerated}
            minTeamLimit={minTeamLimit}
          />
        )}
      </section>
      <section>{tournamentOver && <>Game Over</>}</section>
    </>
  );
};

export default SingleGenerator;
