import configService from './botpress_api';


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
        let endpoint = await configService('api/v1/auth/login/basic/default', {
            method: 'POST'
        });
        
        //let cred = await Promise.resolve(endpoint.data.payload.jwt)
        let response = await endpoint.request({data: {
            email: configuration.AUTH_EMAIL,
            password: configuration.AUTH_PASSWORD
        }});

        let cred = response.data.payload.jwt
        console.log(cred)
        if (cred) {
            configService.defaults.headers.common['Authorization'] = `Bearer ${cred}`;
            return {
                status: "ok",
                message: cred
            }
        }
        throw new Error('Promisse rejected');
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
