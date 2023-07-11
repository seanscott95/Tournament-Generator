import { useState } from "react";

const useGenerator = () => {
    const [teamNameInput, setTeamNameInput] = useState('');
    const [teamNames, setTeamNames] = useState([]);
    const [allGames, setAllGames] = useState([]);

    const addTeamName = () => {
        if (teamNameInput.length === 0) {
            return;
        };
        setTeamNames((prev) => [...prev, teamNameInput])
        setTeamNameInput('')
    };

    const removeTeamName = (e) => {
        const teamToRemove = e.target.getAttribute('value');

        const newTeamNames = teamNames.filter(el => el !== teamToRemove);
        setTeamNames(newTeamNames);
    };

    // Generates a round robin list, makes sure each team has same amount of home and away games
    const handleGenerateClick = () => {
        let tempList = [...teamNames];
        let tempArr = [];

        teamNames.length >= 2 && teamNames.forEach((team) => {
            tempList.reverse().forEach((item) => {
                if (team === item) {
                    return;
                };

                let teamPair = [team, item];
                // const lastElTempArr = tempArr.slice(-1);

                // // Makes sure each person has same amount of home and away games
                // if (teamPair[0] === lastElTempArr.flat()[0]) {
                //     teamPair.reverse();
                //     tempArr.push(teamPair);
                //     return;
                // }
                tempArr.push(teamPair);
            });
            tempList.pop();
        });

        // Evenly distributes teams to a schedule
        const distributeEvenly = (array) => {
            // console.log('array', array)
            // i have an array of arrays with two strings in them
            // i want to order the array elements
            // i want to order the array so the games are evenly spread
            // i want to 


            // 4 names

            // one VS four   1
            // one VS three  2
            // one VS two    3
            // two VS three  4
            // two VS four   5
            // three VS two  6
            // four VS three 7

            // one VS four   1
            // one VS three  2
            // one VS two    3
            // two VS three  4
            // two VS four   5
            // three VS two  6
            // four VS three 7

            // take the first, add to new, remove from old, 7 6
            // total people down, so 4 is the new one, 6 - 5
            // take top of list 5 - 4
            // total people down, so 4 is the new one, 4 - 3
            // take top of list 5 - 4



        };
        
        // console.log('tempArr', tempArr)
        // const gamesEvenedArr = distributeEvenly(tempArr);
        // console.log('1fgamesEvenedArr', gamesEvenedArr)

        setAllGames(tempArr);


        // const distributeEvenly = (array) => {
        //     const arr = [...new Set(array)].map(el => array.filter(e => el === e));

        //     return array.map((_, i) => arr.map(el => el[i])).reduce((a, b) => a.concat(b)).filter(el => el);
        // };
        
        // Returns the evenly distributed games back to their orignal format
        // const gamesEvenedFormattedArr = gamesEvenedArr.reduce((resArr, item, index) => {
        //     const chunkIndex = Math.floor(index / 2);
            
        //     if (!resArr[chunkIndex]) {
        //         resArr[chunkIndex] = [];
        //     };

        //     resArr[chunkIndex].push(item);
        //     return resArr;
        // }, []);
        // console.log('gamesEvenedFormattedArr', gamesEvenedFormattedArr)

        
        // setAllGames(gamesEvenedFormattedArr);
    };

    return {
        addTeamName,
        teamNameInput,
        setTeamNameInput,
        teamNames,
        handleGenerateClick,
        allGames,
        removeTeamName
    };
};

export default useGenerator;