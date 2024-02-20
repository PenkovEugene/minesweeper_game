import React from 'react';
import { Link } from 'react-router-dom';
import './settingsPage.css'

function SettingsPage () {
  // const [nickname, setNickname] = useState('Ghost');

  // const handleNicknameChange = (e) => {
  //   setNickname(e.target.value);
  // };

  return (
    <main className='settingsPageContainer'>
      <div className="nicknameFormConteiner">
        <h2>Enter your nickname:</h2>
        {/* <div className="inputWrapper">
          <input type="text" value={nickname} onChange={handleNicknameChange}/>
        </div> */}
        (Логирование в разработке. Но вы можете начать игру, выбрав уровень)
      </div>
      <div className="levelTextContainer">
        <h2>Choose the difficulty of the game</h2>
      </div>
      <div className="levelButtonsContainer">
        <button className='easyLevelButton'><Link to="/settings/easy">Easy 8x8, ~10 min</Link></button>
        <button className='mediumLevelButton'><Link to="/settings/medium">Medium 16x16, ~40 min</Link></button>
        <button className='hardLevelButton'><Link to="/settings/hard">Hard 32x16, ~100 min</Link></button>
      </div>
    </main>
  )
}

export default SettingsPage;

//не реализована функция логирования, чтобы пользователь мог ввести никнейм, для попадания в рейтинг при победе