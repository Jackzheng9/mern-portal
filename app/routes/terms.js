import express from 'express'
const termsRouter = express.Router();
import { getAll, createTerms, editTerms } from '../controllers/termsController.js';
import protect from '../middlewares/authMiddleWare.js'
import isAdmin from '../middlewares/isAdmin.js'

termsRouter.get('/', protect, getAll)
termsRouter.post('/new', isAdmin, createTerms)
termsRouter.post('/edit', isAdmin, editTerms)


export default termsRouter;