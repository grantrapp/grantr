import { Request, Response } from 'express';

import { redis } from '../..';
import { GrantProgram } from '../../grant.type';
import { log } from '../../logger';

const FETCH_VALUES: Set<keyof GrantProgram> = new Set<keyof GrantProgram>([
    'name',
    'id',
    'ecosystem',
    'description',
    'max_amount',
    'min_amount',
    'organization_id',
    'socials',
    'status',
    'tags',
    'website',
    'image_url',
    'apply_url',
    'currency',
    'whitepaper',
    'contact',
    'telegram',
    'discord',
    'twitter',
] as unknown as (keyof GrantProgram)[]);

export const getTagRoute = async (request: Request, response: Response) => {
    const data = request.query;

    if (typeof data['query'] !== 'string') {
        response.status(400).send('No Query');

        return;
    }

    const query = data['query'] as string;

    try {
        log.debug('Searching for ' + query);
        const exists = await redis.hExists('tags:' + query, 'name');

        if (!exists) {
            response.status(404).send('Not found');

            return;
        }

        const search_data = await redis.hGetAll('tags:' + query);

        log.debug(search_data);
        response.send(search_data);

        return;
    } catch (error) {
        log.error('Redis Get', error as any);

        response.status(500).send();
    }
};
