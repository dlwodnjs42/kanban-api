import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // it needs to find the user who is reporting this ticket
    title: String,
    description: String,
    story_points: Number,
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // a story might be assigned to a different user
    created_at: Date,
    updated_at: Date
});

// sql tables = collection
export default mongoose.model('posts', postSchema);
