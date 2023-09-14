import {createHashRouter} from 'react-router-dom';
import {lazy} from 'react';
const NoMatch = lazy(() => import('@/views/NoMatch'));
const Home = lazy(() => import('@/views/home'));
const Editor = lazy(() => import('@/views/editor'));

export const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/editor/:id',
    element: <Editor />
  },
  {
    path: '*',
    element: <NoMatch></NoMatch>,
    name: 'NoMatch',
    meta: {
      auth: true,
      title: 'NoMatch'
    }
  }
];

export const router = createHashRouter(routes, {});

export default router;
