import { useState, useEffect } from 'react';
import capitaliseFirstLetter from '../helper/capitaliseFirstLetter';

const useRRGenerator = () => {
  const [teamNameInput, setTeamNameInput] = useState('');
  const [teamNames, setTeamNames] = useState([null, null, null]);
  const [allGames, setAllGames] = useState([]);
  const [generatedNamesList, setGeneratedNamesList] = useState([]);

  const [lossesBracket, setLossesBracket] = useState([]);
  const [winnersBracket, setWinnersBracket] = useState([]);
  
  useEffect(() => {
    console.log('Losses bracket', lossesBracket);
    console.log('Winners bracket', winnersBracket);
  }, [lossesBracket, winnersBracket]);

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

      rounds++;
      allMatches.push(gamesObj);
    }

    setAllGames(allMatches);
    localStorage.setItem('allGames', JSON.stringify(allMatches));
    localStorage.setItem('generatedNamesList', JSON.stringify(teamNames));
  };

  const generateSingleElimination = (winningTeams = null) => {
    updateRound();
    let round = JSON.parse(localStorage.getItem('round')) || 1;

    let teamArr = teamNames;
    let allMatches = [];

    if (round === 1) {
      localStorage.setItem('originalNamesList', JSON.stringify(teamNames));
    }

    if (winningTeams !== null) {
      teamArr = winningTeams;
    }

    if (teamArr.length % 2 !== 0) {
      if (!teamArr.includes('Bye')) {
        teamArr.push('Bye');
      }
    }

    // Randomise order
    teamArr.sort(() => Math.random() - 0.5);
    // Match teams into pairs
    const gamesObj = teamArr.map((team, index) => {
      if (index % 2 === 0) {
        return [team, teamArr[index + 1]];
      }
    });
    const filteredGames = gamesObj.filter((game) => game !== undefined);

    allMatches.push(filteredGames);
    setAllGames(allMatches);

    localStorage.setItem('allGamesSingle', JSON.stringify(...allMatches));
    localStorage.setItem('generatedNamesList', JSON.stringify(teamNames));
  };

  const generateDoubleElimination = (winningAndLosingTeams = null) => {
    let round = JSON.parse(localStorage.getItem('round')) + 1 || 1;
    
    let teamArr = teamNames;
    let allMatches = [];
    
    if (round === 1) {
      localStorage.setItem('originalNamesList', JSON.stringify(teamNames));
    }
    
    if (teamArr.length % 2 !== 0) {
      if (!teamArr.includes('Bye')) {
        teamArr.push('Bye');
      }
    }
    if (winningAndLosingTeams !== null) {
      const k = [...winningAndLosingTeams.winners, ...winningAndLosingTeams.losers];
      teamArr = k;
    }

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
    
    let { winners, losers } = winningAndLosingTeams || {};

    // Eliminates loser thats already lost before
    if (losers) {
      losers.forEach((player) => {
        if (lossesBracket.includes(player)) {
          losers = losers.filter((l) => l !== player);
          setLossesBracket((prev) => prev.filter((p) => p !== player))
        };  
      });
      // Removes player from winners and adds to losers if they are on loser bracket
      winners.forEach((player) => {
        if (lossesBracket.includes(player)) {
          winners = winners.filter((l) => l !== player);
          losers = [...losers, player];
        }
      })
    }

    if (round === 1) {
      const g = createGame(teamArr);
      allMatches.push(g);
      setAllGames(allMatches);
    }
    if (round !== 1) {
      const createdGames = createGame([...winners, ...losers])
      allMatches.push(createdGames);

      setWinnersBracket(winners);
      setLossesBracket(losers);
      
      setAllGames(allMatches);
    }
    
    updateRound();
    
    console.log('allm2', ...allMatches)
    localStorage.setItem('allGamesSingle', JSON.stringify(...allMatches));
    localStorage.setItem('generatedNamesList', JSON.stringify(teamNames));
  };
  
  const updateRound = () => {
    const r = JSON.parse(localStorage.getItem('round')) || 0;
    const newRound = r + 1;
    localStorage.setItem('round', JSON.stringify(newRound));
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
