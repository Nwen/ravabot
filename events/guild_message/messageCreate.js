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
            message.reply("Tg");
        }
        if(message.content.toLowerCase().includes("ligma")){
            message.reply("Ligma Balls");
        }
        if(message.content.toLowerCase().includes("ligma")){
            message.reply("Ligma Balls");
        }
        if(/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/.test(message.content)){
            var url = message.content.match(/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/);
            if(url.includes("instagram")){
                message.reply(url.slice(0, 12)+"dd"+url.slice(12));
            } 
            else if(url.includes("twitter")){
                message.reply(url.slice(0, 8)+"fx"+url.slice(8));
            }
        }
        if(message.content.toLowerCase().includes("quoicoubeh") 
            || message.content.toLowerCase().includes("apagnan")
            || message.content.toLowerCase().includes("cramptés")
            || message.content.toLowerCase().includes("crampter")
            || message.content.toLowerCase().includes("crampté")
            || message.content.toLowerCase().includes("crampters")){
            message.reply("Baise ta mère");
            message.member.timeout(5 * 60 * 1000)
                .then(() => console.log("Timed out member"))
                .catch(console.log);
        }
        if(message.content.toLowerCase().replace(regexPattern, "").replace().includes("quoi") && Math.random() < 0.10)
        {
            if(message.content.toLowerCase().includes("pourquoi")){
                message.reply("Pour Feur");
            } else {
                message.reply("Feur");
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