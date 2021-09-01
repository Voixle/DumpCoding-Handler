const client = require("../index");
const { Collection } = require('discord.js')
const Timeout = new Collection();
const ms = require('ms');
const { owners } = require("../config.json");
const { MessageEmbed } = require('discord.js');

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (command) {
        
        if (!message.member.permissions.has(command.UserPermission || [])) return message.channel.send(`**[ERROR]: You need \`${command.UserPermission || []}\` Permission. before using this Command!**`)

        
        if (!message.guild.me.permissions.has(command.BotPermission || [])) return message.channel.send(`**[ERROR]: I need \`${command.BotPermission || []}\` Permission. Before i can Execute this Command.**`)

    }

    if (command) {
        if(command.timeout) {
            if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`**❌ Please wait. You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` Cooldown.**`)
            Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`)
            }, command.timeout)
        }
    }

    if (command) {
        if (command.ownerOnly) {
       if (!owners.includes(message.author.id))
       { const ownerOnly = new MessageEmbed()
        .setColor("BLURPLE")
        .setDescription("**[ERROR]: This Command only works for Developers**"); 
       return message.channel.send({ embeds: [ownerOnly]})
       }
    }
}   

    if (!command) return;
    await command.run(client, message, args);
});
