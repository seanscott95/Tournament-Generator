import { useState } from "react";



const useGenerator = () => {
    const [teamNameInput, setTeamNameInput] = useState('');
    const [teamNames, setTeamNames] = useState([null, null, null]);
    const [allGames, setAllGames] = useState([]);
    const [generatedNamesList, setGeneratedNamesList] = useState([]);

    const addTeamName = () => {
        if (teamNameInput.length === 0) {
            return;
        };

        const hasNull = teamNames[teamNames.length - 1] === null;
        if (hasNull) {
            let count = teamNames.filter(item => item !== null).length;

            if (count < 3) {
                let diff = 3 - count;
                
                if (diff === 3) {
                    setTeamNames([teamNameInput, null, null]);
                };
                if (diff === 2) {
                    setTeamNames((prev) => [...prev.filter((item) => item !== null), teamNameInput, null]);
                };
                if (diff === 1) {
                    setTeamNames((prev) => [...prev.filter((item) => item !== null), teamNameInput]);
                };
                setTeamNameInput('');
                return;
            };
        };

        setTeamNames((prev) => [...prev, teamNameInput]);
        setTeamNameInput('');
    };

    const removeTeamName = (e) => {
        const teamToRemove = e.target.getAttribute('value');

        const newTeamNames = teamNames.filter(el => el !== teamToRemove);
        setTeamNames(newTeamNames);
    };

    // Generates a round robin tournament array
    const generateRoundRobin = () => {
        let teamArr = teamNames;
        const length = teamArr.length;

        let rounds = 1;
        let allMatches = [];

        while (rounds <= length - 1) {
            let gamesObj = [];

            let halfOfTeamArr = teamArr.slice(0, length / 2);
            halfOfTeamArr.forEach((team, index) => {
                gamesObj.push([team, teamArr[length - 1 - index]]);
            });

            teamArr.splice(1, 0, teamArr[length - 1]);
            teamArr.pop();

            rounds++
            allMatches.push(gamesObj);
        };
        
        setAllGames(allMatches);
    };

    return {
        addTeamName,
        teamNameInput,
        setTeamNameInput,
        setTeamNames,
        teamNames,
        generateRoundRobin,
        allGames,
        removeTeamName,
        setGeneratedNamesList,
        generatedNamesList
    };
};

export default useGenerator;