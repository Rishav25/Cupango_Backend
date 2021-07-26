const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders.controller.js');
const Role = require('../utils/userRoles.utils.js');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware.js');
const {createOrderSchema , updateOrderSchema} = require('../middleware/validators/orderValidator.middleware.js');

router.get('/', auth(Role.Admin),awaitHandlerFactory(orderController.getAllOrders));
router.get('/mine' , auth(Role.NormalUser), awaitHandlerFactory(orderController.getMyOrders));
router.post('/mine', auth(Role.NormalUser), createOrderSchema, awaitHandlerFactory(orderController.placeMyOrder));
router.patch('/mine/:id' , auth(Role.NormalUser), updateOrderSchema, awaitHandlerFactory(orderController.updateMyOrder));
router.delete('/mine/:id') , auth(Role.NormalUser), awaitHandlerFactory(orderController.deleteMyOrder);

module.exports = router;