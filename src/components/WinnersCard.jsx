const WinnersCard = ({ allGames, eliminationType }) => {
  const teamNamesList = JSON.parse(localStorage.getItem('generatedNamesList'));

  // Returns a list of all the winners
  const winnersArr = allGames
    .map((game) => {
      return Object.values(game).map((g) => {
        return g.winner;
      });
    })
    .flat();

  // Creates object of winners with their amount of wins
  const winnersReduced = winnersArr.reduce((acc, val) => {
    return {
      ...acc,
      [val]: (acc[val] || 0) + 1,
    };
  }, {});

  let sortable = [];
  // Adds winners with their amount of wins to the sortable array
  for (const winners in winnersReduced) {
    sortable.push([winners, winnersReduced[winners]]);
  }

  // Adds any teams with zero wins to the sortable array
  for (const team of teamNamesList) {
    if (!Object.keys(winnersReduced).includes(team)) {
      sortable.push([team, 0]);
    }
  }

  // Sorts the array depending on teams win total
  sortable.sort((a, b) => {
    return b[1] - a[1];
  });

  // Creates the position for each team in element zero according to their index
  const teamSortedPositions = sortable.map((game, index) => {
    return [index + 1, ...game];
  });

  // Single and Double Elimination
  // Returns the last two games so the top three winners can be displayed
  const lastTwogames = allGames.slice(1).slice(-2);
  const winnerAndRunnersUp = lastTwogames.map((game) => {
    let pos = [];
    pos.push([game[0].winner]);
    game[0].winner === game[0].player1
      ? pos.push([game[0].player2])
      : pos.push([game[0].player1]);
    return pos;
  });

  // Returns all the winners in round robin if there are more than one
  const winners = teamSortedPositions
    .map((team) => {
      if (team[2] === teamSortedPositions[0][2]) {
        return team[1];
      }
    })
    .filter((w) => w !== undefined);

  console.log('w', winnerAndRunnersUp);
  console.log('wd', winnerAndRunnersUp[1]);
  console.log('e', eliminationType)

  return (
    <>
      {eliminationType !== 'roundRobin' && 
          <>
            <div className="winnerRunnerUpInfo">
              {eliminationType === 'Single' && (
                <>
                  <h3>
                    Congratulations to the winner
                    <span> {winnerAndRunnersUp[0][0]}</span>
                  </h3>
                  <h4>
                    Second place is
                    <span> {winnerAndRunnersUp[0][1]}</span>
                  </h4>
                </>
              )}
              {eliminationType === 'Double' && (
                <>
                  <h3>
                    Congratulations to the winner
                    <span> {winnerAndRunnersUp[1][0]}</span>
                  </h3>
                  <h4>
                    Second place is
                    <span> {winnerAndRunnersUp[1][1]}</span>
                  </h4>
                  <h4>
                    Third place is
                    <span> {winnerAndRunnersUp[0][1]}</span>
                  </h4>
                </>
              )}
            </div>
            <div className='teamsWinsList'>
              <ul>
                {teamSortedPositions.map((team, index) => {
                  return (
                    <li
                      key={index}
                    >{`${team[0]})`} <span>{team[1]}</span> {'with'} <span>{team[2]}</span> {'wins'}</li>
                  );
                })}
              </ul>
            </div>
          </>
        }
      {eliminationType === 'roundRobin' && (
        <>
          <div className="winnerRunnerUpInfo">
            {winners.length === 1 && (
              <h3>
                Congratulations to the winner
                <span> {winners}</span>
              </h3>
            )}
            {winners.length > 1 && (
              <h3>
                Congratulations to the winners
                {winners.map((winner, index) => {
                  if (index + 1 === winners.length) {
                    return ` ${winner}.`;
                  }
                  return ` ${winner},`;
                })}
              </h3>
            )}
          </div>
          {teamSortedPositions.map((team, index) => {
            return (
              <p key={index}>{`${team[0]}) ${team[1]} with ${team[2]} wins`}</p>
            );
          })}
        </>
      )}
    </>
  );
};

export default WinnersCard;
