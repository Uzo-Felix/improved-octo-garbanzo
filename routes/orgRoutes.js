const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createOrganization, getUserOrganizations, getOrganizationById, addUserToOrganization } = require('../controllers/orgController');

router.post('/', authMiddleware, createOrganization);
router.get('/', authMiddleware, getUserOrganizations);
router.get('/:orgId', authMiddleware, getOrganizationById);
router.post('/:orgId/users', authMiddleware, addUserToOrganization);

module.exports = router;

/**
 * @swagger
 * /api/organizations:
 *   post:
 *     summary: Create a new organization
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Organization created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 * 
 * @swagger
 * /api/organizations:
 *   get:
 *     summary: Get all organizations for a user
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organizations retrieved successfully
 *       500:
 *         description: Server error
 * 
 * @swagger
 * /api/organizations/{orgId}:
 *   get:
 *     summary: Get an organization by ID
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orgId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Organization found
 *       404:
 *         description: Organization not found
 *       500:
 *         description: Server error
 * 
 * @swagger
 * /api/organizations/{orgId}/users:
 *   post:
 *     summary: Add a user to an organization
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orgId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added to organization successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Organization not found
 *       500:
 *         description: Server error */