import { useState } from "react";

const useGenerator = () => {
    const [teamNameInput, setTeamNameInput] = useState('');
    const [teamNames, setTeamNames] = useState([]);
    console.log("teamNameInput", teamNameInput)
    console.log("teamNames", teamNames)
    const addTeamName = () => {
        setTeamNames((prev) => [...prev, teamNameInput])
        setTeamNameInput('')
    };

    return {
        addTeamName,
        teamNameInput,
        setTeamNameInput,
        teamNames
    };
};

export default useGenerator;