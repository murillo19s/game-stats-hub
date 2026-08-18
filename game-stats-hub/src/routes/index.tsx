import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Dashboard from '../pages/Dashboard';
import Explore from '../pages/Explore';
import Favorites from '../pages/Favorites';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/explore', element: <Explore /> },
      { path: '/favorites', element: <Favorites /> },
    ],
  },
]);