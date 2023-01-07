import HairStyle from "../models/HairStyleModel.js";
import Users from "../models/UsersModel.js";
import Keywords from "../models/KeyworkModel.js";
import Bookmarks from "../models/BookmarksModel.js";
import Comments from "../models/CommentModel.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize"
export const getHairStyles = async(req, res) => {
    try {

        const responses = await HairStyle.findAll({
            attributes: ["uuid", "name", "url1", "url2", "url3", "url4", "designerId", "modelId"],
            include: [{
                model: Users,
                attributes: ["name", "email", "profileImgUrl"]
            }],

        });

        res.json(responses);
    } catch (error) {
        console.log(error.message);
    }
}

export const getHairStyleById = async(req, res) => {
    try {
        const response = await HairStyle.findOne({
            attributes: ["uuid", "name", "url1", "url2", "url3", "url4", "designerId", "modelId"],
            where: {
                uuid: req.params.id
            },
            include: [{
                model: Users,
                attributes: ["name", "email", "profileImgUrl"]
            }]
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// export const getHairStyleByKeyword = async(req, res) => {
//     const { keys = '' } = req.body;
//     try {
//         const response = await Keywords.findAll({
//             attributes: ["hairId", "word"],
//             where: {
//                 word: keys
//             }
//         });
//         res.json(response);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

export const getHairStyleByKeyword = async(req, res) => {
    const { keys = '' } = req.body;
    if (!keys) {
        return res.status(200).json({ msg: "No keywords found !" });
    }
    const words = await Keywords.findAll({
        where: {
            word: keys,
        },
    });
    const hairIds = words.map(word => word.hairId);
    try {
        if (hairIds.length === 0) {
            res.status(400).json({ msg: 'No hair styles found for the given keywords' });
            return;
        }

        const response = await HairStyle.findAll({
            attributes: ["uuid", "name", "url1", "url2", "url3", "url4", "designerId", "modelId"],
            where: {
                uuid: {
                    [Op.in]: hairIds,
                },
            },
            include: [{
                model: Users,
                attributes: ["name", "email", "profileImgUrl"]
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// export const getHairStyleByKeyword = async(req, res) => {
//     const keys = req.body;    
//     try {

//             const words = await Keywords.findAll({
//                 include: [{
//                     model: HairStyle,
//                     required: true,
//                     where: {
//                         word: keys,
//                     }

//                 }],

//             });
//             const response = await HairStyle.findAll({
//                 where: {
//                     uuid: words.hairId,
//                 },
//             });
//             res.status(200).json(response);
//         } catch (error) {
//             res.status(500).json({ msg: error.message });
//         }



// };

export const saveHairStyle = async(req, res) => {
    const user = await Users.findOne({
        attributes: ["uuid"],
        where: {
            id: req.userId
        }
    });
    const { name, url1, url2, url3, url4, modelId } = req.body;
    if (!url1) return res.status(404).json({ msg: "Need at least one image for new HairStyle" });
    try {
        await HairStyle.create({
            name: name,
            url1: url1,
            url2: url2,
            url3: url3,
            url4: url4,
            designerId: user.uuid,
            modelId: modelId,

        });
        res.status(201).json({ msg: "Create HairStyle successfully" });
    } catch (error) {
        res.status(500)
            .json({ msg: error.message });
    }

}

export const updateHairStyle = async(req, res) => {
    const HairStylei = await HairStyle.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!HairStylei) return res.status(404).json({ msg: "No Data Found" });


    const { name, url_1, url_2, url_3, url_4, modelId } = req.body;
    if (url_1 === null) {
        url_1 = HairStylei.url1;
    }
    try {
        await HairStylei.update({
            name: name,
            url1: url_1,
            url2: url_2,
            url3: url_3,
            url4: url_4,
            modelId: modelId

        }, {
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "HairStyle Updated Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteHairStyle = async(req, res) => {
    const HairStylei = await HairStyle.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!HairStylei) return res.status(404).json({ msg: "No Data Found" });

    try {
        await Bookmarks.destroy({
            where: {
                hairId: req.params.id
            }
        });
        await Comments.destroy({
            where: {
                hairId: req.params.id
            }
        });
        await Keywords.destroy({
            where: {
                hairId: req.params.id
            }
        });
        await HairStylei.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "HairStyle Deleted Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
}