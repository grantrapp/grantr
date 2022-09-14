import { createRoot } from 'react-dom/client';
// import '@rainbow-me/rainbowkit/styles.css';

import { App } from './App';

export const GLOBALS = {
    // eslint-disable-next-line no-undef
    API_URL: process.env.API_URL,
    ADMINS: [
        '0x225f137127d9067788314bc7fcc1f36746a3c3b5', // lucemans.eth
        '0x347f5f182d4b3043e44ff728fec6d72b23457fc8', // defigirlxo.eth
        '0xf19e71fdaba5c2916a9cfae87fdaf12516e3119f',
    ],
};

// @ts-ignore
createRoot(document.querySelector('#root')).render(<App />);

const match = 'pleaseopen';
let last_key = '';
if (!localStorage.getItem('luc-debug')) {
    document.addEventListener('keydown', (event) => {
        if (match.startsWith(last_key + event.key)) {
            last_key += event.key;

            if (last_key.length == match.length) {
                localStorage.setItem('luc-debug', 'pleaseopen');
                location.reload();
            }
        } else {
            last_key = '';
        }
    });
}
