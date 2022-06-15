import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FC, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { GLOBALS } from '..';
import { cx } from '../lib/cx';

export const AdminCrown: FC = () => {
    return (
        <svg
            version="1.0"
            id="crown"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 267.5 267.5"
            className="w-4 h-4 fill-primary inline-block ml-1 mb-1"
        >
            <path
                d="M256.975,100.34c0.041,0.736-0.013,1.485-0.198,2.229l-16.5,66c-0.832,3.325-3.812,5.663-7.238,5.681l-99,0.5
        c-0.013,0-0.025,0-0.038,0H35c-3.444,0-6.445-2.346-7.277-5.688l-16.5-66.25c-0.19-0.764-0.245-1.534-0.197-2.289
        C4.643,98.512,0,92.539,0,85.5c0-8.685,7.065-15.75,15.75-15.75S31.5,76.815,31.5,85.5c0,4.891-2.241,9.267-5.75,12.158
        l20.658,20.814c5.221,5.261,12.466,8.277,19.878,8.277c8.764,0,17.12-4.162,22.382-11.135l33.95-44.984
        C119.766,67.78,118,63.842,118,59.5c0-8.685,7.065-15.75,15.75-15.75s15.75,7.065,15.75,15.75c0,4.212-1.672,8.035-4.375,10.864
        c0.009,0.012,0.02,0.022,0.029,0.035l33.704,45.108c5.26,7.04,13.646,11.243,22.435,11.243c7.48,0,14.514-2.913,19.803-8.203
        l20.788-20.788C238.301,94.869,236,90.451,236,85.5c0-8.685,7.065-15.75,15.75-15.75s15.75,7.065,15.75,15.75
        C267.5,92.351,263.095,98.178,256.975,100.34z M238.667,198.25c0-4.142-3.358-7.5-7.5-7.5h-194c-4.142,0-7.5,3.358-7.5,7.5v18
        c0,4.142,3.358,7.5,7.5,7.5h194c4.142,0,7.5-3.358,7.5-7.5V198.25z"
            />
        </svg>
    );
};

export const Profile = () => {
    const { data } = useAccount();
    const isAdmin = useMemo(
        () =>
            data &&
            data.address &&
            GLOBALS.ADMINS.includes(data.address.toLowerCase()),
        [data]
    );

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
                                        className={cx(
                                            'flex items-center justify-center gap-4 px-4 py-2 font-bold hover:bg-neutral-800',
                                            isAdmin
                                                ? 'text-primary'
                                                : 'text-white'
                                        )}
                                    >
                                        {account.ensName ? (
                                            <div className="text-right">
                                                <div>
                                                    {account.ensName}
                                                    {isAdmin && <AdminCrown />}
                                                </div>
                                                <div className="text-neutral-600 text-sm">
                                                    {account.address.substring(
                                                        0,
                                                        6
                                                    ) +
                                                        '...' +
                                                        account.address.substring(
                                                            account.address
                                                                .length - 4
                                                        )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                {account.displayName}{' '}
                                                {isAdmin && <AdminCrown />}
                                            </div>
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
