import { config as setupENV } from 'dotenv';
import {
    createClient,
    RediSearchSchema,
    SchemaFieldTypes,
    SchemaTextFieldPhonetics,
} from 'redis';

import { GrantProgram } from './grant.type';
import { log } from './logger';
import { RedisSearchLanguages } from '.pnpm/@redis+search@1.0.6_@redis+client@1.1.0/node_modules/@redis/search/dist/commands';

type GrantKeys = keyof GrantProgram;
type SearchSchema = RediSearchSchema[GrantKeys];
const IDX_GRANT = 'idx:grantz';

log.info('Loading ENV');
setupENV();

log.redis('Starting client');
(async () => {
    const redis = createClient({
        url: process.env.REDIS_URI || 'redis://localhost:6379',
    });

    log.redis('Connecting...');
    await redis.connect();

    log.redis('Gathering search index info');

    try {
        log.redis('Dropping index');
        redis.ft.DROPINDEX(IDX_GRANT);
    } catch {
        log.redis('No Index exists');
    }

    log.redis('Creating new Index');
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

    log.debug('rofl');

    log.info('Ready to roll!');
})();
