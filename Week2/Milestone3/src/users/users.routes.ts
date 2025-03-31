import { Router } from 'express';
import * as UsersController from './users.controller';

const router = Router();
router
    .route('/users')
    .get(UsersController.readUsers);

router
    .route('/users')
    .post(UsersController.createUser);
export default router;