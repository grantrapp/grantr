import {
    darkTheme,
    getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { Admin } from './admin/Admin';
import { AdminPostEdit } from './admin/AdminPostEdit';
import { AdminTagEdit } from './admin/tags/AdminTagEdit';
import { Tags } from './admin/tags/Tags';
import { Down } from './Down';
import { Grant } from './grant/Grant';
import { Home } from './home/Home';
import { GLOBALS } from './index';
import { WIP } from './WIP';

const { chains, provider } = configureChains(
    [chain.mainnet],
    [publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: 'Grantr.app',
    chains,
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

export const App = () => {
    const [status, setStatus] = useState<
        'up' | 'maintenance' | 'unexpectedDown'
    >('up');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(GLOBALS.API_URL);

                if (response.status === 503) {
                    setStatus('maintenance');
                } else if (response.status !== 200) {
                    setStatus('unexpectedDown');
                }
            } catch (error) {
                // eslint-disable-next-line prettier/prettier
                console.error('Could not fetch maintenance status, erroring: ' + error);
            }
        };

        fetchData();
    }, []);

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
                chains={chains}
                theme={darkTheme({
                    accentColor: '#FFCC00',
                    accentColorForeground: '#000',
                    borderRadius: 'none',
                    fontStack: 'system',
                })}
            >
                <BrowserRouter>
                    <Routes>
                        {status === 'unexpectedDown' ? (
                            <Route path="/" element={<Down />} />
                        ) : (
                            <>
                                {status !== 'maintenance' ||
                                localStorage.getItem('luc-debug') ? (
                                    <>
                                        <Route path="/" element={<Home />} />
                                        <Route
                                            path="/admin"
                                            element={<Admin />}
                                        />
                                        <Route
                                            path="/admin/new"
                                            element={<AdminPostEdit isNew />}
                                        />
                                        <Route
                                            path="/admin/:id/edit"
                                            element={<AdminPostEdit />}
                                        />
                                        <Route
                                            path="/admin/tags"
                                            element={<Tags />}
                                        />
                                        <Route
                                            path="/admin/tags/new"
                                            element={<AdminTagEdit isNew />}
                                        />
                                        <Route
                                            path="/admin/tags/:id/edit"
                                            element={<AdminTagEdit />}
                                        />
                                        <Route
                                            path="/grant/:id"
                                            element={<Grant />}
                                        />
                                    </>
                                ) : (
                                    <Route path="/" element={<WIP />} />
                                )}
                            </>
                        )}
                    </Routes>
                </BrowserRouter>
            </RainbowKitProvider>
        </WagmiConfig>
    );
};
