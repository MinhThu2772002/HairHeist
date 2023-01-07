import Users from "../models/UsersModel.js";
import HairStyle from "../models/HairStyleModel.js";
import Bookmarks from "../models/BookmarksModel.js";
import argon2 from "argon2";
import path from "path";
import fs from "fs";

export const createBookmarks = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId,
        }
    });
    const bookmark = await Bookmarks.findOne({
        where: {
            ownerId: user.uuid,
            hairId: req.params.id,
        }
    });
    if (!bookmark) {
        try {
            await Bookmarks.create({
                ownerId: user.uuid,
                hairId: req.params.id,
            });
            res.status(201).json({ msg: "Mark Successfully" });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    } else {
        return res.status(400).json({ msg: "Bookmark existed" });
    }
};

export const deleteBookmarks = async(req, res) => {
    const bookmark = await Bookmarks.findOne({
        where: {
            ownerId: req.session.userId,
            hairId: req.params.id,
        }
    });
    if (!bookmark) return res.status(404).json({ msg: "Bookmark doesn't exist" });
    try {
        await Bookmarks.destroy({
            where: {
                ownerId: req.session.userId,
                hairId: req.params.id,
            },
        });
        res.status(200).json({ msg: "Delete successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};