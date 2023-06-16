const Logger = require("../../utils/Logger");
const { feurCountSchema } = require('../../data/feur-count-schema.js')
const { ActivityType } = require('discord.js');
const mongoose = require('mongoose')

const regexPattern = /\s+/g;

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        if (message.author.bot) return;

        if(message.content.includes(client.user.id)){
            message.reply("Tg").catch(error => console.log(error));
        }
        if(message.content.toLowerCase().includes("ligma")){
            message.reply("Ligma Balls").catch(error => console.log(error));
        }
        if(/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/.test(message.content)){
            let url = message.content.match(/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/);
            Logger.info(url[1]);
            if(url[0].includes(".instagram")){
                message.reply(url[0].slice(0, 12)+"dd"+url[0].slice(12));
            } 
            else if(url.includes("twitter") && !url.includes("fxtwitter")){
                message.reply(url[0].slice(0, 8)+"fx"+url[0].slice(8));
            }
        }
        if(message.content.toLowerCase().replace(regexPattern, "").includes("quoicoub") 
            || message.content.toLowerCase().replace(regexPattern, "").includes("kwacoub")
            || message.content.toLowerCase().replace(regexPattern, "").includes("coubeh")
            || message.content.toLowerCase().replace(regexPattern, "").includes("coubé")
            || message.content.toLowerCase().replace(regexPattern, "").includes("apagnan")
            || message.content.toLowerCase().replace(regexPattern, "").includes("apanyae")
            || message.content.toLowerCase().replace(regexPattern, "").includes("apanyan")
            || message.content.toLowerCase().replace(regexPattern, "").includes("kwacoub")
            || message.content.toLowerCase().replace(regexPattern, "").includes("crampter")
            || message.content.toLowerCase().replace(regexPattern, "").includes("crampté")
            || message.content.toLowerCase().replace(regexPattern, "").includes("cranpter")
            || message.content.toLowerCase().replace(regexPattern, "").includes("cranpté")){
            message.reply("Quoicoubaise ta mère.").catch(error => console.log(error));

            const min = 1;
            const max = 30;

            const time = Math.random() * (max - min) + min;

            message.member.timeout(time * 60 * 1000)
                .then(() => Logger.info(`Apagnan ! ${message.member.user.tag} a été crampté pour ${time} min`))
                .catch(Logger.err);
        }
        if(message.content.toLowerCase().replace(regexPattern, "").replace().includes("flipreset"))
        {
            message.reply("C'est ta mère que je flip reset");
        }
        if(message.content.toLowerCase().replace(regexPattern, "").replace().includes("démont") && Math.random() < 0.30)
        {
            message.reply("C'est ta mère que je démonte");
        }
        if(message.content.toLowerCase().replace(regexPattern, "").replace().includes("soulèv") && Math.random() < 0.30)
        {
            message.reply("C'est ta mère que je soulève");
        }
        if(message.content.toLowerCase().replace(regexPattern, "").replace().includes("quoi") && Math.random() < 0.10)
        {
            if(message.content.toLowerCase().includes("pourquoi")){
                message.reply("Pour Feur").catch(error => console.log(error));
            } else {
                message.reply("Feur").catch(error => console.log(error));
            }
            const FeurModel = mongoose.model('feur-counts', feurCountSchema);
            await FeurModel.findOneAndUpdate({
            _id: client.user.id
            }, {
            _id: client.user.id,
            $inc : {
                feurCount: 1
            }
            }, {
            upsert: true
            });
        
            let x = await FeurModel.findOne({
            _id: client.user.id
            });

            await client.user.setPresence({
                activities: [{ name: `${x.feurCount} Feurs`, type: ActivityType.Playing }],
            });
        }

        if(message.content.toLowerCase().includes("qword") || message.content.toLowerCase().includes("q-word")){
            message.reply("F word");

            const FeurModel = mongoose.model('feur-counts', feurCountSchema);
            await FeurModel.findOneAndUpdate({
            _id: client.user.id
            }, {
            _id: client.user.id,
            $inc : {
                feurCount: 1
            }
            }, {
            upsert: true
            });
        
            let x = await FeurModel.findOne({
            _id: client.user.id
            });

            client.user.setPresence({
                activities: [{ name: `${x.feurCount} Feurs`, type: ActivityType.Playing }],
            });
        }
    }
}