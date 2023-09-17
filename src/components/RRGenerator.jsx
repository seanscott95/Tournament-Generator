import { useState } from 'react';
import TeamInputGroup from './TeamInputGroup';
import DisplayMatches from './DisplayMatches';

const RRGenerator = () => {
  const [isGenerated, setIsGenerated] = useState(false);

  return (
    <div className="generatorContainer">
      <section className="heading">
        <h1>Welcome to the Round Robin Generator!!</h1>
        <p>To get started enter your team names in the input below:</p>
      </section>
      <section>
        { isGenerated
          ? <DisplayMatches />
          : <TeamInputGroup setIsGenerated={setIsGenerated} />
        }
      </section>
    </div>
  );
};

export default RRGenerator;
