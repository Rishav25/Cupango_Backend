const {body} = require('express-validator');

exports.createOrderSchema = [
    body('user_id')
        .exists()
        .withMessage('user_id must exist and user should be registered in database'),
    body('hotel_id')
        .exists()
        .withMessage('hotel_id is required and hotel must exist in database'),
    body('item_id')
        .exists()
        .withMessage('item_id must exist and item should be in database'),
    body('quantity')
        .exists()
        .withMessage('quantity must exist for item')
];

exports.updateOrderSchema = [
    body('user_id')
        .exists()
        .withMessage('user_id must exist and user should be registered in database'),
    body('hotel_id')
        .exists()
        .withMessage('hotel_id is required and hotel must exist in database'),
    body('item_id')
        .exists()
        .withMessage('item_id must exist and item should be in database'),
    body('quantity')
        .exists()
        .withMessage('quantity must exist for item')
    ];