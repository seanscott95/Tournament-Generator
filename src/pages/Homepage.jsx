import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faUserGroup, faUserCheck, faPersonChalkboard } from '@fortawesome/free-solid-svg-icons';

import RRMatches from '../assets/images/HomepagePicture.PNG';

const Homepage = () => {
  return (
    <>
      <section className='homepage'>
        <h2>Create tournaments with your friends and see who really is the best...</h2>
        <div className='infoContainer'>
          <ul>
            <li>
              <FontAwesomeIcon className="icon" icon={faUserPen} />
              Choose from a Round Robin, Single and Double Elimination Tournament</li>
            <li>
              <FontAwesomeIcon className="icon" icon={faPersonChalkboard} />
              Organise your tournaments with this simple to use generator</li>
            <li>
              <FontAwesomeIcon className="icon" icon={faUserCheck} />
              Free and easy to use with no signup required</li>
            <li>
              <FontAwesomeIcon className="icon" icon={faUserGroup} />
              No limit to the amount of teams you can use
            </li>
          </ul>
          <img src={RRMatches} alt="Generated tournament" />
        </div>
      </section>
    </>
  );
};

export default Homepage;