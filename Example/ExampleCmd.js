const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "",
    aliases: [''],
    description: "",
    BotPermission: [''],
    UserPermission: [''],
    timeout: 10000, // In milliseconds
    ownerOnly: true, // or false
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {},
};
