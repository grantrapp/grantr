import { FC } from 'react';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';

import { GrantProgram } from '../../../backend/src/grant.type';
import { GLOBALS } from '..';

export const AdminPostEditContainer: FC<{ grant: GrantProgram }> = ({
    grant,
}) => {
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            name: grant.name,
            organization_id: 1,
            description: grant.description,
        },
    });

    const description = watch('description');

    return (
        <form
            onSubmit={handleSubmit(async (data) => {
                console.log('success', data);
                // Inser fetch here
                const steve = await fetch(GLOBALS.API_URL, {
                    method: 'POST',
                    body: JSON.stringify(data),
                });

                console.log(steve);
            })}
        >
            <input
                className="text-2xl text-white bg-transparent"
                type="text"
                placeholder="Title"
                {...register('name', { required: true })}
            />
            <h2 className="text-lg text-gray-400">
                {grant.organization_id || '-'}
            </h2>
            <div className="grant-description my-4">
                <textarea
                    name="description"
                    id="description"
                    className="w-full h-fit bg-transparent border p-4"
                    {...register('description', { required: true })}
                />
                <ReactMarkdown children={description} />
            </div>
            <div className="flex">
                <button
                    className="flex flex-row items-center justify-center w-full py-2 rounded-full shadow-lg bg-primary font-bold hover:brightness-90 active:translate-y-1"
                    type="submit"
                >
                    SAVE
                </button>
            </div>
        </form>
    );
};

export const AdminPostEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: grant, error } = useSWR(
        '/api/get',
        async () => {
            const request = await fetch(GLOBALS.API_URL + '/get?query=' + id);

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
                {grant && <AdminPostEditContainer grant={grant} />}
            </div>
        </div>
    );
};
