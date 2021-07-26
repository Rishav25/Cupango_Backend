const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class DeliveryguysModel {

    tableName = 'deliveryguys';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;
        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
        const result = await query(sql, [...values]);

        //return back to first row of (deliveryguys)
        return result[0];
    }
    createDeliveryGuy = async ({deliveryguy_id , name , email}) => {
        const sql = `INSERT INTO ${this.tableName}
        (deliveryguy_id, name, email) VALUES (?,?,?)`;

        const result = await query(sql, [deliveryguy_id, name, email]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    updateDeliveryGuy = async (params, id) => {

        const { columnSet, values } = multipleColumnSet(params)
        const sql = `UPDATE deliveryguys SET ${columnSet} WHERE deliveryguy_id = ?`;
        const result = await query(sql, [...values, id]);

        return result;
    }

    deleteDeliveryGuy = async(id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

}

module.exports = new DeliveryguysModel;