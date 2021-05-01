import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    id: Number,
    column_id: Number,
    user_id: Number,
    title: String,
    description: String,
    story_points: Number,
    assigned_to: { type: Schema.Types.ObjectId, ref: 'User' },
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: Date,
    updated_at: Date
});

// sql tables = collection
export default mongoose.model('posts', postSchema);
