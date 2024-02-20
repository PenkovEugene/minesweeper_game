import { Link } from 'react-router-dom';

import './homePage.css'

function HomePage () {
  return (
    <main className='homePageContainer'>
      <div className="logoContainer">
        <img src="bomb.png" alt="Mine Logo" />
      </div>
      <div className="buttonContainer">
        <button>
          <Link to="/settings">Play</Link>
          <img src="arrowPlay.png" alt="arrow play"/>
        </button>
        <button className='ratingButton'>
          <Link to="/rating">Rating</Link>
        </button>
      </div>
    </main>
  )
}

export default HomePage;