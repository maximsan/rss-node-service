const router = require('express').Router();
const asyncMiddleware = require('../../common/asyncErrorMiddleware');
const { container } = require('../../di/DISetup');

const userController = container.resolve('userController');

router.route('/').get(asyncMiddleware(userController.get));

router.route('/:id').get(asyncMiddleware(userController.getById));

router.route('/').post(asyncMiddleware(userController.post));

router.route('/:id').put(asyncMiddleware(userController.put));

router.route('/:id').delete(asyncMiddleware(userController.delete));

module.exports = router;
