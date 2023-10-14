const TournamentOver = ({ setIsGenerated, setTournamentOver}) => {
  const resetTournament = () => {
    setIsGenerated(false);
    setTournamentOver(false);
    localStorage.removeItem('SE');
    localStorage.removeItem('originalNamesList');
    localStorage.removeItem('allGamesSingle');
    localStorage.removeItem('generatedNamesList');
    localStorage.removeItem('round');
  };
  return (
    <div className='tournamentOver'>
      <h1>Tournament Over</h1>
      <button className='btnResetSingleElim' onClick={resetTournament}>Reset</button>
    </div>
  );
};

export default TournamentOver;