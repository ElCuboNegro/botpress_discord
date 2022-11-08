"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.botpress_auth = void 0;
const api_js_1 = require("./api/api.js");
const configuration = {
    SERVER_URL: process.env.SERVER_URL,
    AUTH_EMAIL: process.env.AUTH_EMAIL,
    AUTH_PASSWORD: process.env.AUTH_PASSWORD
};
function botpress_auth() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let endpoint = yield (0, api_js_1.default)('api/v1/auth/login/basic/default', {
                method: 'POST'
            });
            let response = yield endpoint.request({ data: {
                    email: configuration.AUTH_EMAIL,
                    password: configuration.AUTH_PASSWORD
                } });
            let cred = response.data.payload.jwt;
            console.log(cred);
            if (cred) {
                api_js_1.default.defaults.headers.common['Authorization'] = `Bearer ${cred}`;
                return {
                    status: "ok",
                    message: cred
                };
            }
            else {
                throw new Error('Promisse rejected');
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log('error message: ', error.message);
                return error.message;
            }
            else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    });
}
exports.botpress_auth = botpress_auth;
//# sourceMappingURL=botpress_token_generator.js.map