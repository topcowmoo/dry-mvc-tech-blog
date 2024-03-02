const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (!updatedPost[0]) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
