import { useState } from 'react';
import TeamInputGroup from '../components/TeamInputGroup';
import TournamentKeeper from '../components/TournamentKeeper';
import TournamentOver from '../components/TournamentOver';

const RRGenerator = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [tournamentOver, setTournamentOver] = useState(false);

  return (
    <>
      <section className="heading">
      {!tournamentOver && (
        <>
          <h1>Welcome to the Round Robin Generator!!</h1>
          <div className="instructions">
            <ol>
              <li>To get started enter the team names in the input below</li>
              <li>Once finished click the Generate button to start the tournament</li>
            </ol>
          </div>
        </>
      )}
      </section>
      <section>
        {isGenerated && !tournamentOver && (
          <TournamentKeeper
            setTournamentOver={setTournamentOver}
            minTeamLimit={false}
            eliminationType='RR'
          />
        )}
      </section>
      <section>
        {!isGenerated && !tournamentOver && (
          <TeamInputGroup
            setIsGenerated={setIsGenerated}
            minTeamLimit={false}
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

export default RRGenerator;
