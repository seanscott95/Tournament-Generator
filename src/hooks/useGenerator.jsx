import { useState } from "react";

const useGenerator = () => {
    const [teamNameInput, setTeamNameInput] = useState('');
    const [teamNames, setTeamNames] = useState([]);
    const [allGames, setAllGames] = useState([]);
    console.log("teamNameInput", teamNameInput)
    console.log("teamNames", teamNames)
    const addTeamName = () => {
        setTeamNames((prev) => [...prev, teamNameInput])
        setTeamNameInput('')
    };

    // have a list of strings in an array
    // we want to grab each item and return an array of arrays
    const handleGenerateClick = () => {
        let tempList = [...teamNames];
        let tempArr = [];
        const newArr = teamNames.length >= 2 && teamNames.map((team) => {
            tempList.map((item) => {
                if (team === item) {
                    return;
                };
                console.log('team', team);
                const teamPair = [team, item];
                console.log('teamPair', teamPair);
                tempArr.push(teamPair);
            });
            tempList.shift();
        });

        console.log('tempArr', tempArr)
        setAllGames(tempArr);
    };
    // those objects will contain the original item plus each item
    // so if there is three names ['bob, 'pal', 'dave']
    // we want to return
    // [
    //    ["bob", "pal"],
    //    ["bob", "dave"],
    //    ["pal", "dave"]
    // ]
    //
    // so if there is five names ['bob, 'pal', 'dave', 'nath', 'jack']
    // we want to return
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
    //
    //

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