const router = require('express').Router({ mergeParams: true });
const asyncMiddleware = require('../../common/asyncErrorMiddleware');
const { container } = require('../../di/DISetup');

router
  .route('/')
  .get(
    asyncMiddleware((req, res) =>
      container.resolve('taskController').get(req, res)
    )
  );

router
  .route('/:id')
  .get(
    asyncMiddleware((req, res) =>
      container.resolve('taskController').getById(req, res)
    )
  );

router
  .route('/')
  .post(
    asyncMiddleware((req, res) =>
      container.resolve('taskController').post(req, res)
    )
  );

router
  .route('/:id')
  .put(
    asyncMiddleware((req, res) =>
      container.resolve('taskController').put(req, res)
    )
  );

router
  .route('/:id')
  .delete(
    asyncMiddleware((req, res) =>
      container.resolve('taskController').delete(req, res)
    )
  );

module.exports = router;
