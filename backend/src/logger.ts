import { createLogger } from '@lvksh/logger';
import kleur from 'kleur';

export const log = createLogger(
    {
        info: {
            label: 'INFO',
        },
        redis: kleur.red('REDIS'),
        debug: {
            label: kleur.inverse(kleur.magenta(' DEBUG ')),
            tags: ['debug'],
        },
        express: {
            label: kleur.yellow('HTTP'),
        },
        error: 'ERROR',
    },
    {
        divider: kleur.reset(' | '),
        postProcessors: [(text) => text.map((txt) => kleur.gray(txt))],
        exclude: [process.env.ENVIRONMENT === 'production' ? 'debug' : ''],
    }
);
