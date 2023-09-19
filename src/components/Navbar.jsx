import { Link, NavLink } from 'react-router-dom';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/' className='heading'>
        <h1 >TOURNAMENT <FontAwesomeIcon className="icon" icon={faTrophy} /> GENERATOR</h1>
      </Link>
      <ul>
        <li>
          <NavLink
            to='/roundRobin'
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <button className='btnNeon customBtn'>Round Robin</button>
          </NavLink>
        </li>
        <li>
          <NavLink to='/single'>
            <button className='btnNeon customBtn'>Single</button>
          </NavLink>
        </li>
        <li>
          <NavLink to='/double'>
            <button className='btnNeon customBtn'>Double</button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;