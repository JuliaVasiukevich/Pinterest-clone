const express = require('express');
const {
  ObjectId
} = require('mongodb');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const {
  Schema
} = mongoose;
mongoose.connect("mongodb+srv://Julia:Julia@cluster0.szljy.mongodb.net/Pinterest?retryWrites=true&w=majority");
const path = require('path');

const deskSchema = new Schema({
  title: String,
  pictures: [{
    type: Schema.Types.ObjectId,
    ref: 'Pictures'
  }]
});

const pictureSchema = new Schema({
  url: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Authors'
  },
});

const authorSchema = new Schema({
  name: String,
  avatar: String,
});

const deskModel = mongoose.model('Desks', deskSchema);
const authorModel = mongoose.model('Authors', authorSchema);
const pictureModel = mongoose.model('Pictures', pictureSchema);


// app.use(express.static('src'));
app.use(express.static('dist'));
app.use(express.static(path.join(__dirname, 'src', 'images')));

app.get('/desks', async function (req, res) {
    const desks = await deskModel.find().populate({
        path: 'pictures',
        populate: {
          path: 'author',
        }
      });
    res.json({data: desks});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})