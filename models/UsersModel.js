import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const Users = db.define(
    "users", {
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100],
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        role: {
            type: DataTypes.STRING,

            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        profileImgUrl: {
            type: DataTypes.STRING,

            allowNull: true,
            validate: {
                notEmpty: true,
            },
        },

        isVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            validate: {
                notEmpty: true,
            },
        },
        licenseImgUrl: {
            type: DataTypes.STRING,

            allowNull: true,
            validate: {
                notEmpty: true,
            },
        },
        Introduce: {
            type: DataTypes.STRING,

            allowNull: true,
            validate: {
                notEmpty: true,
            },
        },
    }, {
        freezeTableName: true,
    }
);


export default Users;