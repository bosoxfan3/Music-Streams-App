import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CompareTracks from './web/compareTracks';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <CompareTracks />
    </React.StrictMode>
);
