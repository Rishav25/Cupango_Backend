const {body} = require('express-validator');

exports.createItemSchema = [
    body('name')
        .exists()
        .withMessage('Item must have a name')
]

exports.updateItemSchema = [
    body('name')
        .exists()
        .withMessage('Item must have a name')
]

