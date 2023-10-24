import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';


const TournamentOver = ({ setIsGenerated, setTournamentOver}) => {
  const [allGames, setAllGames] = useState(null);
  const [winner, setWinner] = useState('');
  const [tournamentType, setTournametType] = useState('')
  const location = useLocation();


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

  useEffect(() => {
    const gamesFromLocal = JSON.parse(localStorage.getItem('SE'));
    if (gamesFromLocal !== null) {
      const gamesArr = Object.values(gamesFromLocal);
      setAllGames(gamesArr);
      const winnerFromLocal = Object.values(gamesFromLocal).reverse()[0][0].winner;
      setWinner(winnerFromLocal);
    };
    if (location.pathname === '/roundRobin') setTournametType('roundRobin');
    if (location.pathname === '/single') setTournametType('single');
    if (location.pathname === '/double') setTournametType('double');
  }, []);

  return (
    <div className='tournamentOver'>
      <FontAwesomeIcon className="icon big" icon={faTrophy} /> 
      <h1>Tournament Over</h1>
      {tournamentType !== 'roundRobin' &&<h3>Congratulations to the winner <span>{winner}</span></h3>}
      <div>
        <button className='btnResetSingleElim' onClick={resetTournament}>Reset</button>
        <button className='btnResetSingleElim' onClick={playAgain}>Play Again</button>
      </div>
      <div className="generatedTable">
        {allGames !== null && allGames.map((game, index) => {
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