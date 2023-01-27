import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";
import HairStyle from "./HairStyleModel.js";
const { DataTypes } = Sequelize;

const Reaction = db.define(
    "reaction", {

        ownerId: {

            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true

            }
        },

        targetId: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true

            }
        },

        reaction: {
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

Users.hasMany(Reaction, { foreignKey: 'ownerId', sourceKey: 'uuid', constraints: false });
Reaction.belongsTo(Users, { foreignKey: 'ownerId', targetKey: "uuid", constraints: false });

export default Reaction;