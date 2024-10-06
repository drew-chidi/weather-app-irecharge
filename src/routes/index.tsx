import CityDetailsPage from '@/pages/CityDetails';
import HomePage from '@/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

type Props = {};

const AllRoutes = (props: Props) => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:name' element={<CityDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
