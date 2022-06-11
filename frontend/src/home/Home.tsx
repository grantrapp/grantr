import { useEffect } from 'react';
import { FC, useState } from 'react';

import { ListContainer } from './ListContainer';

const categories = ['infrastructure'];

export type FilterConfig = {
    tags: string[];
    ecosystem: string[];
};

export const Home: FC = () => {
    const [selected, setSelected] = useState(
        Array.from({ length: categories.length }).fill(false)
    );

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    return (
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
            <div className="col-span-12 lg:col-span-8"></div>
            <div className="col-span-12 lg:col-span-4">
                <div className="bg-primary">
                    <div className="p-4 border-b-primary border-b-2 brightness-90">
                        <h1 className="font-bold">Search</h1>
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
                            {selected.map((isSelected, index) => (
                                <div
                                    key={''}
                                    className="flex flex-row items-center space-x-1"
                                    onClick={() => {
                                        const newSelected =
                                            Array.from(selected);
                                        newSelected[index] =
                                            !newSelected[index];
                                        setSelected(newSelected);
                                    }}
                                >
                                    <div
                                        className={`w-3 h-3 border-4 border-dark ${
                                            isSelected
                                                ? 'bg-primary'
                                                : 'bg-dark'
                                        }`}
                                    ></div>
                                    <span className="tracking-wider">
                                        {categories[index]}
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
            </div>
            <ListContainer
                filters={{
                    tags: categories.filter((_, index) => selected[index]),
                    ecosystem: [],
                }}
            />
        </div>
    );
};
