const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  AttachmentBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName("mm")
    .setDescription("Send the Swaphelper guide")
    .toJSON()
];

const rest = new REST({ version: "10" })
  .setToken(process.env.DISCORD_TOKEN);

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  );

  console.log("MM command registered!");
  await client.login(process.env.DISCORD_TOKEN);
})();

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "mm") {
    const image = new AttachmentBuilder(
      "./file_00000000ed388243bb99dffaae66980f.jpg"
    );

    await interaction.reply({
      content: "Here is the Swaphelper guide:",
      files: [image]
    });
  }
});
const http = require("http");

http.createServer((req, res) => {
  res.end("Bot is online!");
}).listen(process.env.PORT || 10000, "0.0.0.0");
