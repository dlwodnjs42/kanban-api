import mongoose from "mongoose";

const dashboardSchema = mongoose.Schema({
    id: String,
    users_id: String
});



// sql tables = collection
export default mongoose.model('dashboards', dashboardSchema);
