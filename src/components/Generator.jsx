import useGenerator from '../hooks/useGenerator';

const Generator = () => {
    const { addTeamName, teamNameInput, setTeamNameInput, teamNames } = useGenerator();

    return (
        <>
            <section>
                <h1>Welcome to the Round Robin Generator!!</h1>
                <p>To get started enter your team names in the input below:</p>
            </section>
            <section>
                <div className="inputGroup">
                    <label htmlFor="teams">Teams</label>
                    <input type="text" id="teams" name="teams" value={teamNameInput} onChange={(e) => setTeamNameInput(e.target.value)} />
                    <button onClick={addTeamName}>Add</button>
                </div>
            </section>
            <section>
                {teamNames && teamNames.map((team) => {
                    return <div className="teamAdded">
                        <p>{team}</p>
                        <p>X</p>
                    </div>
                })}
            </section>
            <section>
                <div className="inputGroup">
                    <p>Click the "GENERATE" to display your randomised round robin table below</p>
                    <button onClick={() => {}}>GENERATE</button>
                </div>
            </section>
        </>
    );
};

export default Generator;