// backend/config/cloudinaryConfig.js

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: 'dljbqj5gc',
    api_key: '846629185997155',
    api_secret: '2X6QcO4MhyvuSSksW1e7--9vQrc',
});

console.log('Cloudinary Configuration:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET ? 'Configured' : 'Not Configured',
});

export default cloudinary;


// CLOUDINARY_CLOUD_NAME=dljbqj5gc
// CLOUDINARY_API_KEY=846629185997155
// CLOUDINARY_API_SECRET=2X6QcO4MhyvuSSksW1e7--9vQrc