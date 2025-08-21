import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 5, sortField = 'created_at', sortOrder = 'desc' } = req.query;
    const perPage = parseInt(limit) || 5;
    const currentPage = parseInt(page) || 1;

    let query = {};
    if (search) {
      // try text search then fallback to regex
      try { query = { $text: { $search: search } }; }
      catch (e) { query = { $or: [ { name: { $regex: search, $options: 'i' } }, { mobile: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } } ] }; }
    }

    const sortObj = { [sortField]: sortOrder === 'asc' ? 1 : -1 };
    const [items, total] = await Promise.all([ Product.find(query).sort(sortObj).skip((currentPage-1)*perPage).limit(perPage), Product.countDocuments(query) ]);
    res.json({ products: items, total, totalPages: Math.ceil(total/perPage), currentPage });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
};

export const getProduct = async (req, res) => {
  try { const p = await Product.findById(req.params.id); if(!p) return res.status(404).json({ error:'not found' }); res.json(p); } catch(e){ res.status(400).json({ error: e.message }); }
};

export const createProduct = async (req, res) => {
  try { const { name, mobile, email } = req.body; if(!name||!mobile||!email) return res.status(400).json({ error:'name,mobile,email required' }); const created = await Product.create({ name, mobile, email }); res.status(201).json(created); } catch(e){ res.status(400).json({ error: e.message }); }
};

export const updateProduct = async (req, res) => {
  try { const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if(!updated) return res.status(404).json({ error:'not found' }); res.json(updated); } catch(e){ res.status(400).json({ error: e.message }); }
};

export const deleteProduct = async (req, res) => {
  try { const deleted = await Product.findByIdAndDelete(req.params.id); if(!deleted) return res.status(404).json({ error:'not found' }); res.json({ message:'deleted' }); } catch(e){ res.status(400).json({ error: e.message }); }
};
