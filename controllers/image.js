const Clarifai =  require('clarifai');

const app = new Clarifai.App({
  apiKey: "86c52af651a948cc84bfb5e777b2b48d"
});

const handleApiCall = (req, res) => {
  app.models.predict(
  Clarifai.FACE_DETECT_MODEL,
  req.body.input) 
  .then(resp => {
    res.json(resp)
  })
};

const handleImage = (req, res, db) => {
  const { id } = req.body; // destructuring here broke this when using userId
  db('users').where({id})
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0])
  })
  .catch(err => res.status(400).json('unable to get user entries count'))
};

module.exports = {
  handleImage,
  handleApiCall
};