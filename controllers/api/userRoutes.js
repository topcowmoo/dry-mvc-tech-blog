const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Post }, { model: Comment }],
      attributes: { exclude: ['password'] },
    });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve all users' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Post }, { model: Comment }],
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      res.status(404).json({ error: 'User id not found' });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve user data' });
  }
});

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

      res.status(200).json({ message: 'Successfully Signed Up' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to signup' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    });

    if (!user) {
      res.status(400).json({ error: 'Invalid username or password' });
      return;
    }

    const passwordIsValid = user.checkPassword(req.body.password);

    if (!passwordIsValid) {
      res.status(400).json({ error: 'Invalid username or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ message: 'Successfully logged in', user });
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

router.post('/logout', (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(200).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to logout' });
  }
});

module.exports = router;
