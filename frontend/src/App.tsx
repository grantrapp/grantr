import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Admin } from './admin/Admin';
import { AdminPostEdit } from './admin/AdminPostEdit';
import { Grant } from './grant/Grant';
import { Home } from './home/Home';

import {
    darkTheme,
    getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

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
                        <Route path="/" element={<Home />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route
                            path="/admin/new"
                            element={<AdminPostEdit isNew />}
                        />
                        <Route
                            path="/admin/:id/edit"
                            element={<AdminPostEdit />}
                        />
                        <Route path="/grant/:slug/:id" element={<Grant />} />
                    </Routes>
                </BrowserRouter>
            </RainbowKitProvider>
        </WagmiConfig>
    );
};
