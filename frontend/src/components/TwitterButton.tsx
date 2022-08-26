import { FC } from 'react';
import { Twitter } from 'react-feather';

export const TwitterButton: FC = () => {
    return (
        <a
            href="https://twitter.com/@grantrapp"
            target="_blank"
            className="px-4 py-2 text-white bg-twitter flex items-center gap-4 rounded-md mt-4 hover:brightness-90"
        >
            Stay updated on Twitter
            <Twitter />
        </a>
    );
};
