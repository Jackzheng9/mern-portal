import express from 'express'
import { createSolution } from '../controllers/solutionController.js'

const solutionRouter = express.Router()

solutionRouter.get('/',(req,res) => {
  res.status(200).json({message:"Solution Route"})
})

solutionRouter.post('/newsolution', createSolution)

export default solutionRouter;