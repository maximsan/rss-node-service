const router = require('express').Router();
const asyncMiddleware = require('../../common/asyncErrorMiddleware');
const { container } = require('../../di/DISetup');

const boardController = container.resolve('boardController');

router.route('/').get(asyncMiddleware(boardController.get));

router.route('/:id').get(asyncMiddleware(boardController.getById));

router.route('/').post(asyncMiddleware(boardController.post));

router.route('/:id').put(asyncMiddleware(boardController.put));

router.route('/:id').delete(asyncMiddleware(boardController.delete));

module.exports = router;
