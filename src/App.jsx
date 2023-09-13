import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import RRGenerator from './components/RRGenerator';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/roundRobin" element={<RRGenerator />} />
          <Route path="/single" element={<RRGenerator />} />
          <Route path="/double" element={<RRGenerator />} />
        </Routes>
        <p className="m">Margin</p>
      </Router>
    </>
  );
};

export default App;
