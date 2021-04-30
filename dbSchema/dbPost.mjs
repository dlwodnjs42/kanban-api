import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    id: Number,
    column_id: Number,
    user_id: Number,
    title: String,
    description: String,
    story_points: Number,
    created_at: Date,
    updated_at: Date
});

// sql tables = collection
export default mongoose.model('posts', postSchema);
