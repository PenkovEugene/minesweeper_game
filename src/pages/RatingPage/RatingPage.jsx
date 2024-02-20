import React, { useState, useEffect } from 'react';
import './ratingPage.css'

function RatingPage () {
  const [players, setPlayers] = useState([]);

  const samplePlayersData =[
    { nickname: "Username 1", time: "-", level: "Easy" },
    { nickname: "Username 2", time: "-", level: "Medium" },
    { nickname: "Username 3", time: "-", level: "Hard" },
  ];

  useEffect(() => {
    setPlayers(samplePlayersData);
  }, []);
  return (
    <main className='ratingPageContainer'>
      <h1>Top 10 Players</h1>
      {/* <ol className='playerList'>
        {players.map((player, index) => (
          <li key={index}>
            <span>{player.nickname}</span>
            <span>{player.time}</span>
            <span>{player.level}</span>
          </li>
        ))}
      </ol> */}
      (В разработке, чтобы вернуться, нажмите на "Minesweeper")
    </main>
  )
}

export default RatingPage;