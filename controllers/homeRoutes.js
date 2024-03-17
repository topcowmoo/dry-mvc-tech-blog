const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

// GET route for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route for dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          where: { username: req.session.username },
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
      currentUser: req.session.username,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route for login page
router.get('/login', (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route for signup page
router.get('/signup', (req, res) => {
  try {
    res.render('signUp');
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route to create new post
router.get('/createPost', withAuth, (req, res) => {
  try {
    res.render('createPost', {
      loggedIn: req.session.loggedIn,
      user: { username: req.session.username },
    });
  } catch (err) {
    ({ error: 'Internal Server Error' });
  }
});

// GET route to view post and its comments by ID
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('viewComments', {
      ...post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/editpost/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with that ID' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('editpost', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
