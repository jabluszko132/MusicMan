const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

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
        const channel = interaction.member.voice.channel;
        if(!channel) {
            await interaction.reply("You must be in a vc to use this command.");
            return;
        } 
        



        if(interaction.options.getSubcommand() === 'search'){
            let url = interaction.options.getString('searchterms');
            const { track } = await interaction.client.player.play(channel.id,url);

            // , {nodeOptions: {
            //     metadata:{
            //     requestedBy: interaction.user,
            //     searchEngine: QueryType.YOUTUBE_VIDEO,
            //     }
            // }}


            // if(result.tracks.length === 0){
            //     await interaction.reply('No results found!');
            //     return;
            // }

            // const song = result.tracks[0];

            // await query.addTrack(song);

            let embed = new EmbedBuilder()
                .setTitle('New song appeared!')
                .setDescription(`Added "${track.title}" to the query. `)
                .setColor([50,50,50])
            await interaction.reply({embeds: [embed]});
        }
    }
}   