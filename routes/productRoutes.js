import express from 'express';
import * as ctrl from '../controllers/productController.js';
const router = express.Router();
router.get('/', ctrl.getProducts);
router.get('/:id', ctrl.getProduct);
router.post('/', ctrl.createProduct);
router.put('/:id', ctrl.updateProduct);
router.delete('/:id', ctrl.deleteProduct);
export default router;
