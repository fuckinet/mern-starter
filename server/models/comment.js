import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  cuid: { type: 'String', required: true },
  name: { type: 'String', required: true },
  text: { type: 'String', required: true },
  postCuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Comment', postSchema);
