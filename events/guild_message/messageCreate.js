const Logger = require("../../utils/Logger");
const { feurCountSchema } = require('../../data/feur-count-schema.js')
const { optionsSchema } = require('../../data/options-schema.js')
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
            Logger.info(`TG ${message.author.username}`);
        }
        if(message.author.id === "181120771937009664"){ //luunar
            const optionModel = mongoose.model('options', optionsSchema);
            let x = await optionModel.findOne({
            _name: "luunarchapo"
            }).catch(Logger.error);
            Logger.info(`DB OPTIONS : Found : ${x}`);
            if (x.value) {
                message.reply("<:ChapeauChapeau:1143146901995278346>").catch(Logger.error);
            }            
        }
        if(message.content.toLowerCase().includes("ligma")){
            message.reply("Ligma Balls").catch(Logger.error);
            Logger.info(`Ligma balls ${message.author.username}`);
        }
        if(/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/.test(message.content)){
            let url = message.content.match(/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/);
            Logger.info(`LINK : ${message.author.username} | ${message.channel.name} | ${url[1]}`);
            // if(url[0].includes(".instagram")){
            //     message.reply(url[0].slice(0, 12)+"dd"+url[0].slice(12));
            // }
            if(url[0].includes("twitter") && !url[0].includes("xtwitter")){
                message.reply(url[0].slice(0, 8)+"vx"+url[0].slice(8));
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
            || message.content.toLowerCase().replace(regexPattern, "").includes("crampte")
            || message.content.toLowerCase().replace(regexPattern, "").includes("crampté")
            || message.content.toLowerCase().replace(regexPattern, "").includes("cranpte")
            || message.content.toLowerCase().replace(regexPattern, "").includes("cranpté")){
            message.reply("Quoicoubaise ta mère.").catch(error => console.log(error));

            const min = 1;
            const max = 30;

            const time = Math.random() * (max - min) + min;

            message.member.timeout(time * 60 * 1000)
                .catch(Logger.error)
                .then(() => Logger.info(`Apagnan | ${message.author.username} a été crampté pour ${time} min`));
            client.users.send('217279235021209600', `Apagnan | ${message.channel.name} | ${message.author.username} a été crampté pour ${time} min`);
        }
        if(message.content.toLowerCase().replace(regexPattern, "").replace().includes("flipreset"))
        {
            message.reply("C'est ta mère que je flip reset");
            Logger.info(`Flip reset ${message.author.username} | ${message.channel.name}`);
        }
        if(message.content.toLowerCase().replace(regexPattern, "").replace().includes("démonte") && Math.random() < 0.30)
        {
            message.reply("C'est ta mère que je démonte");
            Logger.info(`Démonte ${message.author.username} | ${message.channel.name}`);
        }
        if( (message.content.toLowerCase().replace(regexPattern, "").replace().includes("soulèv")
        || message.content.toLowerCase().replace(regexPattern, "").replace().includes("soulev")) 
        && Math.random() < 0.30)
        {
            message.reply("C'est ta mère que je soulève");
            Logger.info(`Soulève ${message.author.username} | ${message.channel.name}`);
        }
        if(message.content.toLowerCase().replace(regexPattern, "").replace().includes("neodrift")
        || message.content.toLowerCase().replace(regexPattern, "").replace().includes("néodrift"))
        {
            message.reply("Je néo drift dans ta daronne");
            Logger.info(`Neo ${message.author.username} | ${message.channel.name}`);
        }
        if(message.content.toLowerCase().replace(regexPattern, "").replace().includes("quoi") && Math.random() < 0.10)
        {
            if(message.content.toLowerCase().includes("pourquoi")){
                message.reply("Pour Feur").catch(error => console.log(error));
            } else {
                message.reply("Feur").catch(error => console.log(error));
            }
            Logger.info(`Feur ${message.author.username} | ${message.channel.name}`);
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
            Logger.info(`Qword ${message.author.username} | ${message.channel.name}`);

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