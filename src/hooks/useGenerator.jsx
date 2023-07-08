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

        console.log('tempArr', tempArr)
        setAllGames(tempArr);

    };
    
    // five names ['bob, 'pal', 'dave', 'nath', 'jack']
  
    // [
    //    ["bob": "pal"],
    //    ["bob": "dave"],
    //    ["bob": "nath"],
    //    ["bob": "jack"],
    //    ["pal": "dave"],
    //    ["pal": "nath"],
    //    ["pal": "jack"],
    //    ["dave": "nath"],
    //    ["dave": "jack"],
    //    ["nath": "jack"]
    // ]

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