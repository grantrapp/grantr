import { createRoot } from 'react-dom/client';
// import '@rainbow-me/rainbowkit/styles.css';

import { App } from './App';

export const GLOBALS = {
    // eslint-disable-next-line no-undef
    API_URL: process.env.API_URL,
};

createRoot(document.querySelector('#root')).render(<App />);
