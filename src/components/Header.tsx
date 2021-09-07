import { Link } from 'react-router-dom';
import logo from '../assets/images/d2-logo-header.png';
import '../components/Header.scss';

const Header = () => {
  return (
    <header className='header'>
      <div className="container">
        <div className="header-logo">
          <img src={logo} alt="Diablo 2 Paladin Planner" />
        </div>
        <h1 className="header-title">Diablo II Planner</h1>
        <div>
          <Link to="/">Home</Link>   |   <Link to="/about/edu">About</Link>
        </div>
      </div>
    </header>
  )
}

export default Header;
