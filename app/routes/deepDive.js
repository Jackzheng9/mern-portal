import express from 'express'
const deepDiveRouter = express.Router()
import { getAll,createDeepDive, editDeepDive } from '../controllers/deepDiveController.js'
import protect from '../middlewares/authMiddleWare.js'


deepDiveRouter.get('/', protect, getAll)
deepDiveRouter.post('/new', protect, createDeepDive)
deepDiveRouter.post('/edit', protect, editDeepDive)


export default deepDiveRouter;