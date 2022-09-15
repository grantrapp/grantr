import { verifyTypedData } from 'ethers/lib/utils';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { Globals, redis } from '../..';
import { log } from '../../logger';
import { fetchTags } from './list';

const tagsUpdateValidate = yup.object({
    data: yup
        .object({
            tag_key: yup.string().required(),
            tag_name: yup.string().required(),
        })
        .required(),
    signature: yup.string(),
});

export const tagsUpdateRoute = async (request: Request, response: Response) => {
    const toValidateData = await request.body;

    try {
        tagsUpdateValidate.validateSync(toValidateData);
    } catch (error) {
        log.error('Validation Error', error as any);
        response.status(400).send('Validation Error');

        return;
    }

    const validated = toValidateData as yup.InferType<
        typeof tagsUpdateValidate
    >;

    let public_address: string;

    try {
        public_address = verifyTypedData(
            {
                chainId: '1',
                name: 'grantr.app',
                version: '1.0',
            },
            {
                TagUpdateRequest: [
                    { name: 'tag_key', type: 'string' },
                    { name: 'tag_name', type: 'string' },
                ],
            },
            validated.data as unknown as Record<string, any>,
            validated.signature as unknown as string
        );
    } catch (error) {
        log.error('Signature Error', error as any);
        response.status(400).send('Signature Error');

        return;
    }

    if (!Globals.ADMINS.includes(public_address.toLowerCase())) {
        log.error('Unauthorized attempt to edit by', public_address);
        response.status(403).send('Unauthorized');

        return;
    }

    const { tag_key, tag_name } = validated.data;

    try {
        await redis.hSet('tags:' + tag_key, {
            name: tag_name,
        });
    } catch {
        log.error('Update Error');
        response.status(500).send('Update Error');

        return;
    }

    response.status(200).send('OK');

    fetchTags();
};
