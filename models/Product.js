import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
