import { Router } from 'express';
import * as QuotesController from './quotes.controller';

const router = Router();
router
    .route('/quotes')
    .get(QuotesController.readQuotes);

router
    .route('/quotes')
    .post(QuotesController.createQuotes);

router
    .route('/quotes')
    .put(QuotesController.updateQuotes);

router
    .route('/quotes/:quoteId')
    .delete(QuotesController.deleteQuotes);

export default router;