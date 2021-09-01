const { Message, Client, MessageEmbed } = require("discord.js");
const owner = require('../config.json').owner

module.exports = {
    name: "",
    aliases: [''],
    description: "",
    BotPermission: [''],
    UserPermission: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {},
};

// ____________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________

if (message.author.id != owner) {
    const OwnersEmbed = new MessageEmbed()
    .setColor("BLURPLE")
    .setDescription( "**This Command only works for Developers!**" ); 
    return message.channel.send({ embeds: [OwnersEmbed]})
  }

  require('../commands')