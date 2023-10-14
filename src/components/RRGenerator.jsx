import { useState } from 'react';
import TeamInputGroup from './TeamInputGroup';
import DisplayMatches from './DisplayMatches';

const RRGenerator = () => {
  const [isGenerated, setIsGenerated] = useState(false);

  return (
    <>
      <section className="heading">
        <h1>Welcome to the Round Robin Generator!!</h1>
        <div className="instructions">
          <ol>
            <li>To get started enter your team names in the input below</li>
            <li>Once finished click the Generate button to start tournament</li>
          </ol>
        </div>
      </section>
      <section>
        {isGenerated ? (
          <DisplayMatches />
        ) : (
          <TeamInputGroup setIsGenerated={setIsGenerated} />
        )}
      </section>
    </>
  );
};

export default RRGenerator;
