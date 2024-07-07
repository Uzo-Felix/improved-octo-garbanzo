const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserById } = require('../controllers/userController');

router.get('/:id', authMiddleware, getUserById);

module.exports = router;

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */