const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).json('incorrect sign in submission')
  }
  db.select('email', 'hash').from('login')
  .where('email', '=', email)
  .then(data => {
    bcrypt.compare(password, data[0].hash, function(err, result) {
      if (result == true) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
        })
      } else {
        res.status(400).json('unable to get user')
      }
    })
  })
  .catch(err => res.status(400).json('email or password is incorrect'))
}

module.exports = {
  handleSignin
}