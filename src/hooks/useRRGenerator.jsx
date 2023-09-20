import { useState } from "react";
import capitaliseFirstLetter from '../helper/capitaliseFirstLetter';

const useRRGenerator = () => {
    const [teamNameInput, setTeamNameInput] = useState('');
    const [teamNames, setTeamNames] = useState([null, null, null]);
    const [allGames, setAllGames] = useState([]);
    const [generatedNamesList, setGeneratedNamesList] = useState([]);

    const addTeamName = () => {
        if (teamNameInput.length === 0) {
            return;
        };
        const capTeamNameInput = capitaliseFirstLetter(teamNameInput);

        const hasNull = teamNames[teamNames.length - 1] === null;
        if (hasNull) {
            let count = teamNames.filter(item => item !== null).length;

            if (count < 3) {
                let diff = 3 - count;
                
                if (diff === 3) {
                    setTeamNames([capTeamNameInput, null, null]);
                };
                if (diff === 2) {
                    setTeamNames((prev) => [...prev.filter((item) => item !== null), capTeamNameInput, null]);
                };
                if (diff === 1) {
                    setTeamNames((prev) => [...prev.filter((item) => item !== null), capTeamNameInput]);
                };
                setTeamNameInput('');
                return;
            };
        };

        setTeamNames((prev) => [...prev, capTeamNameInput]);
        setTeamNameInput('');
    };

    const removeTeamName = (e) => {
        const teamToRemove = e.target.getAttribute('value');

        const newTeamNames = teamNames.filter(el => el !== teamToRemove);
        setTeamNames(newTeamNames);
    };

    // Generates a round robin tournament array
    const generateRoundRobin = () => {
        localStorage.removeItem('allGames');
        localStorage.removeItem('generatedNamesList');

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
        localStorage.setItem('allGames', JSON.stringify(allMatches))
        localStorage.setItem('generatedNamesList', JSON.stringify(teamNames))
    };

    const generateSingleElimination = () => {
        localStorage.removeItem('allGamesSingle');
        localStorage.removeItem('generatedNamesList');

        let teamArr = teamNames;
        const length = teamArr.length;

        let rounds = 1;
        let allMatches = [];

        // while (rounds <= length - 1) {
        //     let gamesObj = [];

        //     let halfOfTeamArr = teamArr.slice(0, length / 2);
        //     halfOfTeamArr.forEach((team, index) => {
        //         gamesObj.push([team, teamArr[length - 1 - index]]);
        //     });

        //     teamArr.splice(1, 0, teamArr[length - 1]);
        //     teamArr.pop();

        //     rounds++
        //     allMatches.push(gamesObj);
        // };
        
        // Randomise order
        teamArr.sort(() => Math.random() - 0.5)
        // Match people teams in pairs
        // calculate rounds
        const gamesObj = teamArr.map((team, index) => {
            if (index % 2 === 0) {
                return [team, teamArr[index + 1]]
            };
            return null;
        });
        const filteredGames = gamesObj.filter((game) => game !== null);
        console.log('gamesObj', gamesObj);

        allMatches.push(filteredGames);


        // while (rounds <= length - 1) {
        //     let gamesObj = [];

        //     let halfOfTeamArr = teamArr.slice(0, length / 2);
        //     halfOfTeamArr.forEach((team, index) => {
        //         gamesObj.push([team, teamArr[length - 1 - index]]);
        //     });

        //     teamArr.splice(1, 0, teamArr[length - 1]);
        //     teamArr.pop();

        //     rounds++
        //     allMatches.push(gamesObj);
        // };
        // if only two people left or on last round, stop
        // return those
        console.log('teamArr', teamArr)
        console.log('teamArr2', teamArr)

        // wait for input response
        // save response for later
        // take losers of teamArr
        // match people
        // return the new games
        // repeat until two players
        
        setAllGames(allMatches);
        localStorage.setItem('allGamesSingle', JSON.stringify(...allMatches));
        localStorage.setItem('generatedNamesList', JSON.stringify(teamNames));
    };

    const generateDoubleElimination = () => {
        console.log('Double Elimination');
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
        generatedNamesList,
        generateSingleElimination,
        generateDoubleElimination,
    };
};

export default useRRGenerator;