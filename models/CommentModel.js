import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";
import HairStyle from "./HairStyleModel.js";
const { DataTypes } = Sequelize;

const Comments = db.define(
    "Comments", {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        hairId: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true

            }
        },

        ownerId: {

            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true

            }
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true

            }
        },
        like: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                notEmpty: true
            }
        },
        dislike: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                notEmpty: true
            }
        },

    }, {
        freezeTableName: true,
    }
);

Users.hasMany(Comments, { foreignKey: 'ownerId', sourcetKey: 'uuid', constraints: false });
Comments.belongsTo(Users, { foreignKey: 'ownerId', targetKey: "uuid", constraints: false });

HairStyle.hasMany(Comments, { foreignKey: 'hairId', sourceKey: 'uuid', constraints: false });
Comments.belongsTo(HairStyle, { foreignKey: 'hairId', targetKey: "uuid", constraints: false });

export default Comments;