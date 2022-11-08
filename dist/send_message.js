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
const api_js_1 = require("./api/api.js");
const dotenv = require("dotenv");
const botpress_token_generator_1 = require("./botpress_token_generator");
dotenv.config();
const configuration = {
    SERVER_URL: process.env.SERVER_URL,
    BOTID: process.env.BOTID
};
(0, botpress_token_generator_1.botpress_auth)();
function send_chat_message(type, text, context, metadata, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const include = 'nlu,state,suggestions,decision';
        let outcomming_data = JSON.stringify({
            "text": text,
            "type": type,
            "context": context,
            "metadata": metadata
        });
        try {
            let response = yield (0, api_js_1.default)(`${configuration.SERVER_URL}/api/v1/bots/${configuration.BOTID}/converse/${userID}/secured?include=${include}`, {
                method: 'POST',
                data: outcomming_data
            });
            const cred = Promise.resolve(response.data.payload.jwt);
            return yield cred;
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
//# sourceMappingURL=send_message.js.map