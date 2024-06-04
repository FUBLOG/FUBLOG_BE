"use strict";

const { Client, GatewayIntentBits } = require("discord.js");

const { CHANELID_DISCORD, BOT_TOKEN_DIS } = process.env;
class LoggerService {
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
    //add channel id
    this.client.login(BOT_TOKEN_DIS);
  }
  sendToMessage( message ) {
    const chanel = this.client.channels.cache.get(CHANELID_DISCORD);
    if (!chanel) {
      console.log("Error send message to discord", CHANELID_DISCORD);
      return;
    }
    chanel.send(message).catch((err) => {
      console.log("Error send message to discord", err);
    });
  }
  sendToFormatCode(logData) {
    const {
      code,
      message = "this is message",
      title = "this is title",
    } = logData;

    const codeMessage = {
      content: message,
      embeds: [
        {
          color: parseInt("00ff00", 16),
          title,
          description: "```json\n" + JSON.stringify(code, null, 2) + "\n```",
        },
      ],
    };
    this.sendToMessage(codeMessage);
  }
}
const logger = new LoggerService();
module.exports = logger;
