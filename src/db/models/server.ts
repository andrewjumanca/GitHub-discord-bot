import mongoose from "mongoose";

const serverSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true},
    serverName: { type: String, required: true },
    channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }]
})

const Server = mongoose.model('Server', serverSchema);

export { Server };