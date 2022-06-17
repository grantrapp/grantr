import { ButtonHTMLAttributes, FC } from 'react';
import { Spinner } from './Spinner';

export const DeleteButton: FC<
    { loading: boolean } & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ loading, ...props }) => {
    return (
        <button
            className="p-4 bg-red-500 brightness-75 hover:brightness-100 focus:brightness-100 rounded-full aspect-square w-16 flex items-center justify-center text-center"
            type="button"
            {...props}
        >
            {loading ? <Spinner /> : <span className="absolute">x</span>}
        </button>
    );
};
