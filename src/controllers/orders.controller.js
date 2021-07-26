const OrderModel = require('../models/orders.model')
const {validationResult} = require('express-validator');
const HttpException = require('../utils/HttpException.utils');

const dotenv = require('dotenv');
const {request} = require('express');
dotenv.config();

class OrderController {

    getAllOrders = async (req,res,next) => {

        let orderList = await OrderModel.findOrder();
        if(!orderList.length)
        {
            throw new HttpException(404, 'No orders placed');
        }

        orderList = orderList.map (order => {
            const {password, ...userWithoutPassword} = order;
            return userWithoutPassword;
        });
        res.send(orderList);
    };

    getMyOrders = async (req,res,next) => {

        let orderList = await OrderModel.findByUserId(req.params.id);
        if(!orderList.length)
        {
            throw new HttpException(404 , 'No Orders Placed');
        }
        orderList = orderList.map(order => {
            const {password, ...userWithoutPassword} = order;
            return userWithoutPassword;
        });
        res.send(orderList);
    };

    placeMyOrder = async (req,res,next) => {
        this.checkValidation(req);
        const result = await OrderModel.createOrder(req.body);

        if(!result){
            throw new HttpException(500, 'Something Went Wrong');
        }

        res.status(201).send('Order Placed Successfully');
    };

    updateMyOrder = async(req,res,next) => {
        this.checkValidation(req);
        const {confirm_password , ...restOfUpdates} = req.body;

        const result = await OrderModel.updateOrder(restOfUpdates,req.params.id);

        if(!result){
            throw new HttpException(404, 'Something went wrong');
        }

        const {affectedRows , changedRows , info} = result;

        const message = !affectedRows ? 'Order Not Found' :
            affectedRows && changedRows ? 'Order Updated Succesfully' : 'Update Failed';

        res.send({message , info});
    }

    deleteMyOrder = async(req,res,next) => {
        this.checkValidation(req);
        const result = await OrderModel.deleteOrder(req.params.id);
        if(!result){
            throw new HttpException(404, 'Order Not Found');
        }
        res.send('Order has been cancelled');
    };

    checkValidation = (req) => {
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            throw new HttpException(400, 'Validation failed', errors);
        }
    }

}

/***************************************************
            Export Module
***************************************************/

module.exports = new OrderController;