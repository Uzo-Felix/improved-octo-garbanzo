const { User, Organization } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(422).json({ errors: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ firstName, lastName, email, password: hashedPassword, phone });

    // Create default organization
    const organizationName = `${firstName}'s Organization`;
    const organization = await Organization.create({ name: organizationName, userId: user.id });

    // Associate the organization with the user
    await user.addOrganization(organization);

    // Fetch the user with the associated organization
    const userWithOrg = await User.findByPk(user.id, {
      include: [{ model: Organization }]
    });

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ user: userWithOrg, token });
  } catch (error) {
    console.error('Registration error:', error);
    // Log more details about the error
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ errors: 'Registration failed', details: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ errors: 'Authentication failed' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ errors: 'Authentication failed' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ errors: error.message });
  }
};
