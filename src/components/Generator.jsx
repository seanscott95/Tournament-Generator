import useGenerator from '../hooks/useGenerator';

const Generator = () => {
    const {
        addTeamName,
        teamNameInput,
        setTeamNameInput,
        teamNames,
        handleGenerateClick,
        allGames,
        removeTeamName
    } = useGenerator();



    return (
        <div className='generatorContainer'>
            <section className='heading'>
                <h1>Welcome to the Round Robin Generator!!</h1>
                <p>To get started enter your team names in the input below:</p>
            </section>
            <section className='inputContainer'>
                <div className="inputGroup">
                    <label htmlFor="teams">TEAM:</label>
                    <input
                        type="text"
                        id="teams"
                        name="teams"
                        value={teamNameInput}
                        onChange={(e) => setTeamNameInput(e.target.value)} 
                    />
                    <button onClick={addTeamName}>ADD</button>
                </div>
            </section>
            <section>
                {teamNames && teamNames.map((team) => {
                    return <div className="teamAdded">
                        <p>{team}</p>
                        <p onClick={(e) => removeTeamName(e)} value={team}>X</p>
                    </div>
                })}
            </section>
            <section>
                <div className="inputGroup">
                    <button onClick={() => handleGenerateClick()}>GENERATE</button>
                </div>
            </section>
            <section>
                {allGames && allGames.map((game) => {
                    return <h2>{game[0]} VS {game[1]}</h2>
                })}
            </section>
        </div>
    );
};

export default Generator;