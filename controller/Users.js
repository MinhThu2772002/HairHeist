import HairStyle from "../models/HairStyleModel.js";
import Users from "../models/UsersModel.js";
import Keywords from "../models/KeyworkModel.js";
import Bookmarks from "../models/BookmarksModel.js";
import Comments from "../models/CommentModel.js";
import Reaction from "../models/ReactionModel.js";
const saltRounds = 10;
import bcrypt from "bcryptjs";
import { Op } from "sequelize"

export const getUsers = async(req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ["uuid", "name", "email", "role"],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getUserById = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id,
        }
    });

    if (user.role == "user") {


        try {
            const response = await Users.findOne({
                attributes: ["uuid", "name", "email", "role", "profileImgUrl"],
                where: {
                    uuid: req.params.id,
                },
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    } else {
        try {
            const response = await Users.findOne({
                attributes: ["uuid", "name", "email", "role", "profileImgUrl", "isVerified", "licenseImgUrl", "Introduce"],
                where: {
                    uuid: req.params.id,
                },
                include: [{
                    model: HairStyle,
                    attributes: ["uuid", "name", "url1", "url2", "url3", "url4", "designerId", "modelId"]
                }]
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }

};

export const createUser = async(req, res) => {

    const { name, email, password, role, uid } = req.body;
    const user = await Users.findOne({
        where: {
            email: email,
        }
    });
    if (user) return res.status(404).json({ msg: "User has already exist!!" });

    const hashPassword = await bcrypt.hashSync(password, saltRounds);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
            uuid: uid
        });
        res.status(201).json({ msg: "Register Successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
export const updateUser = async(req, res) => {
    const user = await Users.findOne({
        where: {

            uuid: req.body.uid,

        }
    });
    if (!user) return res.status(404).json({ msg: "User is not exist" });
    const { name, email, password, role } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = user.password;
    } else {
        hashPassword = await bcrypt.hashSync(password, saltRounds);
    }

    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
        }, {
            where: {
                id: user.id,
            }
        });
        res.status(200).json({ msg: "Update user successfull" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteUser = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.body.uid
        }
    });
    if (!user) return res.status(404).json({ msg: "User isn't exist" });
    const HairStylei = await HairStyle.findAll({
        attributes: ["uuid"],
        where: {
            designerId: user.uuid,
        }
    });
    const hairIds = HairStylei.map(hairIds => hairIds.uuid);

    try {
        await Keywords.destroy({
            where: {
                hairId: {
                    [Op.in]: hairIds,
                },
            },
        });
        await Bookmarks.destroy({
            where: {
                ownerId: user.uuid
            }
        });
        await Comments.destroy({
            where: {
                ownerId: user.uuid
            }
        });
        await Reaction.destroy({
            where: {
                ownerId: user.uuid
            }
        });
        await HairStyle.destroy({
            where: {
                designerId: user.uuid,
            }
        });
        await Users.destroy({
            where: {
                uuid: user.uuid,
            },
        });
        res.status(200).json({ msg: "Delete user successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateVerified = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.body.uid

        }
    });
    if (!user) return res.status(404).json({ msg: "User is not exist" });
    const { isVerified } = req.body;

    try {
        await Users.update({
            isVerified: isVerified
        }, {
            where: {
                id: user.id,
            }
        });
        res.status(200).json({ msg: "Update user successfull" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const UpdateProfileImg = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.body.uid,

        }

    });
    if (!user) return res.status(404).json({ msg: "User not exist" });

    const { url } = req.body;

    try {
        await user.update({ profileImgUrl: url }, {
            where: {
                uuid: user.uuid
            }
        });
        res.status(200).json({ msg: "Profile picture Updated Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
};

export const UpdateLicenseImg = async(req, res) => {
    const user = await Users.findOne({
        where: {

            uuid: req.body.uid,

        }

    });
    if (!user) return res.status(404).json({ msg: "Designer not exist" });


    const { url } = req.body;
    try {
        await user.update({ licenseImgUrl: url }, {
            where: {
                uuid: user.uuid
            }
        });
        res.status(200).json({ msg: "License Updated Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
};
export const UpdateIntroduce = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.body.uid

        }

    });
    if (!user) return res.status(404).json({ msg: "Designer not exist" });


    const { Introduces } = req.body;
    try {
        await user.update({ Introduce: Introduces }, {
            where: {
                uuid: user.uuid
            }
        });
        res.status(200).json({ msg: "Introduction Updated Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
};