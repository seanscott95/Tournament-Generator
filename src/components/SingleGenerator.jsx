import { useState } from 'react';

import TeamInputGroup from './TeamInputGroup';
import TournamentKeeper from './TournamentKeeper';

const SingleGenerator = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [tournamentOver, setTournamentOver] = useState(false);
  const [minTeamLimit, setMinTeamLimit] = useState(true);

  return (
    <>
      <section className="heading">
        <h1>Welcome to the Single Elimination Generator!!</h1>
        <ol>
          <li>To get started enter your team names in the input below</li>
          <li>
            Total teams should be either 4, 8, 16, 32, 64 or 128 teams long
          </li>
          <li>Once finished click the Generate button to start tournament</li>
          <li>
            Click on the team that won their game to turn there name green
          </li>
          <li>
            Once all the games have a selected winner click on the next round
            button
          </li>
          <li>Repeat the process until you're finished and enjoy!</li>
        </ol>
      </section>
      <section className="minTeamInputGrp">
        <div>
          <input
            type="checkbox"
            id="minTeamInput"
            name="minTeamInput"
            checked={minTeamLimit}
            onChange={() => setMinTeamLimit((prev) => !prev)}
          />
          <label htmlFor="minTeamInput">
            {' '}
            Team Limit <span>*</span>
          </label>
        </div>
        <p className="warningTeamLimit">
          * Turning off team limit can result in an uneven amount of teams
          suitable for single elimination. In rounds with an odd amount of
          teams, a team is randomly allocated a bye and therefore the win.
        </p>
      </section>
      <section>
        {isGenerated && !tournamentOver ? (
          <TournamentKeeper setTournamentOver={setTournamentOver} />
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
