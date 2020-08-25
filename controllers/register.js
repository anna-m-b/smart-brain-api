const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form sunmission');
  }
  bcrypt.hash(password, 10, function(err, hash) {
  db.transaction(trx => {     // use transaction to insert data into 2 tables at once so we never get inconsistencies (i.e a user in the users table but not in the login tabe)
      trx.insert({             // use the trx object instead of the db
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')  // use the trx object instead of the db
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0])
          })
      })  
      .then(trx.commit) //if all above pass then add it all to the db
      .catch(trx.rollback) //if something fails rollback the changes
     })
      .catch(err => res.status(400).json('unable to register')) // if we send the err we are giving the client too much information and it would be insecure
    })
  }

  module.exports = {
    handleRegister
  }