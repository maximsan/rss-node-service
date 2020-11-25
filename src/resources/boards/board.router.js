const router = require('express').Router();
const asyncMiddleware = require('../../common/asyncErrorMiddleware');
const { container } = require('../../di/DISetup');

router
  .route('/')
  .get(
    asyncMiddleware((req, res) =>
      container.resolve('boardController').get(req, res)
    )
  );

router
  .route('/:id')
  .get(
    asyncMiddleware((req, res) =>
      container.resolve('boardController').getById(req, res)
    )
  );

router
  .route('/')
  .post(
    asyncMiddleware((req, res) =>
      container.resolve('boardController').post(req, res)
    )
  );

router
  .route('/:id')
  .put(
    asyncMiddleware((req, res) =>
      container.resolve('boardController').put(req, res)
    )
  );

router
  .route('/:id')
  .delete(
    asyncMiddleware((req, res) =>
      container.resolve('boardController').delete(req, res)
    )
  );

module.exports = router;
