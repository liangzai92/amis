import React, {Suspense} from 'react';
import {RouterProvider} from 'react-router-dom';
import router from '@/router/routes';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Suspense>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </>
  );
};

export default App;
