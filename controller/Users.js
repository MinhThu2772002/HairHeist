import Users from "../models/UsersModel.js";
import argon2 from "argon2";
import path from "path";
import fs from "fs";
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

    const { name, email, password, confPassword, role } = req.body;
    const user = await Users.findOne({
        where: {
            email: email,
        }
    });
    if (user) return res.status(404).json({ msg: "User has already exist!!" });
    if (password !== confPassword)
        return res
            .status(400)
            .json({ msg: "Confirm password differ from password " });
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
        });
        res.status(201).json({ msg: "Register Successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
export const updateUser = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId,
        }
    });
    if (!user) return res.status(404).json({ msg: "User is not exist" });
    const { name, email, password, confPassword, role } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = user.password;
    } else {
        hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword)
        return res
            .status(400)
            .json({ msg: "Confirm password differ from password  " });
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
            uuid: req.params.id,
        }
    });
    if (!user) return res.status(404).json({ msg: "User isn't exist" });
    try {
        await Users.destroy({
            where: {
                id: user.id,
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
            uuid: req.session.userId,
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
            uuid: req.session.userId,
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
            uuid: req.session.userId,
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
            uuid: req.session.userId,
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