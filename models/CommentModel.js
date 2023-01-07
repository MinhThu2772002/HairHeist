import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";
import HairStyle from "./HairStyleModel.js";
const { DataTypes } = Sequelize;

const Comments = db.define(
    "Comments", {

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


    }, {
        freezeTableName: true,
    }
);

Users.hasMany(Comments, { foreignKey: 'ownerId', sourcetKey: 'uuid', constraints: false });
Comments.belongsTo(Users, { foreignKey: 'ownerId', targetKey: "uuid", constraints: false });
Comments.hasOne(HairStyle, { foreignKey: 'hairId', targetKey: 'uuid', constraints: false })

export default Comments;