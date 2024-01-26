import mongoose from "mongoose";

const repositorySchema = new mongoose.Schema({
    repositoryId: { type: String, required: true, unique: true},
    repositoryName: { type: String, required: true },
    secret: { type: String, required: false},
    triggerEvents: [{ type: String, required: true }]
})

const Repository = mongoose.model('Server', repositorySchema);

export { Repository };