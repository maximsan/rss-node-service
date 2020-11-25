const router = require('express').Router({ mergeParams: true });
const asyncMiddleware = require('../../common/asyncErrorMiddleware');
const { container } = require('../../di/DISetup');

const taskController = container.resolve('taskController');

router.route('/').get(asyncMiddleware(taskController.get));

router.route('/:id').get(asyncMiddleware(taskController.getById));

router.route('/').post(asyncMiddleware(taskController.post));

router.route('/:id').put(asyncMiddleware(taskController.put));

router.route('/:id').delete(asyncMiddleware(taskController.delete));

module.exports = router;
