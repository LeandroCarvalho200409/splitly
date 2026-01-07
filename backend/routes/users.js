
import express from 'express';
import pool from '../db.js';
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // use dotenv

const router = express.Router();


router.post("/getUserDataByToken", async (req, res) => {

    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    const user = jwt.verify(token, JWT_SECRET);
        
    try {
        const userData = await pool.query(
            `SELECT 
            name,
            surname
            FROM public.user
            WHERE id = $1;`,
            [user.userId]
        );

        if (userData.rowCount === 0) {
            return res.status(404).json({ error: "No user found for the given token" });
        }

        const userNames = userData.rows;

        const groupData = await pool.query(
            `SELECT
            ug.role,
            g.id,
            g.description
            FROM public.user_group ug
            LEFT JOIN public.group g ON ug.group_fk = g.id
            WHERE ug.user_fk = $1`,
            [user.userId]
        );

        userNames[0].groups = groupData.rows;

        res.json(userNames[0]);
    } catch (err) {
        if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
            return res.status(403).json({ error: "Invalid or expired token" });
        }
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
})

export default router;
