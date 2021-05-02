import mongoose from "mongoose";

// created a column schema because a post must keep track of which column its placed.
const columnSchema = mongoose.Schema({
    column_title: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]// a column needs to be able to reference all the posts.
});




// sql tables = collection
export default mongoose.model('column', columnSchema);
