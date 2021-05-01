import mongoose from "mongoose";

const dashboardSchema = mongoose.Schema({
    id: String,
    users_id: String,
    columns: [{
        column_title: String,
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }]
    }]
});



// sql tables = collection
export default mongoose.model('dashboards', dashboardSchema);
