import { botpress_auth } from './src/botpress_token_generator.js';

const jwt_auth =  await botpress_auth();
console.log(jwt_auth);