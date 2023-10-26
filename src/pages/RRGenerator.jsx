import { useState } from 'react';

import TeamInputGroup from '../components/TeamInputGroup';
import TournamentKeeper from '../components/TournamentKeeper';
import TournamentOver from '../components/TournamentOver';
import Instructions from '../components/Instructions';

const RRGenerator = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [tournamentOver, setTournamentOver] = useState(false);

  return (
    <>
      <section className="heading">
      {!tournamentOver && (
        <>
          <h1>Round Robin Generator</h1>
          <p className="eliminationTypeSummary">
            In a Round Robin tournament everyone plays each other once
          </p>
        </>
      )}
      </section>
      {!tournamentOver && 
        <Instructions 
          isGenerated={isGenerated}
          eliminationType='roundRobin'
        />
      }
      <section>
        {isGenerated && !tournamentOver && (
          <TournamentKeeper
            setTournamentOver={setTournamentOver}
            minTeamLimit={false}
            eliminationType='roundRobin'
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
