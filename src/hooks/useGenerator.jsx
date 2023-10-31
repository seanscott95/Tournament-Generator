import { useState } from 'react';
import capitaliseFirstLetter from '../helper/capitaliseFirstLetter';

const useGenerator = () => {
  const [teamNameInput, setTeamNameInput] = useState('');
  const [teamNames, setTeamNames] = useState([null, null, null]);
  const [allGames, setAllGames] = useState([]);
  const [generatedNamesList, setGeneratedNamesList] = useState([]);

  const [lossesBracket, setLossesBracket] = useState([]);
  const [winnersBracket, setWinnersBracket] = useState([]);
  const [finalsBracket, setFinalsBracket] = useState([]);
  const [isFinalRound, setIsFinalRound] = useState(false);

  // Adds the team name the user inputted to the teamNames state variable
  const addTeamName = () => {
    if (teamNameInput === '') {
      return;
    };
    const capTeamNameInput = capitaliseFirstLetter(teamNameInput);

    // Teamnames defualt value is three null values so the team names
    // always shows three empty teamnames on the list
    const hasNull = teamNames[teamNames.length - 1] === null;
    if (hasNull) {
      let count = teamNames.filter((item) => item !== null).length;

      // Replaces a default value of null for the inputted team name to the
      // inputted team name state variable depending on how many nulls remain
      if (count < 3) {
        let diff = 3 - count;
        if (diff === 3) {
          setTeamNames([capTeamNameInput, null, null]);
        };
        if (diff === 2) {
          setTeamNames((prev) => [
            ...prev.filter((item) => item !== null),
            capTeamNameInput,
            null,
          ]);
        };
        if (diff === 1) {
          setTeamNames((prev) => [
            ...prev.filter((item) => item !== null),
            capTeamNameInput,
          ]);
        };
        setTeamNameInput('');
        return;
      };
    };

    setTeamNames((prev) => [...prev, capTeamNameInput]);
    setTeamNameInput('');
  };

  // Removes the team name the user has clicked to remove
  const removeTeamName = (e) => {
    const teamToRemove = e.target.getAttribute('value');

    const newTeamNames = teamNames.filter((el) => el !== teamToRemove);
    setTeamNames(newTeamNames);
  };

  // Takes an array and matches the teams into pairs to play each other
  const createGame = (arr) => {
    // Match teams into pairs
    const gamesObj = arr.map((team, index) => {
      if (index % 2 === 0) {
        return [team, arr[index + 1]];
      };
    });
    const filteredGames = gamesObj.filter((game) => game !== undefined);
    return filteredGames;
  };

  const updateRound = () => {
    const r = JSON.parse(localStorage.getItem('round')) || 0;
    const newRound = r + 1;
    localStorage.setItem('round', JSON.stringify(newRound));
  };

  // Generates a round robin tournament array
  const generateRoundRobin = () => {
    localStorage.removeItem('allGamesSingle');
    localStorage.removeItem('generatedNamesList');
    localStorage.removeItem('SE');
    localStorage.setItem('round', 1);

    let teamArr = teamNames;
    // If team array is an odd number a bye is introduced to even team array
    // as teams can't be sorted as an odd number
    if (teamArr.length % 2 !== 0) {
      if (!teamArr.includes('Bye')) {
        teamArr.push('Bye');
      };
    };

    const length = teamArr.length;

    let round = 1;
    let allMatches = [];
    
    // Takes half the team and pairs with the other half
    while (round <= length - 1) {
      let gamesObj = [];
      
      // Uses half of the team to pair against other half based on the index
      // Pairs first with last, second with second last etc...
      let halfOfTeamArr = teamArr.slice(0, length / 2);
      halfOfTeamArr.forEach((team, index) => {
        const opponent = teamArr[length - 1 - index];
        // Removes the games with byes that was needed to create games
        if (team === 'Bye' || opponent === 'Bye') return;
        gamesObj.push([team, opponent]);
      });

      // Removes the last element of the array and adds to start of array
      teamArr.splice(1, 0, teamArr[length - 1]);
      teamArr.pop();

      round++;
      allMatches.push(gamesObj);
    }

    setAllGames(allMatches);
    localStorage.setItem('allGamesSingle', JSON.stringify(allMatches.flat()));
    localStorage.setItem('generatedNamesList', JSON.stringify(teamNames));
  };

  const generateSingleElimination = (winningTeams = null) => {
    // If it is first round remove and set local storage items
    if (winningTeams === null) {
      localStorage.removeItem('round');
      localStorage.removeItem('allGamesSingle');
      localStorage.removeItem('generatedNamesList');
      localStorage.removeItem('SE');
      localStorage.setItem('generatedNamesList', JSON.stringify(teamNames));
    };

    updateRound();

    let teamArr = teamNames;
    let allMatches = [];

    // Sets the teamArr as the winning teams for all rounds but the first
    // as there are no winning teams when generating first round
    if (winningTeams !== null) {
      teamArr = winningTeams;
    };

    // If team array is an odd number a bye is introduced to even team array
    // as teams can't be sorted as an odd number
    if (teamArr.length % 2 !== 0) {
      if (!teamArr.includes('Bye')) {
        teamArr.push('Bye');
      };
    };

    // Randomise order
    teamArr.sort(() => Math.random() - 0.5);
    // Match teams into pairs
    const gamesObj = teamArr.map((team, index) => {
      if (index % 2 === 0) {
        return [team, teamArr[index + 1]];
      };
    });
    const filteredGames = gamesObj.filter((game) => game !== undefined);

    allMatches.push(filteredGames);
    setAllGames(allMatches);

    if (winningTeams?.length === 2) {
      setIsFinalRound(true);
    };

    localStorage.setItem('allGamesSingle', JSON.stringify(...allMatches));
  };

  const generateDoubleElimination = (winningAndLosingTeams = null) => {
    // If it is first round remove and set local storage items
    if (winningAndLosingTeams === null) {
      localStorage.removeItem('round');
      localStorage.removeItem('allGamesSingle');
      localStorage.removeItem('generatedNamesList');
      localStorage.removeItem('SE');
      localStorage.setItem('generatedNamesList', JSON.stringify(teamNames));
    };

    let round = JSON.parse(localStorage.getItem('round')) + 1 || 1;

    let teamArr = teamNames;
    let allMatches = [];

    // If team array is an odd number a bye is introduced to even team array
    // as teams can't be sorted as an odd number
    if (teamArr.length % 2 !== 0) {
      if (!teamArr.includes('Bye')) {
        teamArr.push('Bye');
      };
    };

    let { winners, losers } = winningAndLosingTeams || {};

    // Eliminates loser thats already lost before
    if (losers) {
      losers.forEach((player) => {
        if (lossesBracket.includes(player)) {
          losers = losers.filter((l) => l !== player);
          setLossesBracket((prev) => prev.filter((p) => p !== player));
        };
      });
      // Removes player from winners and adds to losers if they are on loser bracket
      winners.forEach((player) => {
        if (lossesBracket.includes(player)) {
          winners = winners.filter((l) => l !== player);
          losers = [...losers, player];
        };
      });
    };

    // Sets the winners variables value to the winnersBracket value
    // This happens as the losing bracket in double elim have extra games to play
    // Winners aren't set from returned winners but from previous round winner bracket
    if (winners?.length === 0 && losers?.length > 1) {
      winners = winnersBracket;
    };

    if (round === 1) {
      const g = createGame(teamArr);
      allMatches.push(g);
      setAllGames(allMatches);
    };
    if (round > 1) {
      if (winners.length > 2) {
        const createdGames = createGame([...winners, ...losers]);
        allMatches.push(createdGames);

        setWinnersBracket(winners);
        setLossesBracket(losers);
      };

      if (winners.length === 2) {
        // true if losers is even
        if ((losers.length / 2) % 2 === 0) {
          const createdGames = createGame(losers);
          allMatches.push(createdGames);

          setWinnersBracket(winners);
          setLossesBracket(losers);
        };
        // true if losers is odd
        if ((losers.length / 2) % 2 !== 0) {
          const createdGames = createGame([...winners, ...losers]);
          allMatches.push(createdGames);

          setWinnersBracket(winners);
          setLossesBracket(losers);
        };
      };

      if (winners.length === 1) {
        // Sets the games when it is the second last round
        if (losers.length !== 1) {
          const createdGames = createGame(losers);
          allMatches.push(createdGames);

          setFinalsBracket(winners);
          setWinnersBracket(winners);
          setLossesBracket(losers);
        };
        // Sets the games when it is the last round
        if (losers.length === 1) {
          const createdGames = createGame([finalsBracket, losers]);
          const formattedCreatedGames = createdGames.map((game) => game.flat());
          allMatches.push(formattedCreatedGames);

          setIsFinalRound(true);
        };
      };

      // Sets the game for the final round with the team already in the finals
      // bracket and the last team from the losing bracket
      if (winners.length === 0 && losers.length === 1) {
        const createdGames = createGame([finalsBracket, losers]);
        const formattedCreatedGames = createdGames.map((game) => game.flat());
        allMatches.push(formattedCreatedGames);

        setIsFinalRound(true);
      };

      setAllGames(allMatches);
    };

    updateRound();

    localStorage.setItem('allGamesSingle', JSON.stringify(...allMatches));
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
    isFinalRound,
  };
};

export default useGenerator;
