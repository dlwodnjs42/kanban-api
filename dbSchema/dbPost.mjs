import mongoose from "mongoose";

const postSchema = mongoose.Schema({
     // it needs to find the user who is reporting this ticket
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: 'null'

    },
    title: String,
    description: String,
    story_points: Number,
    column: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'column',
        default: 'null'

    },
    // a story might be assigned to a different user
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: 'null'
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
