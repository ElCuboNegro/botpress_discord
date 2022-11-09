import * as dotenv from 'dotenv';
import { botpress_send_message } from "../api_messages_handler/botpress_send_message";

dotenv.config();

export function query_discord_message(stream:any){
    
    if(stream.author.bot) return;
    if(stream == ''){
      return stream.reply(`the message is empty when reaches the adapter, review the discord permissions`)
    } else {
        const prompt: string = stream.content;
        const user_id: string = `${stream.author.username}_${stream.author.discriminator}`
        const metadata: JSON = stream
        (async () => {
                let response = await botpress_send_message('text', prompt ,'discord', metadata, user_id,)
            console.log(response);
            stream.reply(response);
            }
    )();
    }
}
