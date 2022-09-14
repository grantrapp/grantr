import { FC, useState } from 'react';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

import { GrantProgram } from '../../../backend/src/grant.type';
import { GLOBALS } from '..';
import { GrantCard } from './GrantCard';
import { FilterConfig } from './Home';

export const ListContainer: FC<{ filters: FilterConfig }> = ({ filters }) => {
    const [search, setSearch] = useState('');
    const [query] = useDebounce(search.length >= 3 ? search : '', 250, {});
    const seeking = query.length > 2 || filters.tags.length > 0;

    const { data, error: _error } = useSWR(
        seeking ? `/api/search/${query}/${filters.tags.join(',')}` : '/api/all',
        async () => {
            const request = await fetch(
                GLOBALS.API_URL +
                    (seeking
                        ? `/search?query=${encodeURIComponent(
                              query
                          )}&tags=${encodeURIComponent(filters.tags.join(','))}`
                        : '/all')
            );

            return (await request.json()) as { id: string; value: GrantProgram }[];
        }
    );

    return (
        <div className="col-span-12 lg:col-span-8 flex flex-col space-y-4">
            <input
                id="search"
                className="bg-dark text-white p-2 border-b-4 border-primary focus:outline-2"
                type="text"
                placeholder="Search..."
                onChange={(event) => {
                    setSearch(event.target.value.trim());
                }}
            />
            <div className="flex flex-col space-y-4">
                {data &&
                    data.length > 0 &&
                    data.map((x) => (
                        <GrantCard x={x.value} key={x.id} filters={filters} />
                    ))}
                {(!data || data.length == 0) && (
                    <p className="text-neutral-500 text-center p-4">
                        No grants matching your search
                    </p>
                )}
            </div>
        </div>
    );
};
