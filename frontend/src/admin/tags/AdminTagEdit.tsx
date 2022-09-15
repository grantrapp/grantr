import useSWR from 'swr';
import { FC, useCallback, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Tag } from '../../../../backend/src/tag.type';

import { useAccount, useNetwork, useSignTypedData } from 'wagmi';
import { GLOBALS } from '../..';
import { DeleteButton } from '../../components/DeleteButton';
import { Profile } from '../../components/Profile';
import { SaveButton } from '../../components/SaveButton';

export const AdminTagEditContainer: FC<{
    tag: Tag | undefined;
}> = ({ tag }) => {
    const tagKey = tag?.key;
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            tag_key: tagKey,
            tag_name: tag?.name,
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
        data: signedData,
        signTypedDataAsync,
        isLoading: isSigning,
        status,
    } = useSignTypedData();

    const uploadData = useCallback(async (data: Record<string, unknown>) => {
        console.log('onSign', tagKey);
        const dataValue = {
            tag_key: data.tag_key,
            tag_name: data.tag_name,
        };

        const signature = await signTypedDataAsync({
            value: dataValue,
            domain: {
                chainId: activeChain?.id,
                name: 'grantr.app',
                version: '1.0',
            },
            types: {
                TagUpdateRequest: [
                    { name: 'tag_key', type: 'string' },
                    { name: 'tag_name', type: 'string' },
                ],
            },
        });

        const message_data = {
            signature,
            data: dataValue,
        };

        const steve = await fetch(GLOBALS.API_URL + '/tags/update', {
            method: 'POST',
            body: JSON.stringify(message_data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!steve.ok) {
            alert('Error');
        } else {
            nav(-1);
        }
    }, []);
    const deleteData = useCallback(async () => {
        console.log('onSign', tagKey);
        const dataValue = {
            tag_key: tagKey,
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
                TagDeleteRequest: [{ name: 'tag_key', type: 'string' }],
            },
        });

        const message_data = {
            signature,
            data: dataValue,
        };

        // Inser fetch here
        const steve = await fetch(GLOBALS.API_URL + '/tags/delete', {
            method: 'POST',
            body: JSON.stringify(message_data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(steve);

        if (!steve.ok) {
            alert('Error');
        } else {
            nav(-1);
        }
    }, []);

    console.log({ tagKey });

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-8 mt-8">
            <div className="w-screen max-w-full lg:max-w-xl flex-grow p-4 border mx-auto">
                <form
                    className="text-white"
                    onSubmit={handleSubmit(uploadData)}
                >
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
                        <input
                            className="text-2xl text-white bg-transparent"
                            type="text"
                            placeholder="Enter Key"
                            disabled={!!tagKey}
                            {...register('tag_key', { required: true })}
                        />
                        <SaveButton isAdmin={isAdmin} loading={isSigning} />
                        {isAdmin && tag && tagKey == tag.key && (
                            <DeleteButton
                                loading={isSigning}
                                onClick={deleteData}
                            />
                        )}
                    </div>

                    <div>
                        <p className="mb-2">Name</p>
                        <input
                            className="text-lg text-white bg-transparent w-full border p-2 mb-2"
                            type="text"
                            placeholder="Name"
                            {...register('tag_name', { required: true })}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export const AdminTagEdit: FC<{ isNew?: boolean }> = ({ isNew = false }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: tag, error } = useSWR(
        () => !isNew && `/api/tags/get/${id}`,
        async () => {
            const request = await fetch(
                GLOBALS.API_URL + '/tags/get?query=' + id
            );

            return (await request.json()) as Tag;
        },
        { revalidateOnFocus: true }
    );

    console.log({ tag });

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
                {(isNew || tag) && <AdminTagEditContainer tag={tag} />}
            </div>
        </div>
    );
};
