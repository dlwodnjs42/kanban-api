import mongoose from "mongoose";

const dashboardSchema = mongoose.Schema({
    _id = Schema.Types.ObjectId,
    project_title: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }], // a dashboard needs to find all users to see who we can assign the task to
    columns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column'
    }] // a dashboard needs to be able to see which columns are tied to which posts.
});



// sql tables = collection
export default mongoose.model('dashboards', dashboardSchema);
