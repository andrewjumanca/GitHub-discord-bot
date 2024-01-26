import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    channelId: { type: String, required: true, unique: true},
    channelName: { type: String, required: true },
    subscribedRepositories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Repository' }]
})

const Channel = mongoose.model('Channel', channelSchema);

export { Channel };