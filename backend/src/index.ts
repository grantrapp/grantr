import { config as setupENV } from 'dotenv';
import {
    createClient,
    RediSearchSchema,
    SchemaFieldTypes,
    SchemaTextFieldPhonetics,
} from 'redis';

import { GrantProgram } from './grant.type';
import { logger } from './logger';
import { RedisSearchLanguages } from '.pnpm/@redis+search@1.0.6_@redis+client@1.1.0/node_modules/@redis/search/dist/commands';

type GrantKeys = keyof GrantProgram;
type SearchSchema = RediSearchSchema[GrantKeys];
const IDX_GRANT = 'idx:grantz';

logger.info('Loading ENV');
setupENV();

logger.redis('Starting client');
(async () => {
    const redis = createClient({
        url: process.env.REDIS_URI || 'redis://localhost:6379',
    });

    logger.redis('Connecting...');
    await redis.connect();

    logger.redis('Gathering search index info');

    try {
        logger.redis('Dropping index');
        redis.ft.DROPINDEX(IDX_GRANT);
    } catch {
        logger.redis('No Index exists');
    }

    logger.redis('Creating new Index');
    redis.ft.CREATE(
        IDX_GRANT,
        {
            id: {
                type: SchemaFieldTypes.TEXT,
                SORTABLE: 'UNF',
                NOSTEM: true,
            },
            name: {
                type: SchemaFieldTypes.TEXT,
                SORTABLE: true,
                PHONETIC: SchemaTextFieldPhonetics.DM_EN,
            },
            organization_id: {
                type: SchemaFieldTypes.NUMERIC,
                SORTABLE: 'UNF',
            },
            description: {
                type: SchemaFieldTypes.TEXT,
                SORTABLE: 'UNF',
                PHONETIC: SchemaTextFieldPhonetics.DM_EN,
            },
        } as Partial<Record<GrantKeys, SearchSchema>>,
        {
            LANGUAGE: RedisSearchLanguages.ENGLISH,
            ON: 'HASH',
            PREFIX: 'grantz:',
        }
    );

    logger.info('Ready to roll!');
})();
