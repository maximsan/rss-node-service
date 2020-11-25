const router = require('express').Router();
const asyncMiddleware = require('../../common/asyncErrorMiddleware');
const { container } = require('../../di/DISetup');

router
  .route('/')
  .get(
    asyncMiddleware((req, res) =>
      container.resolve('userController').get(req, res)
    )
  );

router
  .route('/:id')
  .get(
    asyncMiddleware((req, res) =>
      container.resolve('userController').getById(req, res)
    )
  );

router
  .route('/')
  .post(
    asyncMiddleware((req, res) =>
      container.resolve('userController').post(req, res)
    )
  );

router
  .route('/:id')
  .put(
    asyncMiddleware((req, res) =>
      container.resolve('userController').put(req, res)
    )
  );

router
  .route('/:id')
  .delete(
    asyncMiddleware((req, res) =>
      container.resolve('userController').delete(req, res)
    )
  );

module.exports = router;
