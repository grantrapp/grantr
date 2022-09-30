import { FC } from 'react';
import { Link } from 'react-router-dom';

import { AdminTagList } from './AdminTagList';

export const Tags: FC = () => {
    return (
        <div className="lcontainer">
            <div className="max-w-2xl mx-auto px-4">
                <div className="border-b border-neutral-500 w-full mb-4 flex items-center justify-between">
                    <div className="text-2xl mb-4 text-primary">
                        Secret Tag Menu
                    </div>
                    <div className="flex gap-2">
                        <Link
                            className="bg-primary py-1 px-2 rounded-lg"
                            to={'/admin'}
                        >
                            POSTS
                        </Link>
                        <Link
                            className="bg-primary py-1 px-2 rounded-lg"
                            to={'/admin/tags/new'}
                        >
                            NEW
                        </Link>
                    </div>
                </div>
                <div className="w-full">
                    <AdminTagList />
                </div>
            </div>
        </div>
    );
};
