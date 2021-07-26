const express = require('express');
const router = express.Router();
const itemController = require('../controllers/items.controller.js');
const Role = require('../utils/userRoles.utils.js');
const auth = require('../middleware/auth.middleware.js');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware.js');
const {createItemSchema , updateItemSchema} = require('../middleware/validators/itemValidator.middleware.js');

router.get('/', auth(Role.Admin), awaitHandlerFactory(itemController.getAllItems));
router.get('/hotels', auth(Role.Admin), awaitHandlerFactory(itemController.getItemsByHotel));
router.get('/:id' , auth(Role.Admin) , awaitHandlerFactory(itemController.getItemById));
router.post('/hotel' , auth(Role.HotelAdmin) , createItemSchema , awaitHandlerFactory(itemController.createAnItem));
router.patch('/hotel/:id' , auth(Role.HotelAdmin) , updateItemSchema , awaitHandlerFactory(itemController.updateAnItem));
router.delete('hotel/:id' , auth(Role.HotelAdmin) , awaitHandlerFactory(itemController.deleteAnItem));


module.exports = router;