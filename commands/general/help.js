module.exports = {
    name: "help",
    run: async (client, message, args, system) => {
        message.channel.send(client.commands.map(c => `**${process.env.PREFIX}${c.name}**`).join("\n"), { split: true })
    },
};
