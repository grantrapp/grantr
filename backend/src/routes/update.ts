import { verifyTypedData } from 'ethers/lib/utils';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { Globals, redis } from '..';

import { log } from '../logger';

const GrantProgramValidate = yup.object({
    id: yup.string().required(),
    name: yup.string(),
    organization_id: yup.string(),
    status: yup.string(),
    min_amount: yup.string(),
    max_amount: yup.string(),
    currency: yup.string(),
    tags: yup.string(),
    description: yup.string(),
    website: yup.string(),
    ecosystem: yup.string(),
    socials: yup.object(),
});

const GrantUpdateValidate = yup.object({
    data: yup
        .object({
            grant_data: yup.string(),
            grant_id: yup.string(),
        })
        .required(),
    signature: yup.string(),
});

export const updateRoute = async (request: Request, response: Response) => {
    const toValidateData = await request.body;

    try {
        GrantUpdateValidate.validateSync(toValidateData);
    } catch (error) {
        log.error('Validation Error', error as any);
        response.status(400).send('Validation Error');

        return;
    }

    const validated = toValidateData as yup.InferType<
        typeof GrantUpdateValidate
    >;

    const raw_data = validated.data.grant_data;

    try {
        const json_data = JSON.parse(raw_data as any as string);

        GrantProgramValidate.validateSync(json_data);
    } catch (error) {
        log.error('Validation Error', error as any);
        response.status(400).send('Validation Error');

        return;
    }

    let parsed_data: yup.InferType<typeof GrantProgramValidate>;

    try {
        parsed_data = JSON.parse(validated.data.grant_data as string);
    } catch {
        log.error('JSON Error');
        response.status(400).send('JSON Error');

        return;
    }

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

    const doesExist = await redis.EXISTS('grantz:' + parsed_data.id);

    if (!doesExist) {
        log.error('Does not exist', parsed_data.id);
        response.status(404).send('Not found');

        return;
    }

    for (const key of Object.keys(parsed_data)) {
        await redis.hSet(
            'grantz:' + parsed_data.id,
            key as string,
            parsed_data[key as keyof typeof parsed_data] as string
        );
    }

    response.status(200).send('OK');
};
