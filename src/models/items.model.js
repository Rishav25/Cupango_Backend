const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
const { request } = require('express');

class ItemsModel {
    tableName = 'items';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;
        return await query(sql, [...values]);
    }

    findItemByHotel = async (id) => {
        const sql = `SELECT * FROM ${this.tableName}
        WHERE hotel_id = ?`;

        const result = await query(sql ,[id]);

        return result[0];
    }
    
    findItem = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (item)
        return result[0];
    }
    createItem = async ({name , hotel_id , item_id}) => {
        const sql = `INSERT INTO ${this.tableName}
        (name, hotel_id, item_id) VALUES (?,?,?)`;

        const result = await query(sql, [name, hotel_id, item_id]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }
    
    updateItem = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `UPDATE items SET ${columnSet} WHERE item_id = ?`;
        const result = await query(sql, [...values, id]);
        return result;
    }


    deleteItem = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

}

module.exports = new ItemsModel;