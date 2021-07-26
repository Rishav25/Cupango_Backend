const { body } = require('express-validator');

exports.createRestSchema = [
    body('name')
        .exists()
        .withMessage('name is required')
        .isLength({ min: 6 })
        .withMessage('Must be at least 6 chars long'),
    body('added_by')
        .exists()
        .withMessage('added_by')
        .isInt()
        .withMessage('must be integer')
        .isLength({ min: 1 })
        .withMessage('Must be at least 1 chars long'),
    body('address')
        .exists()
        .withMessage('Restaurent address is required')
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 10 })
        .withMessage('Must be at least 10 chars long'),
    body('contact')
        .exists()
        .withMessage('contact is required')
        .isMobilePhone()
        .withMessage('Must be a valid phone')
];





exports.updateRestauSchema = [
    body('name')
        .exists()
        .withMessage('name is required')
        .isLength({ min: 6 })
        .withMessage('Must be at least 6 chars long'),
    body('first_name')
        .exists()
        .withMessage('added_by')
        .isAlpha()
        .withMessage('must be integer')
        .isLength({ min: 1 })
        .withMessage('Must be at least 1 chars long'),
    body('address')
        .exists()
        .withMessage('Restaurent address is required')
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 10 })
        .withMessage('Must be at least 10 chars long'),
    body('contact')
        .exists()
        .withMessage('contact is required')
        .isMobilePhone()
        .withMessage('Must be a valid phone')
];


exports.createSlotSchema = [
    body('hotel_id')
        .exists()
        .withMessage('hotel_id is required and hotel must exist in database'),
    body('slot_start')
        .exists()
        .isLength(8)
        .withMessage('must be time value in "HH:MM:SS" format'),
    body('slot_end')
        .exists()
        .isLength(8)
        .withMessage('must be time value in "HH:MM:SS" format'),

];

exports.createReservationSchema = [
    body('hotel_id')
        .exists()
        .withMessage('hotel_id is required and hotel must exist in database'),
    body('slot_id')
        .exists()
        .withMessage('slot_id is required and hotel must exist in database'),
    body('user_id')
        .exists()
        .withMessage('user_id is required and hotel must exist in database'),

]



