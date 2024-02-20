import { Link } from 'react-router-dom';
import bomb from './img/bomb.png';
import arrow from './img/arrowPlay.png'

import './homePage.css'

function HomePage () {
  return (
    <main className='homePageContainer'>
      <div className="logoContainer">
        <img src={bomb} alt="Mine Logo" />
      </div>
      <div className="buttonContainer">
        <button>
          <Link to="/settings">Play</Link>
          <img src={arrow} alt="arrow play"/>
        </button>
        <button className='ratingButton'>
          <Link to="/rating">Rating</Link>
        </button>
      </div>
    </main>
  )
}

export default HomePage;