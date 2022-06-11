import { Request, Response } from 'express';
import * as yup from 'yup';

import { Globals, redis } from '..';
import { log } from '../logger';

const ValidateSearch = yup.object({
    query: yup.string().required(),
    tags: yup.string(),
});

export const searchRoute = async (request: Request, response: Response) => {
    const data = request.query;

    try {
        const { query = '', tags = '' } = ValidateSearch.cast(data);

        const hasTags =
            tags && typeof tags === 'string' && tags.split(',').length > 0;

        const steve = hasTags
            ? (query ? query + '* ' : '') +
              `@tags:{${tags.split(',').join(' | ')}}`
            : `${query}*`;

        log.debug(steve);

        try {
            const search_data = await redis.ft.search(
                Globals.IDX_GRANT || '',
                steve,
                {
                    LIMIT: { size: Globals.MAX_RESULTS, from: 0 },
                }
            );

            response.send(search_data);

            return;
        } catch (error) {
            log.error('Redis Search', error as any);

            return;
        }
    } catch (error) {
        response.status(500).send();
        log.error(error as any);
    }
};
