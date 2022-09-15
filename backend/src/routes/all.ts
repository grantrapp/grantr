import { Request, Response } from 'express';

import { Globals, redis } from '..';
import { log } from '../logger';

export const allRoute = async (request: Request, response: Response) => {
    try {
        //@ts-ignore
        const search_data = await redis.ft.search(Globals.IDX_GRANT, '*', {
            LIMIT: { size: Globals.MAX_RESULTS, from: 0 },
            SORTBY: { BY: 'hit', DIRECTION: 'DESC' },
        });

        response.send(search_data);

        return;
    } catch (error) {
        log.error('Redis Search', error as any);
    }

    response.status(500).send();
};
