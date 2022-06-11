import { FC, useState } from 'react';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

import { GrantProgram } from '../../../backend/src/grant.type';
import { GLOBALS } from '..';
import { GrantCard } from '../GrantCard';
import { FilterConfig } from './Home';

export const ListContainer: FC<{ filters: FilterConfig }> = ({ filters }) => {
    const [search, setSearch] = useState('');
    const [query] = useDebounce(search.length >= 3 ? search : '', 250, {});
    const { data, error: _error } = useSWR(
        query.length === 0 ? '/api/all' : '/api/search/' + query,
        async () => {
            if (query.length < 3 && query.length > 0) {
                return;
            }

            const request = await fetch(
                GLOBALS.API_URL +
                    (query.length === 0 ? '/all' : '/search?query=' + query)
            );

            return (await request.json()) as {
                total: number;
                documents: { id: string; value: GrantProgram }[];
            };
        }
    );

    return (
        <div className="col-span-12 lg:col-span-8 flex flex-col space-y-4">
            <input
                className="bg-dark text-white p-2 border-b-4 border-primary focus:outline-2"
                type="text"
                placeholder="Search..."
                onChange={(event) => {
                    setSearch(event.target.value.trim());
                }}
            />
            <div className="flex flex-col space-y-4">
                {data &&
                    data.total > 0 &&
                    data.documents.map((x) => (
                        <GrantCard x={x.value} key={x.id} filters={filters} />
                    ))}
                {(!data || data.total == 0) && (
                    <p className="text-neutral-500 text-center p-4">
                        No Grants matching your search
                    </p>
                )}
            </div>
        </div>
    );
};
