import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Minesweeper from './Minesweeper';
import './styles/reset.css'
import './styles/common.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Minesweeper />
    </BrowserRouter>
  </React.StrictMode>
);
