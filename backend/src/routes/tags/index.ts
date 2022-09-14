import { Router } from 'express';

import { tagListRoute } from './list';

export const tagsRouter = Router();

tagsRouter.get('/list', tagListRoute);
