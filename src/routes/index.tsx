import CityDetailsPage from '@/pages/CityDetails';
import HomePage from '@/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:city' element={<CityDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
