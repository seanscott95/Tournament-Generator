import { useState, useEffect } from 'react';
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
    console.log('WALT-1', winningAndLosingTeams)
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
      const k = [
        ...winningAndLosingTeams.winners,
        ...winningAndLosingTeams.losers,
      ];
      console.log('k w-2', winningAndLosingTeams.winners)
      console.log('k l-2', winningAndLosingTeams.losers)
      console.log('k-2', k)
      teamArr = k;
    }

    

    let { winners, losers } = winningAndLosingTeams || {};
    console.log('winners-3', winners?.length, winners);
    console.log('losers-3', losers?.length, losers);
    
    
    // Eliminates loser thats already lost before
    if (losers) {
      losers.forEach((player) => {
        if (lossesBracket.includes(player)) {
          losers = losers.filter((l) => l !== player);
          setLossesBracket((prev) => prev.filter((p) => p !== player));
        }
      });
      // Removes player from winners and adds to losers if they are on loser bracket
      winners.forEach((player) => {
        if (lossesBracket.includes(player)) {
          winners = winners.filter((l) => l !== player);
          losers = [...losers, player];
        }
      });
    }

    // Sets the winners variables value to the winnersBracket value
    // This happens as the losing bracket in double elim have extra games to play
    // Winners aren't set from returned winners but from previous round winner bracket
    if (losers?.length === 2 && winners?.length === 0) {
      if (finalsBracket.length !== 1) {
        winners = winnersBracket;
      } 

      console.log('hit wbbbbbbbbbbbbbbbb set')
      // if (winners.length === 1 && losers.length === 1) {
      //   setLossesBracket((prev) => prev.filter((l) => l !== losers))
      //   setWinnersBracket((prev) => prev.filter((l) => l !== losers))
      //   winners = winners.filter((l) => l !== losers)
      // } else {
      //   console.log('hit wbbbbbbbbbbbbbbbb set')
      //   winners = winnersBracket;
      // }
    }
    console.log('after winners-3', winners?.length, winners);
    console.log('2winners-3', winners?.length, winners);
    console.log('2losers-3', losers?.length, losers);

    if (round === 1) {
      console.log('ROUND 1')
      const g = createGame(teamArr);
      allMatches.push(g);
      setAllGames(allMatches);
    }
    if (round !== 1) {
      console.log('ROUND +')
      // use following without the if statements below on winners length etc
      // const createdGames = createGame([...winners, ...losers]);
      // console.log('mmmmm11', losers);
      // allMatches.push(createdGames);

      // setWinnersBracket(winners);
      // setLossesBracket(losers);
      
      if (winners.length > 2) {
        const createdGames = createGame([...winners, ...losers]);
        console.log('mmmmm11', losers);
        allMatches.push(createdGames);

        setWinnersBracket(winners);
        setLossesBracket(losers);
      }
      if (winners.length === 2) {
        console.log('hit in 2')
        console.log('hit in 2')
        if (losers.length !== 2) {
          console.log('hit in 2-1')
          console.log('mmmmm12', losers);
          const createdGames = createGame(losers);
          console.log('createdGames2', createdGames);
          allMatches.push(createdGames);
          
          setWinnersBracket(winners);
          setLossesBracket(losers);
        };
        if (losers.length === 2) {
          console.log('hit in 2-2')
          console.log('mmmmm13', [...winners, ...losers]);
          const createdGames = createGame([...winners, ...losers]);
          console.log('createdGames3', createdGames);
          allMatches.push(createdGames);

          setWinnersBracket(winners);
          setLossesBracket(losers);
        }

      }
      console.log('SKIPPED')
      if (winners.length === 1 && losers.length !== 1) {
        console.log('mmmmm14', losers)
        const createdGames = createGame(losers)
        console.log('createdGames4', createdGames)
        allMatches.push(createdGames);

        setFinalsBracket(winners)
        setWinnersBracket(winners);
        setLossesBracket(losers);
      }
      if (winners.length === 0 && losers.length === 1) {
        console.log('hit in end')
        console.log('winners end', winners)
        console.log('fb end', finalsBracket)
        console.log('mmmmm15 end', [...winners, ...losers])
        const createdGames = createGame([finalsBracket, losers])
        console.log('createdGames4end', createdGames);
        const formattedCreatedGames = createdGames.map((game) => game.flat());
        console.log('formattedCreatedGames', formattedCreatedGames)
        allMatches.push(formattedCreatedGames);

        setIsFinalRound(true)
      }
      console.log('END b4 send', allMatches)

      setAllGames(allMatches);
    }

    updateRound();

    localStorage.setItem('allGamesSingle', JSON.stringify(...allMatches));
    localStorage.setItem('generatedNamesList', JSON.stringify(teamNames));
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
    finalsBracket,
    isFinalRound,
  };
};

export default useRRGenerator;
