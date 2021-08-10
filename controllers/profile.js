const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({ id })
    .then(([user]) => {
      if (user) {
        res.json(user);
      } else {
        res.status(400).json('Not found');
      }
    })
    .catch(() => res.status(400).json('error getting user'));
};

module.exports = {
  handleProfileGet,
};
