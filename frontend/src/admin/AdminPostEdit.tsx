import useSWR from 'swr';
import { FC, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SubmitHandler, useForm, UseFormHandleSubmit } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';

import { GrantProgram } from '../../../backend/src/grant.type';
import { GLOBALS } from '..';
import { useAccount, useNetwork, useSignTypedData } from 'wagmi';
import { Profile } from '../components/Profile';
import { SaveButton } from './SaveButton';
import { Buffer } from 'buffer';

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
    const { data: accountData } = useAccount();
    const isAdmin = useMemo(
        () =>
            accountData &&
            accountData.address &&
            GLOBALS.ADMINS.includes(accountData.address.toLowerCase()),
        [accountData]
    );
    const { activeChain } = useNetwork();
    const {
        data: signedData,
        signTypedDataAsync,
        isLoading: isSigning,
        status,
    } = useSignTypedData();

    const description = watch('description');

    const uploadData = useCallback(
        (async (data) => {
            console.log('onSign', data);
            const dataValue = {
                grant_id: grant.id,
                grant_data: JSON.stringify(data),
            }

            const signature = await signTypedDataAsync({
                value: dataValue,
                domain: {
                    chainId: activeChain.id,
                    name: 'grantr.app',
                    version: '1.0',
                },
                types: {
                    GrantUpdateRequest: [
                        { name: 'grant_id', type: 'string' },
                        { name: 'grant_data', type: 'string' },
                    ],
                },
            });

            const message_data = {
                signature,
                data: dataValue
            };

            // Inser fetch here
            const steve = await fetch(GLOBALS.API_URL + '/update', {
                method: 'POST',
                body: JSON.stringify(message_data),
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
        }) as SubmitHandler<Record<keyof GrantProgram, unknown>>,
        []
    );

    return (
        <form className="text-white" onSubmit={handleSubmit(uploadData)}>
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
                <ReactMarkdown children={description as string} />
            </div>
            <div className="flex">
                <SaveButton isAdmin={isAdmin} loading={isSigning} />
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
                <div className="flex justify-between">
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
                    <Profile />
                </div>
                {(isNew || grant) && <AdminPostEditContainer grant={grant} />}
            </div>
        </div>
    );
};
