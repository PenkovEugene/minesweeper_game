import { Link } from 'react-router-dom';
import './header.css'

function Header () {
  return (
    <header className='header'>
      <div className="container">
        <div className="header__row">
          <h1><Link to="/">Minesweeper</Link></h1>
        </div>
      </div>
    </header>
  )
}

export default Header;