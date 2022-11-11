const Logger = require("../../utils/Logger");
const mongoose = require('mongoose')

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
        client.user.setActivity('Un bot ravagé');
    }
}