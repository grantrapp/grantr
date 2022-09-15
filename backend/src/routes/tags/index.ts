import { Router } from 'express';

import { tagsDeleteRoute } from './delete';
import { getTagRoute } from './get';
import { tagListRoute } from './list';
import { tagsUpdateRoute } from './update';

export const tagsRouter = Router();

tagsRouter.get('/list', tagListRoute);
tagsRouter.get('/get', getTagRoute);
tagsRouter.post('/update', tagsUpdateRoute);
tagsRouter.get('/delete', tagsDeleteRoute);
