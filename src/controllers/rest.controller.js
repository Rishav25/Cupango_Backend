const ResModel = require('../models/restaurent.model')
const slotModel = require('../models/slots.model');
const { validationResult } = require('express-validator');
const HttpException = require('../utils/HttpException.utils');


const dotenv = require('dotenv');
dotenv.config();

class RestController {
    getAllRestaurents = async  (req, res, next) =>
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

    AddRestaurent = async (req, res) => {
        this.checkValidation(req);
        const result = await ResModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Restaurent was added!');
    };

    deleteRestaurent = async (req, res) => {
        this.checkValidation(req);
        const result = await ResModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'User not found');
        }
        res.send('Restaurent has been deleted');
    };

    updateRestau = async (req, res) => {

        this.checkValidation(req);
        const { confirm_password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await ResModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Restaurent not found' :
            affectedRows && changedRows ? 'Restaurent updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    getSlots = async (req, res) =>
    {
        this.checkValidation(req);
        let slotList = await slotModel.findofHotel({'hotel_id' : req.params.id});
        console.log(req.params.id);
        if(!slotList.length)
        {
            throw new HttpException(404, 'No Slots found');
        }

        slotList = slotList.map(slot => {
            const { password, ...userWithoutPassword } = slot;
            return userWithoutPassword;

        });
        res.send(slotList);
    };

    createSlot = async (req, res) => {
        this.checkValidation(req);

        const result = await slotModel.createSlot(req.body);

        if (!result) {
            throw new HttpException(501, 'Something went wrong');
        }

        res.status(201).send('Slot was created!');
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
module.exports = new RestController;
