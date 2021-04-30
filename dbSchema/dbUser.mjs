import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id: Number,
    dashboard_id: Number,
    name: String,
    role: String,
    description: String,
    image_url: String,
    user_name: String,
    password: String
});

// sql tables = collection
export default mongoose.model('users', userSchema);
