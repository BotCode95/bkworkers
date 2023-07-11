"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workers_1 = require("../controller/workers");
const router = express_1.default.Router();
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
router.get('/', workers_1.getWorker);
router.post('/', workers_1.createWorker);
router.put('/:id', workers_1.updateWorker);
router.patch('/:id', workers_1.updateStatus);
exports.default = router;
//# sourceMappingURL=workersRoutes.js.map