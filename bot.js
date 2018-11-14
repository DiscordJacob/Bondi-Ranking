var discord = require('discord.js');
var roblox = require('roblox-js');
var client = new discord.Client();
var token = process.env.BOT_TOKEN
client.login(token)

roblox.login({username: process.env.ROBLOX_USERNAME, password: process.env.ROBLOX_PASSWORD}).then((success) => {

}).catch(() => {console.log("Sorry, it failed.");});


client.on("ready", () => {
  client.user.setGame(`Stealing Pizzas - Don't kill me Pugz`);
  console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  let user = member.user
  console.log(`${user.tag} joined ${guild}`)
});

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  let user = member.user
  console.log(`${user.tag} left ${guild}`)
});

var prefix = '!';
var groupId = process.env.GROUP_ID;
var maximumRank = 500;

function isCommand(command, message){
	var command = command.toLowerCase();
	var content = message.content.toLowerCase();
	return content.startsWith(prefix + command);
}

client.on('message', (message) => {
	if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
    
    if(isCommand('Promote', message)){
        var username = args[1]
        var reason = args.slice(2).join(' ');
    	if (username){
    		message.channel.send(`Checking ROBLOX for ${username}`)
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(groupId, id)
				.then(function(rank){
					if(maximumRank <= rank){
						message.channel.send(`${id} is rank ${rank} and not promotable.`)
                    } 
                    
                    if(!reason){
                        message.channel.send(`***Please add a reason!*** :warning: `)
                    }  else {
						message.channel.send(`${id} is rank ${rank} and promotable.`)
						roblox.promote(groupId, id)
						.then(function(roles){
							client.channels.get('499038177474904066').send({embed: {
								color: 3447003,
								author: {
								  name: client.user.username,
								  icon_url: 'https://images-ext-2.discordapp.net/external/cYnWZBN1C0JfVI6oy4YVlu5Wg3AWAjZ1wOqyjsKMMKU/%3Fsize%3D128/https/cdn.discordapp.com/avatars/511406100990656522/8a501ff2f53ca3ea34ca1fa8317758aa.png'
								},
								title: "**User Promoted:**",
								url: "https://www.roblox.com/My/Groups.aspx?gid=4457840",
								fields: [{
									name: "**User:**",
									value: `${username}`
								  },
								  {
									name: "**Old Rank:**",
									value: `${roles.oldRole.Name}`
								  },
								  {
									name: "**New Rank:**",
									value: `${roles.newRole.Name}`
								  },
								  {
									name: "**Ranked By:**",
									value: `<@${message.author.id}>`
								  },
								  {
									name: "**Reason:**",
									value: `${reason}`
								  },
								],
								timestamp: new Date(),
								footer: {
								  icon_url: 'https://images-ext-2.discordapp.net/external/Vyqr9ahhsz8YXE0lzwNO4ok9WTarlG2gXNuZQWw0IM0/%3Fsize%3D128/https/cdn.discordapp.com/avatars/506539170832056350/009241162c6b78eb449dea6bc443a9da.png',
								  text: "Bot by Jacob#0280 || Bondi Ranking©"
								}
							  }
							});
                            message.channel.send(`**${username}** has been promoted from **${roles.oldRole.Name}** to **${roles.newRole.Name}**!`)
						}).catch(function(err){
							message.channel.send("Failed to promote.")
						});
					}
				}).catch(function(err){
					message.channel.send("Couldn't get him in the group.")
				});
			}).catch(function(err){ 
				message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
			});
    	} else {
    		message.channel.send("Please enter a username.")
    	}
    	return;
	}

    if(isCommand('Demote', message)){
		var username = args[1]
		var reason = args.slice(2).join(' ');
    	if (username){
    		message.channel.send(`Checking ROBLOX for ${username}`)
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(groupId, id)
				.then(function(rank){
					if(maximumRank <= rank){
						message.channel.send(`${id} is rank ${rank} and not promotable.`)
                    } 
                    
                    if(!reason){
                        message.channel.send(`***Please add a reason!*** :warning: `)
                    }  else {
                        message.channel.send(`${id} is rank ${rank} and demoteable.`)
						roblox.demote(groupId, id)
						.then(function(roles){
							client.channels.get('499038177474904066').send({embed: {
								color: 3447003,
								author: {
								  name: client.user.username,
								  icon_url: 'https://images-ext-2.discordapp.net/external/cYnWZBN1C0JfVI6oy4YVlu5Wg3AWAjZ1wOqyjsKMMKU/%3Fsize%3D128/https/cdn.discordapp.com/avatars/511406100990656522/8a501ff2f53ca3ea34ca1fa8317758aa.png'
								},
								title: "**User Demoted:**",
								url: "https://www.roblox.com/My/Groups.aspx?gid=4457840",
								fields: [{
									name: "**User:**",
									value: `${username}`
								  },
								  {
									name: "**Old Rank:**",
									value: `${roles.oldRole.Name}`
								  },
								  {
									name: "**New Rank:**",
									value: `${roles.newRole.Name}`
								  },
								  {
									name: "**Ranked By:**",
									value: `<@${message.author.id}>`
								  },
								  {
									name: "**Reason:**",
									value: `${reason}`
								  },
								],
								timestamp: new Date(),
								footer: {
								  icon_url: 'https://images-ext-2.discordapp.net/external/Vyqr9ahhsz8YXE0lzwNO4ok9WTarlG2gXNuZQWw0IM0/%3Fsize%3D128/https/cdn.discordapp.com/avatars/506539170832056350/009241162c6b78eb449dea6bc443a9da.png',
								  text: "Bot by Jacob#0280 || Bondi Ranking©"
								}
							  }
							});
                            message.channel.send(`**${username}** has been demoted from **${roles.oldRole.Name}** to **${roles.newRole.Name}**!`)
						}).catch(function(err){
							message.channel.send("Failed to demote.")
						});
					}
				}).catch(function(err){
					message.channel.send("Couldn't get him in the group.")
				});
			}).catch(function(err){ 
				message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
			});
    	} else {
    		message.channel.send("Please enter a username.")
    	}
    	return;
	}




    if (isCommand("shout", message)) {
        // if(!message.member.roles.some(r=>["ROLE", "ROLE"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        //return message.reply("You can't use this command.");
        if (!args) { // Check if there's no arguments to use to shout, and return (stop going further)
            return;
            message.channel.send('Please specify a message to shout.') }

        const shoutMSG = args.join(" ").slice(7); // Joins the arguments minus prefix to form the message to be shouted
        client.channels.get('499038177474904066').send(`<@${message.author.id}> Shouted ${shoutMSG}`)


        roblox.shout(groupId, shoutMSG)
            .then(function() {
                console.log(`Shouted ${shoutMSG}`); // OPTIONAL - Logs specified string to the console
                // message.channel.send('Shouted to the group!') // OPTIONAL - Sends a message to the channel
            })
            .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
                console.log(`Shout error: ${error}`) // Log the error to console if there is one.
            });
}

});
