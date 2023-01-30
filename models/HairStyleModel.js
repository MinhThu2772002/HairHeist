import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";
const { DataTypes } = Sequelize;

const HairStyle = db.define(
    "hairstyle", {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100]
            }
        },

        url1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        url2: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            }
        },
        url3: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            }
        },
        url4: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            }
        },


        designerId: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true

            }
        },
        modelId: {
            type: DataTypes.STRING,
            allowNull: true,
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
        Description: {
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

Users.hasMany(HairStyle, { foreignKey: 'designerId', sourceKey: "uuid", constraints: false }, { onDelete: 'CASCADE', });
HairStyle.belongsTo(Users, { foreignKey: 'designerId', targetKey: "uuid", constraints: false });

//Users.hasOne(HairStyle, { foreignKey: 'modelId', sourceKey: "uuid", constraints: false });
//HairStyle.belongsTo(Users, { foreignKey: 'modelId', targetKey: "uuid", constraints: false });
export default HairStyle;