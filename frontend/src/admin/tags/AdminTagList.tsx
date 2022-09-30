import { FC } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { GLOBALS } from '../..';
import { GrantProgram } from '../../../../backend/src/grant.type';
import { Tag } from '../../../../backend/src/tag.type';

export const AdminTagList: FC = () => {
    const { data, error } = useSWR('/api/tags/list', async () => {
        const request = await fetch(GLOBALS.API_URL + '/tags/list');

        return (await request.json()) as Record<string, Tag>;
    });

    if (error) return <div>Error loading data</div>;

    if (!data) return <div>Loading...</div>;

    return (
        <>
            {Object.entries(data).map(([key, tag]) => (
                <div
                    key={key}
                    className="w-full bg-primary p-4 flex justify-between mb-4 rounded-xl"
                >
                    <div>
                        {tag.name}
                        <span className="text-sm opacity-70 pl-1">({key})</span>
                    </div>
                    <Link to={'/admin/tags/' + key + '/edit'}>EDIT</Link>
                </div>
            ))}
        </>
    );
};
