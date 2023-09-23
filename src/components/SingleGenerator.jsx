import { useState } from 'react';

import TeamInputGroup from './TeamInputGroup';
import TournamentKeeper from './TournamentKeeper';

const SingleGenerator = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [tournamentOver, setTournamentOver] = useState(false);

  return (
    <>
      <section className="heading">
        <h1>Welcome to the Single Elimination Generator!!</h1>
        <ol>
          <li>To get started enter your team names in the input below</li>
          <li>Once finished click the Generate button to start tournament</li>
          <li>Click on the team that won their game to turn there name green</li>
          <li>Once all the games have a selected winner click on the next round button</li>
          <li>Repeat the process until you're finished and enjoy!</li>
        </ol>
      </section>
      <section>
        {isGenerated && !tournamentOver
          ? <TournamentKeeper setTournamentOver={setTournamentOver} />
          : <TeamInputGroup setIsGenerated={setIsGenerated} />
        }
      </section>
      <section>
        {tournamentOver && <>Game Over</>}
      </section>
    </>
  );
};

export default SingleGenerator;