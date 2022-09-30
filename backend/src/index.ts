import bodyParser from 'body-parser';
import cors from 'cors';
import { config as setupENV } from 'dotenv';
import Express from 'express';
import {
    createClient,
    RediSearchSchema,
    SchemaFieldTypes,
    SchemaTextFieldPhonetics,
} from 'redis';

import { RedisSearchLanguages } from '../node_modules/@redis/search/dist/commands';
import { GrantProgram } from './grant.type';
import { log } from './logger';
import { allRoute } from './routes/all';
import { deleteRoute } from './routes/delete';
import { getRoute } from './routes/get';
import { searchRoute } from './routes/search';
import { tagsRouter } from './routes/tags';
import { fetchTags } from './routes/tags/list';
import { updateRoute } from './routes/update';

type GrantKeys = keyof GrantProgram;
type SearchSchema = RediSearchSchema[GrantKeys];
export const Globals = {
    IDX_GRANT: 'idx:grantz',
    MAX_RESULTS: 1000,
    ADMINS: [
        '0x225f137127d9067788314bc7fcc1f36746a3c3b5', // lucemans.eth
        '0x347f5f182d4b3043e44ff728fec6d72b23457fc8', // defigirlxo.eth
        '0xf19e71fdaba5c2916a9cfae87fdaf12516e3119f',
    ],
};

log.info('Loading ENV');
setupENV();

log.redis('Starting client');
export const redis = createClient({
    url: process.env.REDIS_URI || 'redis://localhost:6379',
});

(async () => {
    log.debug(process.env.ADMIN_KEY);

    log.redis('Connecting...');
    await redis.connect();

    log.redis('Gathering search index info');

    try {
        log.redis('Dropping index');
        redis.ft.DROPINDEX(Globals.IDX_GRANT);
    } catch {
        log.redis('No Index exists');
    }

    log.redis('Creating new Index');
    redis.ft.CREATE(
        Globals.IDX_GRANT,
        {
            id: {
                type: SchemaFieldTypes.TEXT,
                SORTABLE: 'UNF',
                NOSTEM: true,
            },
            name: {
                type: SchemaFieldTypes.TEXT,
                SORTABLE: true,
                WEIGHT: 10,
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
            tags: {
                type: SchemaFieldTypes.TAG,
                SEPARATOR: ',',
                SORTABLE: 'UNF',
            },
            hit: {
                type: SchemaFieldTypes.NUMERIC,
                SORTABLE: true,
            },
            currency: {
                type: SchemaFieldTypes.TEXT,
            },
        } as Partial<Record<GrantKeys, SearchSchema>>,
        {
            LANGUAGE: RedisSearchLanguages.ENGLISH,
            ON: 'HASH',
            PREFIX: 'grantz:',
        }
    );

    log.express('Starting...');

    const server = Express();

    server.use(cors());
    server.use(bodyParser.json());

    server.get('/', (_request, response) => {
        response.send('Grantr Alpha v1.0');
    });

    server.get('/search', searchRoute);
    server.get('/all', allRoute);
    server.use('/tags', tagsRouter);
    server.post('/update', updateRoute);
    server.get('/get', getRoute);
    server.post('/delete', deleteRoute);

    fetchTags();

    log.express('Listening to port 3000');

    await new Promise<void>((accept) => server.listen(3000, accept));

    log.info('Ready to roll!');
})();
