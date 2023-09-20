import { useState, useEffect } from 'react';

const TournamentKeeper = () => {
  const allGames = JSON.parse(localStorage.getItem('allGamesSingle'));
  console.log('allGS', allGames);

  let allGamesObj = allGames.map((game, index) => {
    return {
      game: index + 1,
      player1: game[0],
      player2: game[1],
      winner: '',
      completed: false,
    };
  });
  console.log('agooooo', allGamesObj);

  const [isChecked, setIsChecked] = useState(true);
  const handleShowByes = () => {
    setIsChecked((prev) => !prev);
  };

  const allGamesByesRemoved = allGames
    .map((g) => g.filter((el) => el !== 'Bye'))
    .filter((e) => e.length !== 1);
  console.log('aGBR', allGamesByesRemoved);

  const allGamesByesRemovesObj = allGamesByesRemoved.map((game, index) => {
    return {
      game: index + 1,
      player1: game[0],
      player2: game[1],
      winner: '',
      completed: false,
    };
  });

  const handleClickForWinner = (e, winner, game) => {
    console.log(winner, game);

    if (allGamesObj[game - 1].winner !== '') return;
    
    allGamesObj[game - 1].winner = winner;
    allGamesObj[game - 1].completed = true;
    e.target.classList.add('winner');
    console.log('a', allGamesObj)
  };

  const refreshCardWinner = (e) => {
    const game = e.target.value;
    allGamesObj[game - 1].winner = '';
    allGamesObj[game - 1].completed = false;

    const teamNameEl = document.querySelectorAll(`.game${game}`);
    teamNameEl.forEach((game) => game.classList.remove('winner'));
  };

  useEffect(() => {
    console.log('useEFfect allgo', allGamesObj);
  }, [allGamesObj]);

  return (
    <>
      <section className="generatedTable">
        {allGamesObj.length >= 1 && (
          <div className="toggleShowByesInputGrp">
            <input
              type="checkbox"
              id="showByes"
              name="showByes"
              checked={isChecked}
              onChange={handleShowByes}
            />
            <label htmlFor="showByes"> Display matches with Byes</label>
          </div>
        )}
        {allGamesObj &&
          (isChecked ? allGamesObj : allGamesByesRemovesObj).map((game, index) => {
            const gameNumber = game.game;
            return (
              <div className="generatedTableItem" key={index}>
                <div className="gameContainer leftBorder">
                  <div className="gameItemCard">
                    <div className='cardHeading'>
                      <h3>Game {gameNumber}</h3>
                      <button onClick={refreshCardWinner} value={gameNumber}>Refresh</button>
                    </div>
                    <div className='cardBody'>
                      <p
                        onClick={(e) => handleClickForWinner(e, game.player1, gameNumber)}
                        className={`game${gameNumber}`}
                      >
                        {game.player1}
                      </p>
                      <h1>VS</h1>
                      <p
                        onClick={(e) => handleClickForWinner(e, game.player2, gameNumber)}
                        className={`game${gameNumber}`}
                      >
                        {game.player2}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <button>NEXT ROUND</button>
          <br />
      </section>
    </>
  );
};

export default TournamentKeeper;
