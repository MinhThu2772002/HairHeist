import { Sequelize } from "sequelize";

const db = new Sequelize('app', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;
