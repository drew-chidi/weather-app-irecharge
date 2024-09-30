import { useState } from 'react';
import './App.css';
import AllRoutes from './routes';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Toaster />
      <AllRoutes />
    </>
  );
}

export default App;
