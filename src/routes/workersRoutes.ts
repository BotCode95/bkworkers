import express from 'express'
import { createWorker, getWorker, updateWorker,updateStatus } from '../controller/workers'


const router = express.Router()


/**
 * @swagger
 * /api/workers:
 *   get:
 *     summary: Retrieve a list of workers
 *     tags: [Workers]
 *     responses:
 *       200:
 *         description: A list of workers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   position:
 *                     type: string
 */
router.get('/', getWorker)
router.post('/', createWorker)
router.put('/:id', updateWorker)
router.patch('/:id', updateStatus)


export default router