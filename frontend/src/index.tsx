import { createRoot } from 'react-dom/client';

import { App } from './App';
import { Grant } from './Grant';

export const GLOBALS = {
    // eslint-disable-next-line no-undef
    API_URL: process.env.API_URL,
};

createRoot(document.querySelector('#root')).render(<Grant />);
