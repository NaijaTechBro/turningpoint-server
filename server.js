require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// --- Load Config & Routes ---
// Make sure you have your logger and db config files created!
const connectDB = require('./config/db'); 
const logger = require('./config/logger'); 

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const testRequestRoutes = require('./routes/testRequestRoutes');
const templateRoutes = require('./routes/templateRoutes');
const userRoutes = require('./routes/userRoutes');

const startServer = async () => {
    try {
        await connectDB();

        const app = express();
        const server = http.createServer(app);

        // --- Express Middlewares ---
        app.set('trust proxy', 1);

        const allowedOrigins = [
            'http://localhost:5173',
            "https://turningpointhealth.site",
            "http://www.turningpointhealth.site",
            process.env.FRONTEND_URL
        ];

        app.use(cors({
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS')); 
                }
            },
            credentials: true,
        }));
        console.log("Native watch test!");

        app.use(express.json({ limit: '10mb' })); 
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());

        // --- Routes ---
        app.get('/health', (req, res) => res.status(200).send('OK'));
        
        app.use('/api/v1/auth', authRoutes);
        app.use('/api/v1/patients', patientRoutes);
        app.use('/api/v1/test-requests', testRequestRoutes);
        app.use('/api/v1/templates', templateRoutes);
        app.use('/api/v1/users', userRoutes);

        // --- Error Handler ---
        app.use((err, req, res, next) => {
            const statusCode = err.status || (res.statusCode === 200 ? 500 : res.statusCode);
            console.error("🔥 ERROR:", err.message);
            res.status(statusCode).json({
                success: false,
                message: err.message, 
                stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
        });

        // --- Start Server ---
        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => {
            console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        });

    } catch (error) {
        console.error('💥 Failed to start server', error);
        process.exit(1);
    }
};

startServer();