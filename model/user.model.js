const db = require('../config/db');

const USER = {
    index: async () => {
        try {
            const query = "SELECT * FROM users";
            const result = await db.query(query);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get data User");
        }
    },
    findEmail: async (email) => {
        try {
            const query = "SELECT * FROM users WHERE email = $1";
            const result = await db.query(query, [email]);
            
            if (result.rows.length > 0) {
                return result.rows[0];  
            } else {
                return null; 
            }
        } catch (err) {
            console.error('Error finding email:', err.message);
            throw new Error("Error: Error Get data User");
        }
    },
    create: async (data) => {
        try {
            const {
                email,
                password
            } = data;

            const query = "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
            const result = await db.query(query, [email, password]);

            // Cek apakah result.rows[0] ada
            if (!result.rows || result.rows.length === 0) {
                throw new Error("User not created");
            }

            // Log hasil query untuk melihat apakah 'email' tersedia
            console.log('User created:', result.rows[0]);

            return result.rows[0];

        } catch (err) {
            console.error('Error creating user:', err.message);
            throw new Error("Error: Error Create data User");
        }
    }

}

module.exports = USER;