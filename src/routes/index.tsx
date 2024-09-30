import React from 'react';
import CityDetailsPage from '@/pages/CityDetails';
import HomePage from '@/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

type Props = {};

const AllRoutes = (props: Props) => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/city/:name' element={<CityDetailsPage />} />

        {/* <Route path="/favorites" element={<Favorites />} /> */}
      </Routes>
    </Router>
  );
};

export default AllRoutes;
