import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // use dotenv
const SALT_ROUNDS = 10;

router.post("/login", async (req, res) => {
    const { username, password} = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await pool.query(
            "SELECT id, username, pwd, is_verified FROM public.user WHERE username = $1",
            [username]
        );

        if (result.rowCount === 0) {
            return res.status(400).json({ error: "No user found with the given username" });
        }

        const user = result.rows[0]

        const isMatch = await bcrypt.compare(password, user.pwd)

        if (!isMatch) {
            return res.status(400).json({ error: "Wrong password given" });
        }

        /*if (!user.is_verified) {
            return res.status(403).json({ error: "Please verify your email before logging in" });
        }*/

        // JWT token generation
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" })
    }
})

router.post("/register", async (req, res) => {
    const { name, surname, username, email, password } = req.body

    try {
        if (!name || !surname || !username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await pool.query(
            "SELECT id FROM public.user WHERE email = $1 OR username = $2",
            [email, username]
        );

        if (existingUser.rowCount > 0) {
            return res.status(400).json({ error: "Email or username already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = await pool.query(
            `INSERT INTO public.user (name, surname, username, email, pwd, is_verified)
            VALUES ($1, $2, $3, $4, $5, false)
            RETURNING id, email`,
            [name, surname, username, email, hashedPassword]
        );

        const token = jwt.sign(
            { userId: newUser.rows[0].id },
            JWT_SECRET,
            { expiresIn: 600 }
        );

        // TODO: Send email with verfication link
        console.log('Verification link: http://localhost:5000/verify-email/${token}');

        return res.status(201).json({ message: "User created. Please verify your email." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;