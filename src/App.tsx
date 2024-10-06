import { Provider } from 'react-redux';
import AllRoutes from './routes';
import { Toaster } from 'sonner';
import store from './redux/store';

function App() {
  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 dark:from-gray-800 dark:via-gray-900 dark:to-black'>
      <Provider store={store}>
        <Toaster />
        <AllRoutes />
      </Provider>
    </div>
  );
}

export default App;
