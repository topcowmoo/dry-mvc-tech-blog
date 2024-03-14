const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route to make a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      post_id: parseInt(req.body.post_id),
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json({error: 'Failed to create comment'});
  }
});

//Update an existing comment with the user logged in.
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updatedComment[0]) {
      // If no Comment is found by the provided id.
      res.status(404).json({ message: 'No comment found!' });
      return;
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

//DELETE a comment when the user is logged in.
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: { id: req.params.id },
    });

    if (!deletedComment) {
      // If no comment is found by the provided id.
      res.status(404).json({ message: 'No comment found!' });
      return;
    }

    res.status(200).json(deletedComment);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

module.exports = router;
