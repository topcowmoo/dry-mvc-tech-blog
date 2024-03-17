const router = require('express').Router();
const { User } = require('../../models');

//POST route to create a new user
router.post('/signup', async (req, res) => {
  try {
    const usernameExists = await User.findOne({
      where: { username: req.body.username },
    });
    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (!usernameExists && !emailExists) {
      const newUser = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      };
      await User.create(newUser);

      res.redirect('/login');
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to signup' });
  }
});

module.exports = router;
