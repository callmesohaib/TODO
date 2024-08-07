import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Todo } from './pages/todo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Todo />
  </React.StrictMode>
);

