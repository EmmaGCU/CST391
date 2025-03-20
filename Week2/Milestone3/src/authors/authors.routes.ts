import { Request, Response, Router } from 'express';
import * as ArtistsController from './authors.controller';

const router = Router();
router
    .route('/authors')
    .get(ArtistsController.readAuthors);

export default router;