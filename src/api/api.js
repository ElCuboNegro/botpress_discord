import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

// This package handles all the connections with the Botpress API
const configuration = {
    SERVER_URL: process.env.SERVER_URL,
    AUTH_EMAIL: process.env.AUTH_EMAIL,
    AUTH_PASSWORD:  process.env.AUTH_PASSWORD
  };

const configService = axios.create({
    baseURL: configuration.SERVER_URL,
    headers: {
        'accept-language': 'es',
        'Content-Type': 'application/json',
    }
});

export default configService;