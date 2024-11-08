import express from 'express'
import { getAll, createNotification } from '../controllers/notificationController.js';


const notificationRouter = express.Router()

notificationRouter.get('/', getAll);
notificationRouter.post('/new', createNotification);

export default notificationRouter;