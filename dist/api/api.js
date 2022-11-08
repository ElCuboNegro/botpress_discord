"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const axios_1 = require("axios");
dotenv.config();
const configuration = {
    SERVER_URL: process.env.SERVER_URL
};
const configService = axios_1.default.create({
    baseURL: configuration.SERVER_URL,
    headers: {
        'accept-language': 'es',
        'Content-Type': 'application/json',
    }
});
exports.default = configService;
//# sourceMappingURL=api.js.map