const handleSignIn = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }
  return db
    .select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(([{ hash }]) => {
      const isValid = bcrypt.compareSync(password, hash);
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', email)
          .then(([user]) => {
            res.json(user);
          })
          .catch(() => res.status(400).json('unable to get user'));
      }
      return res.status(400).json('wrong credentials');
    })
    .catch(() => res.status(400).json('wrong credentials'));
};

module.exports = {
  handleSignIn,
};
