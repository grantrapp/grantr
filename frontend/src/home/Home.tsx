import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { FC, useState } from 'react';
import useSWR from 'swr';

import { GLOBALS } from '..';
import { PoweredBy } from '../components/PoweredBy';
import { Profile } from '../components/Profile';
import { ListContainer } from './ListContainer';

export type FilterConfig = {
    tags: string[];
    ecosystem: string[];
};

export const SearchContainer: FC<{
    selected: string[];
    setSelected: (key: string, state: boolean) => void;
    categories: Record<string, string>;
}> = ({ selected, setSelected, categories }) => {
    return (
        <div className="col-span-12 lg:col-span-4">
            <div className="bg-primary">
                <div className="p-4 border-b-primary border-b-2 brightness-90">
                    <button
                        onClick={() =>
                            document.getElementById('search')?.focus()
                        }
                    >
                        <h1 className="font-bold">Search</h1>
                    </button>
                </div>
                <div className="p-4 flex flex-col items-start bg-primary grow-0">
                    {/*                         <h1 className="font-bold">Ecosystem</h1>
                        <div className="flex flex-col space-y-0.5">
                            {categories.map((category, index) => (
                                <div className="flex flex-row items-center space-x-1">
                                    <div
                                        className={`w-3 h-3 border-4 border-dark ${
                                            index % 2 ? 'bg-primary' : 'bg-dark'
                                        }`}
                                    ></div>
                                    <span className="tracking-wider">
                                        {category}
                                    </span>
                                </div>
                            ))}
                        </div> */}
                    <h1 className="font-bold">For</h1>
                    <div className="flex flex-col space-y-0.5">
                        {Object.keys(categories).map((key) => (
                            <div
                                key={key}
                                className="flex flex-row items-center space-x-1 select-none"
                                onClick={() => {
                                    setSelected(key, !selected.includes(key));
                                }}
                            >
                                <div
                                    className={`w-3 h-3 border-4 border-dark ${
                                        selected.includes(key)
                                            ? 'bg-primary'
                                            : 'bg-dark'
                                    }`}
                                />
                                <span className="tracking-wider">
                                    {categories[key]}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => {}}
                        className="text-sm px-4 py-2 bg-dark text-white self-end mt-4 focus:outline-2"
                    >
                        APPLY
                    </button>
                </div>
            </div>

            <a className="block w-full mt-4 p-4 text-center cursor-pointer hover:font-bold" style={{background: "#02e2ac"}} href="https://gitcoin.co/grants/6672/grantrapp" target="_blank">
                Support us on Gitcoin
            </a>

            <div className="p-4 flex justify-center items-center text-neutral-700">
                <PoweredBy />
            </div>
        </div>
    );
};

export const Inner: FC<{ categories: Record<string, string> }> = ({
    categories,
}) => {
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    return (
        <div className="lcontainer">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-4 p-2 flex flex-col items-center grow-0">
                    <h1 className="text-4xl font-bold text-primary">
                        GRANTR
                        <span className="text-lg brightness-75">.app</span>
                    </h1>
                    <div className="text-lg text-primary brightness-75">
                        Its a Grant thing
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-8 flex justify-end">
                    <Profile />
                </div>
                <SearchContainer
                    selected={selected}
                    setSelected={(key, state) => {
                        setSelected(
                            state
                                ? [...selected, key]
                                : selected.filter((entry) => entry != key)
                        );
                    }}
                    categories={categories}
                />
                <ListContainer
                    filters={{
                        tags: selected,
                        ecosystem: [],
                    }}
                />
            </div>
        </div>
    );
};

export const Home: FC = () => {
    const { data, error } = useSWR('/api/tags', async () => {
        const request = await fetch(GLOBALS.API_URL + '/tags');

        return (await request.json()) as Record<string, string>;
    });

    if (!data) {
        return <>Loading...</>;
    }

    return <Inner categories={data} />;
};
