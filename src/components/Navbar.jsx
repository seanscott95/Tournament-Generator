import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/' className='heading'>
        <h1 >TOURNAMENT GENERATOR</h1>
      </Link>
      <ul>
        <li>
          <Link to='/roundRobin'>
            <button className='btnNeon customBtn'>Round Robin</button>
          </Link>
        </li>
        <li>
          <Link to='/single'>
            <button className='btnNeon customBtn'>Single</button>
          </Link>
        </li>
        <li>
          <Link to='/double'>
            <button className='btnNeon customBtn'>Double</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;