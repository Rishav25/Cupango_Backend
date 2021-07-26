const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
class SlotModel {
    tableName = 'slots';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findofHotel = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result;
    }

    createSlot = async ({ hotel_id,slot_start,slot_end }) => {
        const sql = `INSERT INTO ${this.tableName}
        (hotel_id, slot_start, slot_end) VALUES (?,?,?)`;

        const result = await query(sql, [hotel_id,slot_start,slot_end]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    updateSlot = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE slots SET ${columnSet} WHERE slot_id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    deleteSlot = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE slot_id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new SlotModel;
