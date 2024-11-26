import express from 'express'
import { getAdminAllResources, createResource, getResourceBySlug, editResource, deleteResource } from '../controllers/resourceController.js'
import isAdmin from '../middlewares/isAdmin.js'
import protect from '../middlewares/authMiddleWare.js'

const resourceRouter = express.Router()

resourceRouter.get('/',getAdminAllResources)
resourceRouter.post('/newresource',createResource)
resourceRouter.get('/:slug',getResourceBySlug)
resourceRouter.post('/edit',editResource)
resourceRouter.post('/delete',deleteResource)

export default resourceRouter;