import { Request, Response } from 'express';

const HARDCODED_precompute = [
    'Devs',
    'Researchers',
    'Infrastructure',
    'Universal Tools',
    'Dapps',
    'DAOs',
    'Community Building/Content Creation',
    'Events/Hackathons',
];

const HARDCODED_list = Object.assign(
    {},
    ...HARDCODED_precompute.map((value) => ({
        [value.toLowerCase().replace(/[^'a-z]/g, '')]: value,
    }))
);

export const tagListRoute = async (request: Request, response: Response) => {
    response.status(200).send(HARDCODED_list);
};
