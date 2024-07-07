const { Organization, User } = require('../models');

exports.createOrganization = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.userId;  // Assume `req.user` contains the authenticated user info

    if (!name) {
      return res.status(400).send({
        status: "Bad Request",
        message: "Name is required",
        statusCode: 400
      });
    }

    const organization = await Organization.create({ name, description });
    const user = await User.findByPk(userId);
    await user.addOrganization(organization);

    res.status(201).send({
      status: 'success',
      message: 'Organization created successfully',
      data: {
        orgId: organization.orgId,
        name: organization.name,
        description: organization.description
      }
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.getUserOrganizations = async (req, res) => {
  try {
    const userId = req.user.userId;  // Assume `req.user` contains the authenticated user info
    const user = await User.findByPk(userId, { include: Organization });

    res.status(200).send({
      status: 'success',
      message: 'organizations retrieved successfully',
      data: {
        organizations: user.Organizations
      }
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.getOrganizationById = async (req, res) => {
  try {
    const { orgId } = req.params;
    const userId = req.user.userId;  // Assume `req.user` contains the authenticated user info

    const organization = await Organization.findByPk(orgId, {
      include: [{
        model: User,
        where: { userId }
      }]
    });

    if (!organization) {
      return res.status(404).send({
        status: 'Not Found',
        message: 'Organization not found',
        statusCode: 404
      });
    }

    res.status(200).send({
      status: 'success',
      message: 'Organization retrieved successfully',
      data: {
        orgId: organization.orgId,
        name: organization.name,
        description: organization.description
      }
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.addUserToOrganization = async (req, res) => {
  try {
    const { userId } = req.body;
    const { orgId } = req.params;

    const user = await User.findByPk(userId);
    const organization = await Organization.findByPk(orgId);

    if (!user || !organization) {
      return res.status(404).send({
        status: 'Not Found',
        message: 'User or Organization not found',
        statusCode: 404
      });
    }

    await Organization.addUser(user);

    res.status(200).send({
      status: 'success',
      message: 'User added to organization successfully'
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
