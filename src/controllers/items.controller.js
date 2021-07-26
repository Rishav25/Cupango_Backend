const ItemModel = require('../models/items.model.js');
const {validationResult} = require('express-validator');
const HttpException = require('../utils/HttpException.utils');

const dotenv = require('dotenv');
const {request} = require('express');

dotenv.config();

class itemController {

    getAllItems = async (req,res,next) => {

        let itemList = await ItemModel.find();
        if(!itemList.length)
        {
            throw new HttpException(404 , 'No Items Found');
        }

        itemList = itemList.map (item => {
            const {password, ...userWithoutPassword} = item;
            return userWithoutPassword;
        });
        res.send(itemList);
    }

    getItemById = async (req,res,next) => {

        let itemList = await ItemModel.findItem(req.params.id);
        if(!itemList.length)
        {
            throw new HttpException(404 , 'Item not in database');
        }

        itemList = itemList.map (item => {
            const {password, ...userWithoutPassword} = item;
            return userWithoutPassword;
        });
        res.send(itemList);
    }

    getItemsByHotel = async (req,res,next) => {

        let itemList = await ItemModel.findItemByHotel(req.params.id);
        if(!itemList.length)
        {
            throw new HttpException(404 , 'Hotel Does not have this item');
        }

        itemList = itemList.map (item => {
            const {password, ...userWithoutPassword} = item;
            return userWithoutPassword;
        });
        res.send(itemList);
    }
    

    createAnItem = async (req,res,next) => {

        this.checkValidation(req);
        const result = await ItemModel.createItem(req.body);

        if(!result){
            throw new HttpException(500 , 'Something Went Wrong');
        }

        res.status(201).send('Item Added');

    }

    updateAnItem = async (req,res,next) => {

        this.checkValidation(req);
        const {confirm_password, ...restOfUpdates} = req.body;

        const result = await ItemModel.updateItem(restOfUpdates, req.params.id);

        if(!result)
        {
            throw new HttpException(404, 'Something went Wrong'); 
        }

        const {affectedRows , changedRows , info} = result;

        const message = !affectedRows ? 'Item Not Found' :
            affectedRows && changedRows ? 'Item Updated Succesfully' : 'Update Failed';

        res.send({message , info});
    }

    deleteAnItem = async (req,res,next) => {
        this.checkValidation(req);
        const result = await ItemModel.deleteItem(req.params.id);
        if(!result){
            throw new HttpException(404, 'Item Not Found');
        }
        res.send('Item has been deleted succesfully');
    }

    checkValidation = (req) => {
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            throw new HttpException(400 , 'Validation Failed' , errors);
        }
    }
}

/***************************************************
            Export Module
***************************************************/

module.exports = new itemController;