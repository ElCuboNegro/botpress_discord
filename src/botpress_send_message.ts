 import configService from './api/api.js';
 import * as dotenv from 'dotenv';
 import { botpress_auth } from './botpress_token_generator';
 dotenv.config()

 const configuration = {
    SERVER_URL: process.env.SERVER_URL,
    BOTID: process.env.BOTID
  };

  botpress_auth()

/**
  * Sends the messages to the botpress API
  * @param type {string} 
 */
export async function botpress_send_message(type: string, text: string, context: string, metadata:JSON, userID) {
    const include = 'nlu,state,suggestions,decision'
    let outcomming_data: String = JSON.stringify({
        "text": text,
        "type": type,
        "context": context,
        "metadata": metadata
    })
    try {
        let response = await configService(`${configuration.SERVER_URL}/api/v1/bots/${configuration.BOTID}/converse/${userID}/secured?include=${include}`, {
            method: 'POST',
            data: outcomming_data
        });
        
        const cred = Promise.resolve(response.data.payload.jwt)
        return await cred;
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
}