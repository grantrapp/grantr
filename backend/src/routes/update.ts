import { Request, Response } from 'express';
import * as yup from 'yup';

import { redis } from '..';
import { log } from '../logger';

const GrantProgramValidate = yup.object({
    id: yup.string().required(),
    name: yup.string(),
    organization_id: yup.string(),
    status: yup.string(),
    min_amount: yup.string(),
    max_amount: yup.string(),
    tags: yup.string(),
    description: yup.string(),
    website: yup.string(),
    ecosystem: yup.string(),
    socials: yup.object(),
});

export const updateRoute = async (request: Request, response: Response) => {
    const bearer = request.header('authorization');

    if (bearer !== 'Bearer ' + process.env.ADMIN_KEY) {
        response.status(403).send('Unauthorized');

        return;
    }

    const toValidateData = await request.body;

    try {
        GrantProgramValidate.validateSync(toValidateData);
    } catch (error) {
        log.error('Validation Error', error as any);
        response.status(400).send('Validation Error');

        return;
    }

    const data = toValidateData as yup.InferType<typeof GrantProgramValidate>;

    const doesExist = await redis.EXISTS('grantz:' + data.id);

    for (const key of Object.keys(data)) {
        await redis.hSet(
            'grantz:' + data.id,
            key as string,
            data[key as keyof typeof data] as string
        );
    }

    log.debug({ doesExist });

    response.status(200).send();
};
