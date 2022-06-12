import { FC } from 'react';

import { AdminPostList } from './AdminPostList';

export const Admin: FC = () => {
    return (
        <div className="max-w-2xl mx-auto px-4">
            <div className="border-b border-neutral-500 w-full mb-4">
                <div className="text-2xl mb-4 text-primary">
                    Secret DefiGirl Menu
                </div>
            </div>
            <div className="w-full">
                <AdminPostList />
            </div>
        </div>
    );
};
