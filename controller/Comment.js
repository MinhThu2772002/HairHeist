import HairStyle from "../models/HairStyleModel.js";
import path from "path";
import { response } from "express";
import fs from "fs";
import { Op } from "sequelize";
import Users from "../models/UsersModel.js";
import Comments from "../models/CommentModel.js";
import Reaction from "../models/ReactionModel.js";

export const getCommentById = async(req, res) => {
    try {
        const response = await Comments.findAll({
            where: {
                hairId: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createComment = async(req, res) => {
    const { message } = req.body;
    const hairCid = await HairStyle.findOne({
        where: {
            uuid: req.params.id,
        }
    });
    const user = await Users.findOne({
        where: {
            uuid: req.body.uid,
        }
    });
    if (hairCid) {
        try {
            await Comments.create({
                ownerId: user.uuid,
                hairId: req.params.id,
                message: message,
            });
            res.status(201).json({ msg: "Comment Successfully" });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    } else {
        res.status(400).json({ msg: "No HairStyle found" });
    }
};

export const deleteComment = async(req, res) => {
    const { message } = req.body;
    const user = await Users.findOne({
        where: {
            uuid: req.body.uid,
        }
    });
    const comments = await Comments.findOne({
        where: {
            ownerId: user.uuid,
            hairId: req.params.id,
            message: message,
        }
    });
    if (!comments) return res.status(404).json({ msg: "Comment doesn't exist" });
    try {
        await Comments.destroy({
            where: {
                ownerId: user.uuid,
                hairId: req.params.id,
                message: message,
            },
        });
        await Reaction.destroy({
            where: {
                targetId: req.params.id
            }
        });
        res.status(200).json({ msg: "Delete successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};