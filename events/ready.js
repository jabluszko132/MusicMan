const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		try{
			await client.player.extractors.loadDefault((ext)=>ext == 'YoutubeExtractor');
			console.log('Succesfully loaded player extractor');
		}catch(error){
			console.log('An error ocurred loading player extractor: ',error);
		}
		
	},
};

