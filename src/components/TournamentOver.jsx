import WinnersCard from './WinnersCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

const TournamentOver = ({ setIsGenerated, setTournamentOver, eliminationType}) => {
  const gamesFromLocal = JSON.parse(localStorage.getItem('SE'));
  const gamesArr = Object.values(gamesFromLocal);
  const winnerFromLocal = Object.values(gamesFromLocal).reverse()[0][0].winner;

  const resetTournament = () => {
    localStorage.removeItem('SE');
    localStorage.removeItem('allGamesSingle');
    localStorage.removeItem('generatedNamesList');
    localStorage.removeItem('round');
    
    setTournamentOver(false);
    setIsGenerated(false);
  };

  const playAgain = () => {
    localStorage.removeItem('SE');
    localStorage.removeItem('allGamesSingle');
    localStorage.removeItem('round');
    
    setTournamentOver(false);
    setIsGenerated(false);
  };

  return (
    <div className='tournamentOver'>
      <FontAwesomeIcon className="icon big" icon={faTrophy} /> 
      <h1>Tournament Over</h1>
      <WinnersCard
        allGames={gamesArr}
        eliminationType={eliminationType}
      />
      <div>
        <button className='btnResetSingleElim' onClick={resetTournament}>Reset</button>
        <button className='btnResetSingleElim' onClick={playAgain}>Play Again</button>
      </div>
      <div className="generatedTable">
        {gamesArr !== null && gamesArr.map((game, index) => {
          return (
            <div className="generatedTableItem" key={index}>
              <h1>ROUND {index + 1}</h1>
              <div className="gameContainer leftBorder">
                {Object.values(game).map((g, i) => {
                  return (
                    <div className="gameItemCard" key={i}>
                      <div className='cardHeading'>
                        <h3>Game {g.game}</h3>
                      </div>
                      <div className='cardBody'>
                        <p
                          className={`${g.winner === g.player1 ? 'winner' : ''}`}
                        >{g.player1}</p>
                        <h1>VS</h1>
                        <p
                          className={`${g.winner === g.player2 ? 'winner' : ''}`}
                        >{g.player2}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TournamentOver;