import { FC } from 'react';

import { Twitter, GitHub } from 'react-feather';

export const PoweredBy: FC = () => {
    return (
        <div className="p-4 text-neutral-700 flex flex-col justify-center items-center gap-2">
            <div className="flex justify-center items-center">
                Powered by&nbsp;
                <a
                    href="https://grantr.app"
                    className="hover:underline hover:text-white"
                >
                    <div className="flex flex-row w-full justify-center items-center">
                        <h1 className="text-sm font-bold text-primary ">
                            GRANTR
                            <span className="text-xs brightness-75">.app</span>
                        </h1>
                    </div>
                </a>
            </div>
            <div className="text-sm flex gap-2">
                <a
                    href="https://github.com/grantrapp/grantr"
                    target="_blank"
                    className="hover:text-white"
                >
                    <GitHub size="20" />
                </a>
                <a
                    href="https://twitter.com/grantrapp"
                    target="_blank"
                    className="hover:text-white"
                >
                    <Twitter size="20" />
                </a>
            </div>
        </div>
    );
};
