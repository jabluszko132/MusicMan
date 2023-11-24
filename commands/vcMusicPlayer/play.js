const { SlashCommandBuilder } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays a song from given yt url")
        .addSubcommand(subcommand => 
            subcommand
                .setName("search")
                .setDescription("searches yt for a song with given name")
                .addStringOption(option => 
                    option.setName('searchterms')
                        .setDescription("search keywords")
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        if(!interaction.memeber.voice.channel) {
            await interaction.reply("You must be in a vc to use this command.");
            return;
        } 
        
        const queue = await interaction.client.player.createQueue(interaction.guild);

        if(!queue.connection) await queue.connect(interaction.memeber.voice.channel);

        let embed = new MessageEmbed();

        switch(interaction.option.getSubcommand()){
            case 'search': 
                let url = interaction.options.getString('url');

                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO,
                });
                break;
            default:
                await interaction.reply('Incorrect option');
                return;
        }

        if(interaction.option.getSubcommand() === 'search'){
            let url = interaction.options.getString('url');

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO,
            });

            if(result.tracks.length === 0){
                await interaction.reply('No results found!');
                return;
            }

            const song = result.tracks[0];

            await queue.addTrack(song);

            embed
                .setTitle('New song appeared!')
                .setDescription(`Added "${song.title}" to the queue. `)
                .setThumbnail(song.thumbnail)
                .setColor([50,50,50])
            await interaction.reply({embeds: [embed]});
        }
    }
}   