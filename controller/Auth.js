import Users from "../models/UsersModel.js";
import argon2 from "argon2";
import HairStyle from "../models/HairStyleModel.js";
import Bookmarks from "../models/BookmarksModel.js";

export const Login = async(req, res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email,
        }
    });
    if (!user) return res.status(404).json({ msg: "User doesn't exist" });
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({ uuid, name, email, role });

}
export const Me = async(req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Login first !" });

    }
    const temp_user = await Users.findOne({
        attributes: ['uuid', 'name', 'email', 'role', 'profileImgUrl', ],
        where: {
            uuid: req.session.userId
        },
        include: [{
            model: HairStyle,
            attributes: ["uuid", "name", "url1", "url2", "url3", "url4"]
        }]
    });
    if (temp_user.role === "designer") {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role', 'profileImgUrl', "isVerified", "licenseImgUrl", "Introduce"],
            where: {
                uuid: req.session.userId
            },
            include: [{
                model: HairStyle,
                attributes: ["uuid", "name", "url1", "url2", "url3", "url4"]
            }]

        });
        if (!user) return res.status(404).json({ msg: "User doesn't exist" });
        return res.status(200).json({ user });
    }
    const user = await Users.findOne({
        attributes: ['uuid', 'name', 'email', 'role', 'profileImgUrl', ],
        where: {
            uuid: req.session.userId
        },
        include: [{
            model: Bookmarks,

        }]

    });
    if (!user) return res.status(404).json({ msg: "User doesn't exist" });
    res.status(200).json({ user });




}

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Can't log out" });
        res.status(200).json({ msg: "Log out successfully" });
    })
}