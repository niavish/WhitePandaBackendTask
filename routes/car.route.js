const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const car_controller = require('../controllers/car.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', car_controller.test);
router.get('/add',car_controller.add);
router.get('/:modelNo',car_controller.getCarDetails);
// router.get('/:modelNo/delete',car_controller.deleteCar);
router.get('/:modelNo/update',car_controller.updateCar);

module.exports = router;