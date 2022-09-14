import { verifyTypedData } from 'ethers/lib/utils';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { Globals, redis } from '..';
import { log } from '../logger';

const GrantDeleteValidate = yup.object({
    data: yup
        .object({
            grant_id: yup.string(),
        })
        .required(),
    signature: yup.string(),
});

export const deleteRoute = async (request: Request, response: Response) => {
    const toValidateData = await request.body;

    try {
        GrantDeleteValidate.validateSync(toValidateData);
    } catch (error) {
        log.error('Validation Error', error as any);
        response.status(400).send('Validation Error');

        return;
    }

    const validated = toValidateData as yup.InferType<
        typeof GrantDeleteValidate
    >;

    const raw_data = validated.data.grant_id;

    let public_address: string;

    try {
        public_address = verifyTypedData(
            {
                chainId: '1',
                name: 'grantr.app',
                version: '1.0',
            },
            {
                GrantUpdateRequest: [
                    { name: 'grant_id', type: 'string' },
                    { name: 'grant_data', type: 'string' },
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

    try {
        await redis.del('grantz:' + raw_data);
    } catch {
        log.error('Deletion Error');
        response.status(500).send('Deletion Error');

        return;
    }

    response.status(200).send('OK');
};
