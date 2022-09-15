import { verifyTypedData } from 'ethers/lib/utils';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { Globals, redis } from '../..';
import { log } from '../../logger';
import { fetchTags } from './list';

const TagDeleteValidate = yup.object({
    data: yup
        .object({
            tag_key: yup.string(),
        })
        .required(),
    signature: yup.string(),
});

export const tagsDeleteRoute = async (request: Request, response: Response) => {
    const toValidateData = await request.body;

    try {
        TagDeleteValidate.validateSync(toValidateData);
    } catch (error) {
        log.error('Validation Error', error as any);
        response.status(400).send('Validation Error');

        return;
    }

    const validated = toValidateData as yup.InferType<typeof TagDeleteValidate>;

    let public_address: string;

    try {
        public_address = verifyTypedData(
            {
                chainId: '1',
                name: 'grantr.app',
                version: '1.0',
            },
            {
                TagDeleteRequest: [{ name: 'tag_key', type: 'string' }],
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

    const { tag_key } = validated.data;

    try {
        await redis.del('tags:' + tag_key);
    } catch {
        log.error('Deletion Error');
        response.status(500).send('Deletion Error');

        return;
    }

    response.status(200).send('OK');

    fetchTags();
};
