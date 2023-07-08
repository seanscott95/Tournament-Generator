import { useState } from "react";

const useGenerator = () => {
    const [teamNameInput, setTeamNameInput] = useState('');
    const [teamNames, setTeamNames] = useState([]);
    const [allGames, setAllGames] = useState([]);

    const addTeamName = () => {
        setTeamNames((prev) => [...prev, teamNameInput])
        setTeamNameInput('')
    };

    // Generates a round robin list, makes sure each team has same amount of home and away games
    const handleGenerateClick = () => {
        let tempList = [...teamNames];
        let tempArr = [];

        teamNames.length >= 2 && teamNames.forEach((team) => {
            tempList.forEach((item) => {
                if (team === item) {
                    return;
                };

                let teamPair = [team, item];
                const lastElTempArr = tempArr.slice(-1);

                // Makes sure each person has same amount of home and away games
                if (teamPair[0] === lastElTempArr.flat()[0]) {
                    teamPair.reverse();
                    tempArr.push(teamPair);
                    return;
                }
                tempArr.push(teamPair);
            });
            tempList.shift();
        });

        // Evenly distributes teams to a schedule
        const distributeEvenly = (array) => {
            const arr = [...new Set(array)].map(el => array.filter(e => el === e));

            return array.map((_, i) => arr.map(el => el[i])).reduce((a, b) => a.concat(b)).filter(el => el);
        };
        
        const gamesEvenedArr = distributeEvenly(tempArr.flat());
        
        // Returns the evenly distributed games back to their orignal format
        const gamesEvenedFormattedArr = gamesEvenedArr.reduce((resArr, item, index) => {
            const chunkIndex = Math.floor(index / 2);
            
            if (!resArr[chunkIndex]) {
                resArr[chunkIndex] = [];
            };

            resArr[chunkIndex].push(item);
            return resArr;
        }, []);
        
        setAllGames(gamesEvenedFormattedArr);
    };

    return {
        addTeamName,
        teamNameInput,
        setTeamNameInput,
        teamNames,
        handleGenerateClick,
        allGames
    };
};

export default useGenerator;