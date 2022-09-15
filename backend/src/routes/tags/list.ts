import { Request, Response } from 'express';

import { redis } from '../..';

// const HARDCODED_precompute: string[] = [];

// const HARDCODED_list = Object.assign(
//     {},
//     ...HARDCODED_precompute.map((value) => ({
//         [value.toLowerCase().replace(/[^'a-z]/g, '')]: value,
//     }))
// );

const tagList: Record<string, Record<string, string>> = {};

export const fetchTags = async () => {
    const tags = await redis.keys('tags:*');

    for (const tag of tags) {
        const tagData = await redis.hGetAll(tag);

        tagList[tag.replace('tags:', '')] = tagData;
    }
};

setInterval(fetchTags, 1000 * 60 * 5); // 5 minutes

export const tagListRoute = async (request: Request, response: Response) => {
    response.status(200).send(tagList);
};
