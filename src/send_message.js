
 import * as dotenv from 'dotenv';
 import axios from 'axios';
 
 dotenv.config()

 const configuration = {
    SERVER_URL: process.env.SERVER_URL,
    BOT_ID: process.env.BOTID
  };


/**
 * 1. se tiene que enviar un mensaje al chat_path
 *  1.1  se necesita incluir el nlu, el state, las suggestions, y la decision
 *  1.2  se necesita enviar la informacion al chat_path
 *     1.2.1 f'{serverurl}/api/v1/bots/{BOTID}/converse/{userID}/secured?include={include}'
 *  1.3 los headers deben tener {'Content-Type': 'application/json', "Authorization": f"Bearer {token}"}
 *  1.4 la data se envia como = f'{{"text":"{text}"}}'

 */
export function send_chat_message(type, text, context, metadata, userID) {
    const include = 'nlu,state,suggestions,decision'
    try {
        let response = await configService(`${configuration.SERVER_URL}/api/v1/bots/${configuration.BOTID}/converse/${userID}/secured?include=${include}`, {
            method: 'POST',
            header: {'Content-Type': 'application/json', "Authorization": f"Bearer {token}"}
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