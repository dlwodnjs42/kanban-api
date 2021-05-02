import mongoose from "mongoose";

const dashboardSchema = mongoose.Schema({
    project_title: String,
    project_description: String,
    lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: []
    }], // a dashboard needs to find all users to see who we can assign the task to
    columns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'column',
        default: []
    }] // a dashboard needs to be able to see which columns are tied to which posts.
});



// sql tables = collection
export default mongoose.model('dashboard', dashboardSchema);
