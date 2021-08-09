const Clarifai = require('clarifai');
const API_KEY = require('./ApiKey');

const app = new Clarifai.App({
  apiKey: API_KEY,
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch(() => res.status(400).json('unable to work with API'));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(([entries]) => {
      res.json(entries);
    })
    .catch(() => res.status(400).json('unable to get entries'));
};

module.exports = {
  handleImage,
  handleApiCall,
};
