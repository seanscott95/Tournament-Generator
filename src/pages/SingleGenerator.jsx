import { useState } from 'react';

import TeamInputGroup from '../components/TeamInputGroup';
import TournamentKeeper from '../components/TournamentKeeper';
import Instructions from '../components/Instructions';

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
        <p className="eliminationTypeSummary">
          In Single Elimination if you lose one game you're out
        </p>
      </section>
      {!tournamentOver && 
        <Instructions 
          isGenerated={isGenerated}
          eliminationType='Single'
        />
      }
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
            eliminationType='Single'
          />
        )}
      </section>
    </>
  );
};

export default SingleGenerator;
