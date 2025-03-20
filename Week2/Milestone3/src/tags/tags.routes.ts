import { Router } from 'express';
import * as TagsController from './tags.controller';

const router = Router();
router
    .route('/tags')
    .get(TagsController.readTags);
export default router;