const ResModel = require('../models/reservations.model')
const { validationResult } = require('express-validator');
const HttpException = require('../utils/HttpException.utils');


const dotenv = require('dotenv');
const { request } = require('express');
dotenv.config();

class BookingsController {
    getAllReservations = async  (req, res, next) =>
    {
        let resList = await ResModel.find();
        if(!resList.length)
        {
            throw new HttpException(404, 'No restaurents found');
        }

        resList = resList.map(restaurent => {
            const { password, ...userWithoutPassword } = restaurent;
            return userWithoutPassword;

        });
        res.send(resList);
    };

    createReservation = async (req, res) => {
        this.checkValidation(req);
        const result = await ResModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Reservation was created!');
    };

    getReservationbyID = async (req, res) => {
        this.checkValidation(req);
        const user = await ResModel.findOne(req.currentUser.id);
        if (!user) {
            throw new HttpException(404, 'Reservation not found');
        }
        const { password, ...userWithoutPassword } = user;

        res.send(user);
    };

    deleteReservation = async (req, res) => {
        this.checkValidation(req);
        const result = await ResModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Reservation not found');
        }
        res.send('Reservation has been deleted');
    };

    getReservationbyHotel = async  (req, res, next) =>
    {
        let resList = await ResModel.findByHotel(req.params.id);
        if(!resList.length)
        {
            throw new HttpException(404, 'No restaurents found');
        }

        resList = resList.map(restaurent => {
            const { password, ...userWithoutPassword } = restaurent;
            return userWithoutPassword;

        });
        res.send(resList);
    };
    
    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    };
    
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new BookingsController;
