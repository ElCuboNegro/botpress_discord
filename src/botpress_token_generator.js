import configService from './api/api.js';


const configuration = {
    SERVER_URL: process.env.SERVER_URL,
    AUTH_EMAIL: process.env.AUTH_EMAIL,
    AUTH_PASSWORD:  process.env.AUTH_PASSWORD
};

/**
 * fetch the Botpress bearer token using the .env variables.
 * @param {string} email - the email of the user
 * @param {password} password - the password to access the user account
 */

export async function botpress_auth() {
    try {
        let response = await configService('api/v1/auth/login/basic/default', {
            method: 'POST',
            data: {
                email: configuration.AUTH_EMAIL,
                password: configuration.AUTH_PASSWORD
            }
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
