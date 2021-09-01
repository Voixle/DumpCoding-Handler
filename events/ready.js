const client = require("../index");
const chalk = require('chalk');

client.on("ready", () => {
    console.log(chalk.blue.bold(`${client.user.tag} Is Online!`));
    client.user.setActivity(`under Development`)
});
