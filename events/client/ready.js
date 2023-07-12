const Logger = require("../../utils/Logger");
const mongoose = require('mongoose')
const { feurCountSchema } = require('../../data/feur-count-schema.js')
const { ActivityType, time } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        mongoose.set('strictQuery', false);

        mongoose.connect(process.env.MONGO_URI, {
            keepAlive: true
        })
            .then(()=> {Logger.client("Succesfully connected to MongoDB")})
            .catch(error => Logger.error(error));
        Logger.client("RAVABOT ENCLANCHÉ");

        const FeurModel = mongoose.model('feur-counts', feurCountSchema);


        let x = await FeurModel.findOne({
            _id: client.user.id
            }).catch(error => Logger.error(error));

        client.user.setPresence({
            activities: [{ name: `${x.feurCount} Feurs`, type: ActivityType.Playing }]
        });

        const triggerTime = getRandomHour();
        triggerTime.setHours(17,4);

        const now = new Date();
        if(triggerTime.getTime()< now.getTime()){triggerTime.setHours(triggerTime.getHours() + 24)}
        Logger.event(`BeMusic | Next : ${triggerTime}`);


        const firstTriggerAfterMs = triggerTime.getTime() - now.getTime();

        setTimeout(function(){
            beMusicTrigger(client);
            setInterval(beMusicTrigger, 24 * 60 * 60 * 1000);
          }, firstTriggerAfterMs);
    }
}

function getRandomHour(){
    const minh = 7;
    const maxh = 20;
    const hour = Math.random() * (maxh - minh) + minh;
    const minm = 0;
    const maxm = 59;
    const minute = Math.random() * (maxm - minm) + minm;
    const time = new Date(); time.setHours(hour, minute);
    return time
}

function beMusicTrigger(client){
    Logger.event("BeMusic | Triggered")
    client.channels.cache.get(`1128419322402967554`).send(`<@&${'1128418876082888775'}> C'est l'heure de poster la dernière musique que vous avez écoutée !`)
        .catch(error => Logger.error(error));

    const triggerTime = getRandomHour();

    const now = new Date();
    triggerTime.setHours(triggerTime.getHours() + 24); //set trigger to next day
    Logger.event(`BeMusic | Next : ${triggerTime}`)

    const firstTriggerAfterMs = triggerTime.getTime() - now.getTime();

    setTimeout(function(){
        beMusicTrigger(client);
        setInterval(beMusicTrigger, 24 * 60 * 60 * 1000);
        }, firstTriggerAfterMs);
}