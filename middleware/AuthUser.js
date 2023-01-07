import Users from "../models/UsersModel.js";
export const verifyUser = async(req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Please log in first" });

    }
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "User not exist" });
    req.userId = user.id;
    req.role = user.role;
    next();
}
export const designerOnly = async(req, res, next) => {

    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "User not exist" });
    if (user.role !== "designer") return res.status(404).json({ msg: "Access denied" });
    next();
}
export const UserOnly = async(req, res, next) => {

    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "User not exist" });
    if (user.role !== "user") return res.status(404).json({ msg: "Access denied" });
    next();
}