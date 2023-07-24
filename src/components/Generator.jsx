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
        if (teamNames.filter(item => item !== null).length <= 2) {
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
                    {teamNames && teamNames.map((team, index) => {
                        return <li className="teamAdded leftBorder" key={team + index}>
                            <div className='teamNameText'>
                                <p>{team}</p>
                            </div>
                            {team === null ? <div>
                                <p>X</p>
                            </div> :
                            <div>
                                <p onClick={(e) => removeTeamName(e)} value={team}>X</p>
                            </div>
                            }
                        </li>
                    })}
                </ul>
            </section>
            <section>
                <div className='errorMessage'>
                    {message && teamNameInput !== '' &&
                        <p>Please make sure input is empty</p>}
                    {message && teamNames.filter(item => item !== null).length <= 2 &&
                        <p>Please add at least three teams</p>}
                </div>
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