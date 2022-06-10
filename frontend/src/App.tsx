import { FC, useState } from 'react';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

import { GrantProgram } from '../../backend/src/grant.type';

const categories = ['DEVS', 'INFRASTRUCTURE'];

const RANDOM_GRANT = {
    org: 'FTX',
    name: 'FTX Future Fund',
    tags: ['Researchers', 'Devs', 'Public Goods', 'Academics'],
    amountMin: 50,
    amountMax: 1000,
};

const GrantCard: FC<{ x: GrantProgram }> = ({ x }) => {
    return (
        <a
            className="p-2 bg-primary hover:brightness-110 cursor-pointer text-gray-900 focus:outline-2"
            href="#"
        >
            <div className="cursor-pointer mb-1">
                <span className="font-bold">{x.name}</span>
                <div className="flex flex-row items-center space-x-2">
                    <div className="flex flex-row items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 opacity-50"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-xs ml-0.5">
                            {x.organization_id}
                        </span>
                    </div>
                    <div className="flex flex-row items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 opacity-50"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-xs ml-0.5">{`$${x.min_amount} - $${x.max_amount}`}</span>
                    </div>{' '}
                </div>
            </div>
            <div className="flex flex-row items-center space-x-1">
                <div className="bg-gray-900 text-white px-1 text-xs">DEVS</div>
                {/* opacity-50 when tags don't match filtered tag */}
                <div className="bg-gray-900 opacity-50 text-white px-1 text-xs">
                    INFRASTRUCTURE
                </div>
                <span className="text-gray-900 font-bold text-xs">+ 5</span>
            </div>
        </a>
    );
};

export const ListContainer: FC = () => {
    const [search, setSearch] = useState('');
    const [query] = useDebounce(search.length >= 3 ? search : '', 250, {});
    const { data, error } = useSWR(
        query.length === 0 ? '/api/all' : '/api/search/' + query,
        async () => {
            if (query.length < 3 && query.length > 0) {
                return;
            }

            const request = await fetch(
                query.length === 0
                    ? 'http://localhost:3000/all'
                    : 'http://localhost:3000/search?query=' + query
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
                        <GrantCard x={x.value} key={x.id} />
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

export const App = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-4 p-2 flex flex-col items-center grow-0">
                    <h1 className="text-4xl font-bold text-primary">
                        GRANTR
                        <span className="text-lg brightness-75">.app</span>
                    </h1>
                </div>
                <div className="col-span-12 lg:col-span-8"></div>
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-primary">
                        <div className="p-4 border-b-primary border-b-2 brightness-90">
                            <h1 className="font-bold">Search</h1>
                        </div>
                        <div className="p-4 flex flex-col items-start bg-primary grow-0">
                            <h1 className="font-bold">Ecosystem</h1>
                            <div className="flex flex-col space-y-0.5">
                                {categories.map((category, index) => (
                                    <div className="flex flex-row items-center space-x-1">
                                        <div
                                            className={`w-3 h-3 border-4 border-dark ${
                                                index % 2
                                                    ? 'bg-primary'
                                                    : 'bg-dark'
                                            }`}
                                        ></div>
                                        <span className="tracking-wider">
                                            {category}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <h1 className="font-bold">For</h1>
                            <div className="flex flex-col space-y-0.5">
                                {categories.map((category, index) => (
                                    <div className="flex flex-row items-center space-x-1">
                                        <div
                                            className={`w-3 h-3 border-4 border-dark ${
                                                index % 2
                                                    ? 'bg-primary'
                                                    : 'bg-dark'
                                            }`}
                                        ></div>
                                        <span className="tracking-wider">
                                            {category}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <button className="text-sm px-4 py-2 bg-dark text-white self-end mt-4 focus:outline-2">
                                APPLY
                            </button>
                        </div>
                    </div>
                </div>
                <ListContainer />
            </div>
        </div>
    );
};
