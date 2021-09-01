const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ['p'],
    description: "Give's you Latency of the Bot!",
    BotPermission: ['SEND_MESSAGES'],
    UserPermission: [''],
    emoji: `🏓`,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let circles = {
            green: "🟢",
            yellow: "🟡",
            red: "🔴"
        }
        let days = Math.floor(client.uptime / 86400000)
        let hours = Math.floor(client.uptime / 3600000) % 24
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60

        let botLatency = new Date() - message.createdAt
        let apiLatency = client.ws.ping;

        const pingEmbed = new MessageEmbed()
            .setColor('BLURPLE')
           
            .addField("Bot Latency",
                `${botLatency <= 200 ? circles.green : botLatency <= 400 ? circles.yellow : circles.red} ${botLatency} Ms`
                , true
            )
            .addField("API Latency",
                `${apiLatency <= 200 ? circles.green : apiLatency <= 400 ? circles.yellow : circles.red} ${apiLatency} Ms`
                , true
            )
            .addField("Client Uptime",
                `${days}d ${hours}h ${minutes}m ${seconds}s`
                , true
            )
        return message.reply({ embeds: [pingEmbed], allowedMentions: { repliedUser: true } })
    },
}