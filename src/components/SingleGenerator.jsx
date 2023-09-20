import { useState, useEffect } from 'react';

import TeamInputGroup from './TeamInputGroup';
import TournamentKeeper from './TournamentKeeper';

const SingleGenerator = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  console.log('isG', isGenerated)

  useEffect(() => {

  }, [])

  return (
    <>
      <section className="heading">
        <h1>Welcome to the Single Elimination Generator!!</h1>
        <p>To get started enter your team names in the input below:</p>
      </section>
      <section>
        {isGenerated
          ? <TournamentKeeper />
          : <TeamInputGroup setIsGenerated={setIsGenerated} />
        }
      </section>
    </>
  );
};

export default SingleGenerator;