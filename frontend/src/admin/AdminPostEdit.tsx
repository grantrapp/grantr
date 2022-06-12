import useSWR from 'swr';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';

import { GrantProgram } from '../../../backend/src/grant.type';
import { GLOBALS } from '..';

export const AdminPostEditContainer: FC<{
    grant: GrantProgram;
}> = ({ grant }) => {
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            id: grant?.id ?? uuidv4(),
            name: grant?.name,
            organization_id: 1,
            description: grant?.description,
            tags: grant?.tags || '',
            min_amount: grant?.min_amount || '',
            max_amount: grant?.max_amount || '',
            currency: grant?.currency || '',
            apply_url: grant?.apply_url || '',
            image_url: grant?.image_url || '',
            website: grant?.website || '',
        } as Record<keyof GrantProgram, unknown>,
    });

    const description = watch('description');

    return (
        <form
            className="text-white"
            onSubmit={handleSubmit(async (data) => {
                console.log('success', data);
                // Inser fetch here
                const steve = await fetch(GLOBALS.API_URL + '/update', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer thissecretisverysecretandyouarereadingthis',
                    },
                });

                console.log(steve);

                if (!steve.ok) {
                    alert('Error');
                } else {
                    history.back();
                }
            })}
        >
            <input
                className="text-2xl text-white bg-transparent"
                type="text"
                placeholder="Title"
                {...register('name', { required: true })}
            />
            <h2 className="text-lg text-gray-400">
                {grant?.organization_id || '-'}
            </h2>
            <div>
                <p className="mb-2">Tags</p>
                <input
                    className="text-lg text-white bg-transparent w-full border p-2 mb-2"
                    type="text"
                    placeholder="Tags"
                    {...register('tags', { required: true })}
                />
            </div>
            <div>
                <p className="mb-2">Min Amount</p>
                <input
                    className="text-lg text-white bg-transparent w-full border p-2 mb-2"
                    type="number"
                    placeholder="min_amount"
                    {...register('min_amount', { required: false })}
                />
            </div>
            <div>
                <p className="mb-2">Max Amount</p>
                <input
                    className="text-lg text-white bg-transparent w-full border p-2 mb-2"
                    type="number"
                    placeholder="max_amount"
                    {...register('max_amount', { required: false })}
                />
            </div>
            <div>
                <p className="mb-2">Currency</p>
                <input
                    className="text-lg text-white bg-transparent w-full border p-2 mb-2"
                    type="text"
                    placeholder="currency"
                    {...register('currency', { required: false })}
                />
            </div>
            <div>
                <p className="mb-2">Website</p>
                <input
                    className="text-lg text-white bg-transparent w-full border p-2 mb-2"
                    type="url"
                    placeholder="website"
                    {...register('website', { required: false })}
                />
            </div>
            <div>
                <p className="mb-2">Image URL</p>
                <input
                    className="text-lg text-white bg-transparent w-full border p-2 mb-2"
                    type="url"
                    placeholder="image_url"
                    {...register('image_url', { required: false })}
                />
            </div>
            <div>
                <p className="mb-2">Apply URL</p>
                <input
                    className="text-lg text-white bg-transparent w-full border p-2 mb-2"
                    type="url"
                    placeholder="Apply URL"
                    {...register('apply_url', { required: false })}
                />
            </div>
            <div>
                <p className="mb-2">Description</p>
                <textarea
                    name="description"
                    id="description"
                    className="w-full h-fit bg-transparent border p-4"
                    {...register('description', { required: true })}
                />
            </div>
            <div className="grant-description my-4">
                <ReactMarkdown children={description} />
            </div>
            <div className="flex">
                <button
                    className="flex flex-row items-center justify-center w-full py-2 rounded-full shadow-lg bg-primary text-black font-bold hover:brightness-90 active:translate-y-1"
                    type="submit"
                >
                    SAVE
                </button>
            </div>
        </form>
    );
};

export const AdminPostEdit: FC<{ isNew?: boolean }> = ({ isNew = false }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: grant, error } = useSWR(
        () => !isNew && `/api/get/${id}`,
        async () => {
            const request = await fetch(GLOBALS.API_URL + '/get?query=' + id);

            return (await request.json()) as GrantProgram;
        },
        { revalidateOnFocus: true }
    );

    console.log(grant);

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
                {(isNew || grant) && <AdminPostEditContainer grant={grant} />}
            </div>
        </div>
    );
};
