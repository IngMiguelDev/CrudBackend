"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('product_db', 'root', 'Sergio2924', {
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = sequelize;
