const Logger = require("../../utils/Logger");
const mongoose = require('mongoose')
const { feurCountSchema } = require('../../data/feur-count-schema.js')
const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        mongoose.connect(process.env.MONGO_URI, {
            keepAlive: true
        })
            .then(()=> {Logger.client("Succesfully connected to MongoDB")})
            .catch(error => console.log(error));
        Logger.client("RAVABOT ENCLANCHÉ");

        const FeurModel = mongoose.model('feur-counts', feurCountSchema);

        let x = await FeurModel.findOne({
            _id: client.user.id
            });

        client.user.setPresence({
            activities: [{ name: `${x.feurCount} Feurs`, type: ActivityType.Playing }],
        });
    }
}