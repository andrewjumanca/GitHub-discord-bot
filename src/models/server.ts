import mongoose from "mongoose";

const serverSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true},
    serverName: { type: String, required: true },
    subscribedRepositories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Repository'
    }]
})

const Server = mongoose.model('Server', serverSchema);

export { Server };