import useSWR from 'swr';
import { FC, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SubmitHandler, useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';

import { GrantProgram } from '../../../backend/src/grant.type';
import { GLOBALS } from '..';
import { useAccount, useNetwork, useSignTypedData } from 'wagmi';
import { Profile } from '../components/Profile';
import { SaveButton } from '../components/SaveButton';
import { DeleteButton } from '../components/DeleteButton';

import {generateSunflake } from 'sunflake';

const sunflake = generateSunflake();

export const AdminPostEditContainer: FC<{
    grant: GrantProgram | undefined;
}> = ({ grant }) => {
    const grant_id = useMemo(
        () => (grant && grant?.id ? grant.id : sunflake()),
        [grant?.id]
    );
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            id: grant_id,
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
        },
    });
    const nav = useNavigate();
    const accountData = useAccount();
    const isAdmin = useMemo(
        () =>
            accountData &&
            accountData.address &&
            GLOBALS.ADMINS.includes(accountData.address.toLowerCase())
                ? true
                : false,
        [accountData]
    );
    const { chain: activeChain } = useNetwork();
    const {
        data: _,
        signTypedDataAsync,
        isLoading: isSigning,
    } = useSignTypedData();

    const description = watch('description');

    const uploadData = useCallback(async (data: Record<string, unknown>) => {
        console.log('onSign', grant_id);
        const dataValue = {
            grant_id: data.id,
            grant_data: JSON.stringify(data),
        };

        const signature = await signTypedDataAsync({
            value: dataValue,
            domain: {
                chainId: activeChain?.id,
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
            data: dataValue,
        };

        // Inser fetch here
        const request = await fetch(GLOBALS.API_URL + '/update', {
            method: 'POST',
            body: JSON.stringify(message_data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(request);

        if (!request.ok) {
            alert('Error');
        } else {
            nav(-1);
        }
    }, []);
    const deleteData = useCallback(async () => {
        console.log('onSign', grant?.id);
        const dataValue = {
            grant_id,
            action: 'delete',
        };

        const signature = await signTypedDataAsync({
            value: dataValue,
            domain: {
                chainId: activeChain?.id,
                name: 'grantr.app',
                version: '1.0',
            },
            types: {
                GrantUpdateRequest: [
                    { name: 'grant_id', type: 'string' },
                    { name: 'action', type: 'string' },
                ],
            },
        });

        const message_data = {
            signature,
            data: dataValue,
        };

        // Inser fetch here
        const request = await fetch(GLOBALS.API_URL + '/delete', {
            method: 'POST',
            body: JSON.stringify(message_data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!request.ok) {
            alert('Error');
        } else {
            nav(-1);
        }
    }, []);

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-8 mt-8">
            <div className="flex-shrink flex-grow">
                <div className="grant-description my-4">
                    <ReactMarkdown children={description} />
                </div>
            </div>
            <div className="w-screen max-w-full lg:max-w-xl flex-grow p-4 border">
                <form
                    className="text-white"
                    onSubmit={handleSubmit(uploadData)}
                >
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
                        <input
                            className="text-2xl text-white bg-transparent"
                            type="text"
                            placeholder="Title"
                            {...register('name', { required: true })}
                        />
                        <SaveButton isAdmin={isAdmin} loading={isSigning} />
                        {isAdmin && grant && grant_id == grant.id && (
                            <DeleteButton
                                loading={isSigning}
                                onClick={deleteData}
                            />
                        )}
                    </div>

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
                            id="description"
                            rows={30}
                            className="w-full h-fit bg-transparent border p-4"
                            {...register('description', { required: true })}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export const AdminPostEdit: FC<{ isNew?: boolean }> = ({ isNew = false }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: grant } = useSWR(
        () => !isNew && `/api/get/${id}`,
        async () => {
            const request = await fetch(GLOBALS.API_URL + '/get?query=' + id);

            return (await request.json()) as GrantProgram;
        },
        { revalidateOnFocus: true }
    );

    return (
        <div className="max-w-screen w-full flex mx-auto px-4 py-12">
            <div className="max-w-7xl w-full mx-auto px-4">
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
