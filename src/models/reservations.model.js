const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
const { request } = require('express');
class ReservationModel {
    tableName = 'reservations';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (id) => {
        console.log(id);
        const sql = `SELECT * FROM ${this.tableName}
        WHERE user_id = ?`;

        const result = await query(sql, [id]);
        //console.log(result);
        return result;
    }

    findByHotel = async (id) => {
        console.log(id);
        const sql = `SELECT * FROM ${this.tableName}
        WHERE hotel_id = ?`;

        const result = await query(sql, [id]);
        //console.log(result);
        return result;
    }

    create = async ({ user_id, hotel_id, slot_id, userrequest, occasion }) => {
        const sql = `INSERT INTO ${this.tableName}
        (user_id, hotel_id, slot_id, userrequest, occasion) VALUES (?,?,?,?,?)`;

        const result = await query(sql, [user_id, hotel_id, slot_id, userrequest, occasion]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }


    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new ReservationModel;
