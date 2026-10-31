import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MainContainer } from '@/pages/index';
import { store } from '@/core/states/redux/store';

import './assets/tailwindConfig.css';
import '@/services/log/init';
import { runAxe } from './test/runAxe';

void runAxe(ReactDOM);

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root-react-youtube-reload-app') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<MainContainer />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
