import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import RoundRobinGenerator from './pages/RoundRobinGenerator';
import SingleGenerator from './pages/SingleGenerator';
import DoubleGenerator from './pages/DoubleGenerator';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <div className="generatorContainer">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/roundRobin" element={<RoundRobinGenerator />} />
            <Route path="/single" element={<SingleGenerator />} />
            <Route path="/double" element={<DoubleGenerator />} />
          </Routes>
        </div>
        <p className="m">Margin</p>
        <Footer />
      </Router>
    </>
  );
};

export default App;
