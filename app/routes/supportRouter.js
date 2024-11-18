import express from 'express'
const supportRouter = express.Router();
import { getAll,createSupport,editSupport,deleteSupport } from '../controllers/supportController.js';
import protect from '../middlewares/authMiddleWare.js'
import isAdmin from '../middlewares/isAdmin.js'

supportRouter.get('/', protect, getAll)
supportRouter.post('/new', isAdmin, createSupport)
supportRouter.post('/edit', isAdmin, editSupport)
supportRouter.post('/delete', isAdmin, deleteSupport)


export default supportRouter;