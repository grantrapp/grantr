import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Profile = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
            }) => {
                return (
                    <div
                        {...(!mounted && {
                            'aria-hidden': true,
                            style: {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!mounted || !account || !chain) {
                                return (
                                    <button
                                        onClick={openConnectModal}
                                        type="button"
                                        className="bg-primary px-4 py-2 font-bold hover:brightness-75"
                                    >
                                        Connect Wallet
                                    </button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <button
                                        onClick={openChainModal}
                                        type="button"
                                        className="bg-primary px-4 py-2 font-bold hover:brightness-75"
                                    >
                                        Switch Network
                                    </button>
                                );
                            }

                            return (
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button
                                        onClick={openAccountModal}
                                        type="button"
                                        className="text-primary flex items-center justify-center gap-4 px-4 py-2 font-bold hover:bg-neutral-800"
                                    >
                                        {account.ensName ? (
                                            <div className="text-right">
                                                <div>{account.ensName}</div>
                                                <div className="text-neutral-600 text-sm">
                                                    {account.address.substring(
                                                        0,
                                                        6
                                                    ) +
                                                        '...' +
                                                        account.address.substring(account.address.length - 4)}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>{account.displayName}</div>
                                        )}
                                        {account.ensAvatar && (
                                            <img
                                                src={account.ensAvatar}
                                                className="w-10 h-10 rounded-full shadow-lg"
                                            />
                                        )}
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};
