const client = require("../index");

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
        
        if (!message.member.permissions.has(command.UserPermission || [])) return message.channel.send(`**You need \`${command.UserPermission || []}\` Permission. before using this Command!**`)

        
        if (!message.guild.me.permissions.has(command.BotPermission || [])) return message.channel.send(`**I need \`${command.BotPermission || []}\` Permission. Before i can Execute this Command.**`)

    }

    if (!command) return;
    await command.run(client, message, args);
});
