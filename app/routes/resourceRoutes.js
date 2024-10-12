import express from 'express'
import { getAdminAllResources, createResource } from '../controllers/resourceController.js'
import isAdmin from '../middlewares/isAdmin.js'
import protect from '../middlewares/authMiddleWare.js'

const resourceRouter = express.Router()

resourceRouter.get('/',getAdminAllResources)
resourceRouter.post('/newresource',createResource)

// solutionRouter.get('/', isAdmin, getAdminAllSolution)
// solutionRouter.get('/all', protect, getAllSolution)
// solutionRouter.get('/:slug',protect, getSolutionBySlug)
// solutionRouter.post('/edit',isAdmin, editSolution)

// solutionRouter.post('/newsolution', createSolution)

export default resourceRouter;