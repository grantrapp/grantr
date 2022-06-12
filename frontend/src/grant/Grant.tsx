import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';

import { GrantProgram } from '../../../backend/src/grant.type';
import { GLOBALS } from '..';

export const Grant = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: grant, error } = useSWR(
        `/api/get/${id}`,
        async () => {
            const request = await fetch(GLOBALS.API_URL + `/get?query=${id}`);

            return (await request.json()) as GrantProgram;
        },
        { revalidateOnFocus: true }
    );

    return (
        <div>
            <div className="max-w-2xl mx-auto px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="text-primary flex flex-row items-center mb-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Back
                </button>
                {grant && (
                    <div>
                        <div className="p-4 border">
                            <div className="flex gap-4">
                                {grant.image_url && (
                                    <img
                                        src={grant.image_url}
                                        className="h-16 w-16 rounded"
                                    />
                                )}
                                <div className="flex flex-col justify-center flex-grow">
                                    <h1 className="text-2xl text-white">
                                        {grant.name}
                                    </h1>
                                    {grant.website && (
                                        <div className="text-white hover:underline brightness-75">
                                            <a
                                                href={grant.website}
                                                target="_blank"
                                            >
                                                {grant.website}
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <a
                                        target="_blank"
                                        href={grant.apply_url}
                                        className="flex flex-row items-center justify-center w-full py-2 px-4 rounded-md shadow-lg bg-primary font-bold text-xs hover:brightness-90"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                        </svg>
                                        APPLY
                                    </a>
                                </div>
                            </div>
                            <h2 className="text-lg text-gray-400">
                                {/* {grant.organization_id || '-'} */}
                            </h2>
                        </div>
                        <div className="grant-description my-4">
                            <ReactMarkdown children={grant.description} />
                        </div>
                        {grant.apply_url && (
                            <div className="flex">
                                <a
                                    target="_blank"
                                    href={grant.apply_url}
                                    className="flex flex-row items-center justify-center w-full py-2 rounded-full shadow-lg bg-primary font-bold hover:brightness-90"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                    </svg>
                                    APPLY
                                </a>
                            </div>
                        )}
                        <div className="p-4 flex justify-center items-center text-neutral-700">
                            Powered by&nbsp;<a href="https://grantr.app" className="hover:underline hover:text-white">Grantr.app</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
