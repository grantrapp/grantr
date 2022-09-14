import { FC } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';

import { GrantProgram } from '../../../backend/src/grant.type';
import { GLOBALS } from '..';

export const AdminPostList: FC = () => {
    const { data, error } = useSWR('/api/all', async () => {
        const request = await fetch(GLOBALS.API_URL + '/all');

        return (await request.json()) as { id: string; value: GrantProgram }[];
    });

    if (error) return <div>Error loading data</div>;

    if (!data) return <div>Loading...</div>;

    return (
        <>
            {data.map((program) => (
                <div
                    key={program.value.id}
                    className="w-full bg-primary p-4 flex justify-between mb-4 rounded-xl"
                >
                    <div>{program.value.name}</div>
                    <Link to={'/admin/' + program.value.id + '/edit'}>
                        EDIT
                    </Link>
                </div>
            ))}
        </>
    );
};
