const express = require('express');
const router = express.Router();
const restController = require('../controllers/rest.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const {createRestSchema, createSlotSchema , updateRestauSchema } = require('../middleware/validators/restaValidator.middleware');


router.get('/', auth(), awaitHandlerFactory(restController.getAllRestaurents)); 
router.post('/', createRestSchema, awaitHandlerFactory(restController.AddRestaurent)); 
router.delete('/:id', auth(Role.Admin), awaitHandlerFactory(restController.deleteRestaurent)); 
router.patch('/:id', auth(Role.SuperUser), updateRestauSchema, awaitHandlerFactory(restController.updateRestau)); 
router.get('/slots/:id', awaitHandlerFactory(restController.getSlots));
router.post('/slots', createSlotSchema ,auth(Role.Admin, Role.HotelAdmin) ,awaitHandlerFactory(restController.createSlot));


module.exports = router;
