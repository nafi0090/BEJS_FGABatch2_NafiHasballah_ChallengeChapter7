const USER_MODEL = require('../model/user.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sentry = require("@sentry/node");
const SECRET_KEY = process.env.JWT_SECRET;

const register = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // Cari email di database
        const findEmail = await USER_MODEL.findEmail(email);

        if (findEmail) {
            // Jika email ditemukan, kirim respon email sudah terdaftar
            return res.status(400).json({
                message: "Email already registered",
                data: {
                    email: email,
                },
            });
        } else {
            // Hash password dan buat user baru
            const hashedPassword = await bcrypt.hash(password, 8);
            const data = {
                email: email,
                password: hashedPassword
            };

            const user = await USER_MODEL.create(data);

            const token = jwt.sign({
                id: user.id
            }, SECRET_KEY);

            return res.json({
                message: "User registered successfully",
                data: {
                    email: user.email,
                    id: user.id
                },
                token: token
            });
        }
    } catch (error) {
        console.error('Register error:', error);
        Sentry.captureException(error);
        res.status(500).send('Server error');
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cek apakah user ada di database
        const user = await USER_MODEL.findEmail(email);

        if (!user) {
            return res.status(400).json({
                message: "Email not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

        return res.json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        console.error('Login error:', error);
        Sentry.captureException(error);
        res.status(500).send('Server error');
    }
};



module.exports = {
    register,
    login
}