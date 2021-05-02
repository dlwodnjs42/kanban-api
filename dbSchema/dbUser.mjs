import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    dashboards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dashboard'
    }], // a user must be able to check all of its dashboards
    first_name: String,
    last_name: String,
    email: String,
    role: String,
    description: String,
    image_url: String,
    user_name: String,
    password: String
});

// sql tables = collection
export default mongoose.model('user', userSchema);
