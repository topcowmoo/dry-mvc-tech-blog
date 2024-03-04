const router = require('express').Router();
const { Post } = require('../../models');
const { apiAuth } = require('../../utils/auth');

router.post('/', apiAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', apiAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'Post ID not found' });
      return;
    }

    const deletedPost = await Post.findByPk(req.params.id);

    res.status(200).json({ message: 'Post deleted successfully', deletedPost });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
