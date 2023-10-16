import { useEffect, useState } from 'react';

const TournamentOver = ({ setIsGenerated, setTournamentOver}) => {

  const [allGames, setAllGames] = useState('');
  const [winner, setWinner] = useState('');

  const resetTournament = () => {
    setIsGenerated(false);
    setTournamentOver(false);
    localStorage.removeItem('SE');
    localStorage.removeItem('originalNamesList');
    localStorage.removeItem('allGamesSingle');
    localStorage.removeItem('generatedNamesList');
    localStorage.removeItem('round');
  };

  const playAgain = () => {
    localStorage.removeItem('SE');
    localStorage.removeItem('allGamesSingle');
    localStorage.removeItem('generatedNamesList');
    localStorage.removeItem('round');
    
    setTournamentOver(false);
    setIsGenerated(false);
  };

  useEffect(() => {
    const gamesFromLocal = JSON.parse(localStorage.getItem('SE'));
    if (gamesFromLocal !== null) {
      setAllGames(gamesFromLocal);
      const winnerFromLocal = Object.values(gamesFromLocal).reverse()[0][0].winner;
      setWinner(winnerFromLocal);
    };
  }, []);
  
  return (
    <div className='tournamentOver'>
      <h1>Tournament Over</h1>
      <p>Winner is {winner}</p>
      <button className='btnResetSingleElim' onClick={resetTournament}>Reset</button>
      <button className='btnResetSingleElim' onClick={playAgain}>Play Again</button>
    </div>
  );
};

export default TournamentOver;