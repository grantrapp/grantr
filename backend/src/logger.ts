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
        },
        error: 'ERROR',
    },
    {
        divider: kleur.reset(' | '),
        postProcessors: [(text) => text.map((txt) => kleur.gray(txt))],
    }
);
