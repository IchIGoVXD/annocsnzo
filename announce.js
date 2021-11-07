const Discord = require("discord.js");
const bot = new Discord.Client();
var config = require("./config.json");

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.username}!`);
});

bot.on("message", message => {
  const args = message.content.split(" ");
  if (message.author.id != bot.user.id && (message.content[0] === "+" || message.content.indexOf(bot.user.toString()) == 0)) {
    var cmdTxt = message.content.split(" ")[0].substring(1);
    var suffix = message.content.substring(cmdTxt.length + 2);
    if (message.content.indexOf(bot.user.toString()) == 0) {
      try {
        cmdTxt = message.content.split(" ")[1];
        suffix = message.content.substring(bot.user.toString().length + cmdTxt.length + 2);
      } catch (e) {
        message.channel.send("Yes?");
        return;
      }
    }
  }

  const announcerole = ["Announce role"];
  var isAnnounce
  var roles = message.guild.member(message.author.id).roles.array()
  for (var i = 0; i < roles.length; i++) {
    if (announcerole.includes(roles[i].name) || message.author.id === config.owner) {
      isAnnounce = true
      break
    }
  }
  
  if (cmdTxt === "edit") {
    if (!isAnnounce) {
      message.reply("Sorry, you do not have permissions to use this command.")
    }
    if (isAnnounce) {
      const args = message.content.split(" ");
      const [msgid, announcement] = args.slice(1).join(" ").split("|");
      var announcelog = message.guild.channels.find(r => r.id === '712150598262456340')
      if (!announcelog) {
        message.reply("Cannot find channel to use for Announcements!")
        return
      }
      if (announcelog && msgid && announcement) {
        announcelog.messages.fetch(msgid).then(msg => msg.edit(`\n${announcement} \n\n\- Edited by ${message.author}`))
        if (message.attachments) {
          announcelog.send(message.attachments.first())
        }
      }
    }
  }

  if (cmdTxt === "announce") {
    if (!isAnnounce) {
      message.reply("Sorry, you do not have permissions to use this command.")
    }
    if (isAnnounce) {
      const args = message.content.split(" ");
      const [role, announcement] = args.slice(1).join(" ").split("|");
      let myRole = message.guild.roles.find(r => r.name === `${role}`)
      var announcelog = message.guild.channels.find(r => r.id === '712150598262456340')
      if (!announcelog) {
        message.reply("Cannot find channel to use for Announcements!")
        return
      }
      if (!announcement) {
        message.reply("You must input something for the announcement!")
        return
      } else {
        message.reply("Announcement successfully sent!")
      }
      if (announcelog && role && announcement) {
        if (role === "everyone") {
          announcelog.send(`@everyone, \n${announcement} \n\n- ${message.author}`)
          return
        }
        if (role === "here") {
          announcelog.send(`@here, \n${announcement} \n\n- ${message.author}`)
          return
        }
        myRole.setMentionable(true)
        setTimeout(function() {
          announcelog.send(`${myRole}, \n${announcement} \n\n- ${message.author}`)
          setTimeout(function() {
            myRole.setMentionable(false)
          }, 1 * 1000)
        }, 3 * 1000)
      }
    }
  }

  if (cmdTxt === "announce2") {
    if (!isAnnounce) {
      message.reply("Sorry, you do not have permissions to use this command.")
    }
    if (isAnnounce) {
      const args = message.content.split(" ");
      const announcement = args.slice(1).join(" ")
      var announcelog = message.guild.channels.find(r => r.id === '712150598262456340')
      if (!announcelog) {
        message.reply("Cannot find channel to use for Announcements!")
        return
      }
      if (!announcement) {
        message.reply("You must input something for the announcement!")
        return
      } else {
        message.reply("Announcement successfully sent!")
      }
      if (announcelog && announcement) {
        announcelog.send(`${announcement} \n\n- ${message.author}`)
        if (message.attachments) {
          announcelog.send(message.attachments.first())
        }
      }
    }
  }

})

bot.login(config.token);