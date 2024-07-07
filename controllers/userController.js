const { User, Organization } = require('../models');

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;  // Assume `req.user` contains the authenticated user info

    if (id !== userId) {
      return res.status(403).send({
        status: 'Forbidden',
        message: 'You are not authorized to view this user',
        statusCode: 403
      });
    }

    const user = await User.findByPk(id, {
      attributes: ['userId', 'firstName', 'lastName', 'email', 'phone'],
      include: [Organization]
    });

    if (!user) {
      return res.status(404).send({
        status: 'Not Found',
        message: 'User not found',
        statusCode: 404
      });
    }

    res.status(200).send({
      status: 'success',
      message: 'User retrieved successfully',
      data: user
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
