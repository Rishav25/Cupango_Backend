const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const { request } = require('express');

class OrderModel {
    
    tableName = 'orders';

    
    findOrder = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (orders)
        return result[0];
    }

    findByUserId = async (id) => {
        console.log(id);
        const sql = `SELECT * FROM ${this.tableName}
        WHERE user_id = ?`;

        const result = await query(sql, [id]);
        //console.log(result);
        return result;
    }


    createOrder = async ({order_id, user_id, hotel_id, deliveryguy_id, item_id, quantity}) => {
        const sql = `INSERT INTO ${this.tableName}
        (order_id , user_id, hotel_id, deliveryguy_id, item_id, quantity) VALUES (?,?,?,?,?,?)`

        const result = await query(sql, [order_id, user_id, hotel_id, deliveryguy_id, item_id, quantity]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;

    }

    updateOrder = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `UPDATE orders SET ${columnSet} WHERE order_id = ?`;
        const result = await query(sql, [...values, id]);
        return result;
    }

    deleteOrder = async(id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

}

module.exports = new OrderModel;