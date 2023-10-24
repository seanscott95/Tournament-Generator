import { useState } from 'react';
import capitaliseFirstLetter from '../helper/capitaliseFirstLetter';

const useRRGenerator = () => {
  const [teamNameInput, setTeamNameInput] = useState('');
  const [teamNames, setTeamNames] = useState([null, null, null]);
  const [allGames, setAllGames] = useState([]);
  const [generatedNamesList, setGeneratedNamesList] = useState([]);

  const [lossesBracket, setLossesBracket] = useState([]);
  const [winnersBracket, setWinnersBracket] = useState([]);
  const [finalsBracket, setFinalsBracket] = useState([]);
  const [isFinalRound, setIsFinalRound] = useState(false);

  const addTeamName = () => {
    if (teamNameInput === '') {
      return;
    }
    const capTeamNameInput = capitaliseFirstLetter(teamNameInput);

    const hasNull = teamNames[teamNames.length - 1] === null;
    if (hasNull) {
      let count = teamNames.filter((item) => item !== null).length;

      if (count < 3) {
        let diff = 3 - count;

        if (diff === 3) {
          setTeamNames([capTeamNameInput, null, null]);
        }
        if (diff === 2) {
          setTeamNames((prev) => [
            ...prev.filter((item) => item !== null),
            capTeamNameInput,
            null,
          ]);
        }
        if (diff === 1) {
          setTeamNames((prev) => [
            ...prev.filter((item) => item !== null),
            capTeamNameInput,
          ]);
        }
        setTeamNameInput('');
        return;
      }
    }

    setTeamNames((prev) => [...prev, capTeamNameInput]);
    setTeamNameInput('');
  };

  const removeTeamName = (e) => {
    const teamToRemove = e.target.getAttribute('value');

    const newTeamNames = teamNames.filter((el) => el !== teamToRemove);
    setTeamNames(newTeamNames);
  };

  const createGame = (arr) => {
    // Match teams into pairs
    const gamesObj = arr.map((team, index) => {
      if (index % 2 === 0) {
        return [team, arr[index + 1]];
      }
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
    if (teamArr.length % 2 !== 0) {
      if (!teamArr.includes('Bye')) {
        teamArr.push('Bye');
      };
    };
    
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

      rounds++;
      allMatches.push(gamesObj);
    }

    setAllGames(allMatches);
    localStorage.setItem('allGamesSingle', JSON.stringify(allMatches.flat()));
    localStorage.setItem('generatedNamesList', JSON.stringify(teamNames));
  };

  const generateSingleElimination = (winningTeams = null) => {
    // If it is first round
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

    if (winningTeams !== null) {
      teamArr = winningTeams;
    };

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
    // If it is first round
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
        if (losers.length !== 1) {
          const createdGames = createGame(losers);
          allMatches.push(createdGames);

          setFinalsBracket(winners);
          setWinnersBracket(winners);
          setLossesBracket(losers);
        };
        if (losers.length === 1) {
          const createdGames = createGame([finalsBracket, losers]);
          const formattedCreatedGames = createdGames.map((game) => game.flat());
          allMatches.push(formattedCreatedGames);

          setIsFinalRound(true);
        };
      };

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

export default useRRGenerator;
