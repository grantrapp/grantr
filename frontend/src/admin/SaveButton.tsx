import { FC } from 'react';
import { Spinner } from '../components/Spinner';

export const SaveButton: FC<{ isAdmin: boolean; loading: boolean }> = ({
    isAdmin,
    loading,
}) => {
    return (
        <button
            className="flex flex-row items-center justify-center w-full py-2 rounded-full shadow-lg bg-primary text-black font-bold hover:brightness-90 active:translate-y-1 disabled:brightness-75"
            type="submit"
            disabled={!isAdmin}
        >
            {loading ? <Spinner /> : isAdmin ? 'SAVE' : 'No Permission'}
        </button>
    );
};
