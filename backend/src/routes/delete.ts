import { Request, Response } from 'express';
import * as yup from 'yup';

import { redis } from '..';
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

    try {
        await redis.del('grantz:' + raw_data);
    } catch {
        log.error('Deletion Error');
        response.status(500).send('Deletion Error');

        return;
    }

    response.status(200).send('OK');
};
