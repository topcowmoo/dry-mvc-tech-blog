const router = require('express').Router();
const { Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.body.post_id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const commentData = await Comment.create({
      content: req.body.content,
      user_id: req.body.user_id,
      post_id: req.body.post_id
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;