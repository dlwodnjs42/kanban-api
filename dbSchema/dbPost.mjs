import mongoose from "mongoose";

const postSchema = mongoose.Schema({
     // it needs to find the user who is reporting this ticket
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: String,
    description: String,
    story_points: Number,
    // a story might be assigned to a different user
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// sql tables = collection
export default mongoose.model('post', postSchema);
