import { FC } from 'react';
import { Link } from 'react-router-dom';

import { AdminPostList } from './AdminPostList';

export const Admin: FC = () => {
    return (
        <div className="lcontainer">
            <div className="max-w-2xl mx-auto px-4">
                <div className="border-b border-neutral-500 w-full mb-4 flex items-center justify-between">
                    <div className="text-2xl mb-4 text-primary">
                        Secret DefiGirl Menu
                    </div>
                    <Link
                        className="bg-primary py-1 px-2 rounded-lg"
                        to={'/admin/new'}
                    >
                        NEW
                    </Link>
                </div>
                <div className="w-full">
                    <AdminPostList />
                </div>
            </div>
        </div>
    );
};
