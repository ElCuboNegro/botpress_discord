// the botpress_end
import { botpress_auth } from './api_messages_handler/botpress_token_generator';
import { Client, GatewayIntentBits } from 'discord.js';
import {query_discord_message} from "./api_messages_sources/discord_api";

botpress_auth();

// discord case.
const discord_client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

discord_client.on('connection', (stream) => {
    console.log('someone connected!');
});

discord_client.on("messageCreate", (stream) => {
    console.log(stream)
    query_discord_message(stream);
});
discord_client.login(process.env.BOT_TOKEN);