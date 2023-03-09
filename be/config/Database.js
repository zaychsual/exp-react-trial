import {Sequelize} from "sequelize";

const db = new Sequelize('db_exp', 'root', 'toshiba55a', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db; 