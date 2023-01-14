import HairStyle from "../models/HairStyleModel.js";
import Comments from "../models/CommentModel.js";
import Reaction from "../models/ReactionModel.js";

export const LikeOrDislike = async (req, res) => {
    const react = req.body;
    try {
        const Reactioni = await Reaction.findOne({
            where: {
                targetId: req.params.id,
                ownerId: req.session.userId,
            }
        });
        if (!Reactioni) {
            const HairStylei = await HairStyle.findOne({
                where: {
                    uuid: req.params.id,
                }
            });
            const Commenti = await Comments.findOne({
                where: {
                    uuid: req.params.id,
                }
            });
            if (HairStylei) {
                if (req.body.react === "like") {
                    HairStylei.like = HairStylei.like + 1;
                }
                else if (req.body.react === "dislike") {
                    HairStylei.dislike = HairStylei.dislike + 1;
                }
                const responses = await HairStylei.save();
                await Reaction.create({
                    ownerId: req.session.userId,
                    targetId: req.params.id,
                    reaction: req.body.react,
                });
                res.json(responses);
            }
            else if (Commenti) {
                if (req.body.react === "like") {
                    Commenti.like = Commenti.like + 1;
                }
                else if (req.body.react === "dislike") {
                    Commenti.dislike = Commenti.dislike + 1;
                }
                const responses = await Commenti.save();
                await Reaction.create({
                    ownerId: req.session.userId,
                    targetId: req.params.id,
                    reaction: req.body.react,
                });
                res.json(responses);
            }
            else {
                res.status(404).json({ message: "No HairStyle or Comment found with the provided id" });
            }
        }
        else {
            const HairStylei = await HairStyle.findOne({
                where: {
                    uuid: req.params.id,
                }
            });
            const Commenti = await Comments.findOne({
                where: {
                    uuid: req.params.id,
                }
            });
            if (HairStylei) {
                if (req.body.react === Reactioni.reaction && Reactioni.reaction === "like") {
                    HairStylei.like = HairStylei.like - 1;
                    await Reaction.destroy({
                        where:{
                            ownerId: req.session.userId,
                            targetId: req.params.id,
                        }
                    });
                }
                else if (req.body.react === Reactioni.reaction && Reactioni.reaction === "dislike") {
                    HairStylei.dislike = HairStylei.dislike - 1;
                    await Reaction.destroy({
                        where:{
                            ownerId: req.session.userId,
                            targetId: req.params.id,
                        }
                    });
                }
                const responses = await HairStylei.save();
                res.json(responses);
            }
            else if (Commenti) {
                if (req.body.react === Reactioni.reaction && Reactioni.reaction === "like") {
                    Commenti.like = Commenti.like - 1;
                    await Reaction.destroy({
                        where:{
                            ownerId: req.session.userId,
                            targetId: req.params.id,
                        }
                    });
                }
                else if (req.body.react === Reactioni.reaction && Reactioni.reaction === "dislike") {
                    Commenti.dislike = Commenti.dislike - 1;
                    await Reaction.destroy({
                        where:{
                            ownerId: req.session.userId,
                            targetId: req.params.id,
                        }
                    });
                }
                const responses = await Commenti.save();
                res.json(responses);
            }
            else {
                res.status(404).json({ message: "No HairStyle or Comment found with the provided id" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}