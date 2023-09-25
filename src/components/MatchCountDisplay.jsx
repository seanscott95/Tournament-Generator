import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

const MatchCountDisplay = ({ allGamesObj }) => {
  console.log('allGO', allGamesObj);
  let length = allGamesObj.length;
  const [count, setCount] = useState(0);

  useEffect(() => {
    let c = 0;
    allGamesObj.forEach((game) => {
      if (game.completed === true) {
        console.log('hit');
        console.log('c1', c);
        c++;
      }
    });
    console.log('c2', c);
    setCount(c);
    console.log('count', count);
  }, [allGamesObj]);
  return (
    <div className="matchFinishedIcon">
      {allGamesObj &&
        allGamesObj.map((game) => {
          return (
            <>
              {game.completed ? (
                <p className="completed">
                  <FontAwesomeIcon className="icon" icon={faUserGroup} />
                </p>
              ) : (
                <p className="notCompleted">
                  <FontAwesomeIcon className="icon" icon={faUserGroup} />
                </p>
              )}
            </>
          );
        })}
      {allGamesObj && <p>{`${count}/${length}`}</p>}
    </div>
  );
};

export default MatchCountDisplay;
