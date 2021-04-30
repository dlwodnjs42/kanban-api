import mongoose from "mongoose";

const columnSchema = mongoose.Schema({
    id: Number,
    dashboard_id: Number,
    title: String
});

// sql tables = collection
export default mongoose.model('columns', columnSchema);
