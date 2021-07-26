const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { createReservationSchema } = require('../middleware/validators/restaValidator.middleware');


router.get('/', auth(Role.Admin), awaitHandlerFactory(bookingsController.getAllReservations)); 
router.get('/mine/', auth(), awaitHandlerFactory(bookingsController.getReservationbyID)); 
router.post('/', auth(), createReservationSchema, awaitHandlerFactory(bookingsController.createReservation)); 
router.delete('/:id', awaitHandlerFactory(bookingsController.deleteReservation)); 
router.get('/restaurent/:id', auth(Role.HotelAdmin), awaitHandlerFactory(bookingsController.getReservationbyHotel));


module.exports = router;
