import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";
import HairStyle from "./HairStyleModel.js";
const { DataTypes } = Sequelize;

const Bookmarks = db.define(
    "bookmarks", {

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

    }, {
        freezeTableName: true,
    }
);

Users.hasMany(Bookmarks, { foreignKey: 'ownerId', targetKey: 'uuid', constraints: false });
Bookmarks.belongsTo(Users);
Bookmarks.hasOne(HairStyle, { foreignKey: 'hairId', targetKey: 'uuid', constraints: false })

export default Bookmarks;