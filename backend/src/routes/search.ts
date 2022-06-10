import { Request, Response } from 'express';

import { Globals, redis } from '..';
import { log } from '../logger';

export const searchRoute = async (request: Request, response: Response) => {
    const data = request.query;

    if (typeof data['query'] !== 'string') {
        response.status(400).send('No Query');

        return;
    }

    const query = data['query'] as string;

    try {
        const search_data = await redis.ft.search(Globals.IDX_GRANT, query, {
            LIMIT: { size: Globals.MAX_RESULTS, from: 0 },
        });

        response.send(search_data);

        return;
    } catch (error) {
        log.error('Redis Search', error as any);
    }

    response.status(500).send();
};
