require('dotenv').config();

const express = require("express");
const {
  ObjectId
} = require("mongodb");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const {
  Schema
} = mongoose;
mongoose.connect(
  process.env.API_DB
);
const path = require("path");

var cors = require("cors");

app.use(cors());

var bodyParser = require("body-parser");
const {
  Router
} = require("express");

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

const deskSchema = new Schema({
  title: String,
  pictures: [{
    type: Schema.Types.ObjectId,
    ref: "Pictures",
  }, ],
});

const pictureSchema = new Schema({
  url: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "Authors",
  },
});

const authorSchema = new Schema({
  name: String,
  avatar: String,
});

const deskModel = mongoose.model("Desks", deskSchema);
const authorModel = mongoose.model("Authors", authorSchema);
const pictureModel = mongoose.model("Pictures", pictureSchema);

app.use(express.static("public"));

app.get("/desks", async function (req, res) {
  const desks = await deskModel.find().populate({
    path: "pictures",
    populate: {
      path: "author",
    },
  });
  res.json({
    data: desks,
  });
});

app.post("/desks", jsonParser, async (req, res) => {
  const desk = req.body;
  const existedDesk = await deskModel.findOne({
    title: desk.title
  });
  if (existedDesk) {
    res.status(400).json({
      data: null,
      message: 'The desk with this title is already exist'
    });
    return;
  }
  const deskDoc = new deskModel(desk);
  await deskDoc.save();
  res.json({
    message: "success",
    data: deskDoc,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


app.put("/desks/:id", jsonParser, async function (req, res) {
  const newImages = req.body.map(img => img._id)
  const desk = await deskModel.findByIdAndUpdate(req.params.id, {
    pictures: newImages
  }, {
    new: true
  }).populate({
    path: "pictures",
    populate: {
      path: "author",
    },
  });
  res.json(desk);
});


app.post("/telegram", jsonParser, function sendMsg(req, res) {
  //токен и id чата берутся из config.json
  const config = require('../server/config.json');
  let http = require('request');
  let reqBody = req.body;
  // каждый элемент обьекта запихиваем в массив
  let fields = [
    '<b>Report</b>: ' + reqBody.message,
  ]
  let msg = ''
  // проходимся по массиву и склеиваем все в одну строку
  fields.forEach(field => {
    msg += field + '\n'
  });
  //кодируем результат в текст, понятный адресной строке
  msg = encodeURI(msg)
  //делаем запрос
  http.post(`https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat}&parse_mode=html&text=${msg}`, function (error, response, body) {
    if (response.statusCode === 200) {
      res.status(200).json({
        status: 'ok',
        message: 'Успешно отправлено!'
      });
    }
    if (response.statusCode !== 200) {
      res.status(400).json({
        status: 'error',
        message: 'Произошла ошибка!'
      });
    }
  });

});