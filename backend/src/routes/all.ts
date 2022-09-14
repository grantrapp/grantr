import { Request, Response } from 'express';

import { redis } from '..';
import { log } from '../logger';
import { GrantProgram } from './../grant.type';

export const allRoute = async (request: Request, response: Response) => {
    try {
        const keys = await redis.keys('grantz:*');

        const grants: {
            id: string;
            value: Partial<GrantProgram>;
        }[] = [];

        for (const key of keys) {
            const grant = await redis.hGetAll(key);

            grants.push({
                id: key,
                value: grant,
            });
        }

        response.send(grants);

        return;
    } catch (error) {
        log.error('Redis Search', error as any);
    }

    response.status(500).send();
};
