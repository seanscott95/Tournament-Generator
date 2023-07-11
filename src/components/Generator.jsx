import { useState } from 'react';
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

    const [message, setMessage] = useState(false);

    const handleGenerateButton = () => {
        if (teamNameInput !== '') {
            setMessage(true);
            setTimeout(() => {
                setMessage(false);
            }, 3000);
            return;
        }
        if (teamNames.length <= 2) {
            setMessage(true);
            setTimeout(() => {
                setMessage(false);
            }, 3000);
            return;
        }
        handleGenerateClick();
    };

    return (
        <div className='generatorContainer'>
            <section className='heading'>
                <h1>Welcome to the Round Robin Generator!!</h1>
                <p>To get started enter your team names in the input below:</p>
            </section>
            <section>
                <div className="inputGroup leftBorder">
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
                <ul>
                    {teamNames && teamNames.map((team) => {
                        return <li className="teamAdded leftBorder">
                            <div className='teamNameText'>
                                <p>{team}</p>
                            </div>
                            <div>
                                <p onClick={(e) => removeTeamName(e)} value={team}>X</p>
                            </div>
                        </li>
                    })}
                </ul>
                <div className='errorMessage'>
                    {message && teamNames.length <= 2 &&
                        <p>Please add at least three teams</p>}
                    {message && teamNameInput !== '' &&
                        <p>Please make sure input is empty</p>}
                </div>
            </section>
            <section>
                <div className="inputGroup">
                    <button className='generateBtn' onClick={handleGenerateButton}>GENERATE</button>
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