 const getProfile = (req, res, db) => { 
  const { userid } = req.params;
  db.select('*').from('users').where('id', userid)  // or can keep all same as key in db (id)
    .then(user => {
      if (user.length) {
      res.json(user[0])
      } else {
        res.status(400).json('user not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
  }

  module.exports = {
    getProfile
  }