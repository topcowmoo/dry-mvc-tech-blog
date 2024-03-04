const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

const apiAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.status(403).json({ msg: 'You must be authenticated!' });
  } else {
    next();
  }
};

module.exports = { withAuth, apiAuth };