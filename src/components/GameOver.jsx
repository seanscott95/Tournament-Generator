const GameOver = ({ setIsGenerated, setTournamentOver}) => {
  const resetGame = () => {
    setIsGenerated(false);
    setTournamentOver(false);
  };
  return (
    <div className='gameOver'>
      <p>Game Over</p>
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default GameOver;