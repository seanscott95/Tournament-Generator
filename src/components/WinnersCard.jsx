const WinnersCard = ({ allGames, eliminationType }) => {
  const teamNamesList = JSON.parse(localStorage.getItem('generatedNamesList'));

  // Returns the winner, works for all tournaments
  const winner = Object.values(allGames).reverse()[0][0].winner;

  // Returns a list of all the winners
  const winnersArr = allGames
    .map((game) => {
      // console.log('game', game);
      return Object.values(game).map((g) => {
        return g.winner;
      });
    })
    .flat();

  // Creates object of winners with their amount of wins
  const winnersReduced = winnersArr.reduce((accumulator, value) => {
    return {
      ...accumulator,
      [value]: (accumulator[value] || 0) + 1,
    };
  }, {});

  let sortable = [];
  // Adds winners with their amount of wins to the sortable array
  for (const winners in winnersReduced) {
    sortable.push([winners, winnersReduced[winners]]);
  };

  // Adds any teams with zero wins to the sortable array
  for (const team of teamNamesList) {
    if (!Object.keys(winnersReduced).includes(team)) {
      sortable.push([team, 0]);
    };
  };

  // Sorts the array depending on teams win total
  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });

  // Creates the position for each team in element zero according to their index
  const teamSortedPositions = sortable.map((game, index) => {
    return [index + 1, ...game];
  });

  // Double Elimination
  // Returns the last two games so the top three winners can be displayed
  const lastTwogames = allGames.slice(1).slice(-2);
  const positionsForDouble = lastTwogames.map((game) => {
    let pos = [];
    pos.push([game[0].winner]);
    game[0].winner === game[0].player1
      ? pos.push([game[0].player2])
      : pos.push([game[0].player1]);
    return pos;
  });

  return (
    <>
      {eliminationType === 'Single' && (
        <>
          <h3>
            Congratulations to the winner <span>{winner}</span>
          </h3>
          <ul>
            {teamSortedPositions.map((team, index) => {
              return (
                <li
                  key={index}
                >{`${team[0]}) ${team[1]} with ${team[2]} wins`}</li>
              );
            })}
          </ul>
        </>
      )}
      {eliminationType === 'Double' && (
        <>
          <h3>
            Congratulations to the winner{' '}
            <span>{positionsForDouble[1][0]}</span>
          </h3>
          <h4>
            Runner up was <span>{positionsForDouble[1][1]}</span>
          </h4>
          <h4>
            Third place was <span>{positionsForDouble[0][1]}</span>
          </h4>
          {teamSortedPositions.map((team, index) => {
              return (
                <li
                  key={index}
                >{`${team[0]}) ${team[1]} with ${team[2]} wins`}</li>
              );
            })}
        </>
      )}
    </>
  );
};

export default WinnersCard;
