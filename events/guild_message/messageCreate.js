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

        if(message.content.toLowerCase().replace(regexPattern, "").replace().includes("quoi")
            || message.content.toLowerCase().replace(regexPattern, "").includes("koi")
            || message.content.toLowerCase().replace(regexPattern, "").includes("qwa")
            || message.content.toLowerCase().replace(regexPattern, "").includes("kwa")
            || message.content.toLowerCase().replace(regexPattern, "").includes("qua"))
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