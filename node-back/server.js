var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
const mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const connectToDB = require('./db-connect');
const validate = require('./validation');
const { validateList, validateContent } = validate;

connectToDB(); // connect to remote database first.

const Records = require('./models/records');


app.post('/list', (req, res) => {  //  fetch as a list.
  const { isValid, errors } = validateList(req.body);

  if (!isValid) {
    return res.status(400).json({
      code: 400,
      message: "Bad request, the parameters given in wrong formats",
      errors,
      records: []
    });
  }
  const { startDate, endDate } = req.body;
  let firstDate, secondDate; // they will store the splitted string words which are year,month,day.

  firstDate = startDate.split('-');
  secondDate = endDate.split('-');

  Records.
    find({}, {
      _id: 1, last_scraped: 1, name: 1, host: 1, accommodates: 1, bedrooms: 1, beds: 1, bathrooms: 1,
      amenities: 1, images: 1, address: 1, summary: 1, price: 1, monthly_price: 1, weekly_price: 1, security_deposit: 1, cleaning_fee: 1,
      review_score: 1, reviews: 1, space: 1, neighborhood_overview: 1, notes: 1, transit: 1, access: 1, interaction: 1
    }).limit(5).
    where('last_scraped').lte(new Date(secondDate[0], secondDate[1], secondDate[2])).
    gte(new Date(firstDate[0], firstDate[1], firstDate[2])).
    exec((err, doc) => {
      if (err) {
        return res.status(400).json({
          code: 500,
          message: "Internal server error",
          err
        });
      }
      else {
        return res.status(200).json({
          code: 0,
          message: "Success",
          records: doc
        });
      }
    });
});

app.post('/', (req, res) => {  //  fetch a single element by _id as an Object.
  const { isValid, errors } = validateContent(req.body);

  if (!isValid) {
    return res.status(400).json({
      code: 400,
      message: "Bad request, the id does not exist or it's in wrong formats",
      errors
    });
  }
  const { _id } = req.body;


  Records.
    findOne({ "_id": '10006546' }).
    exec((err, doc) => {
      if (err) {
        return res.status(400).json({
          code: 500,
          message: "Internal server error",
          err
        });
      }
      else {
        return res.status(200).json({
          code: 0,
          message: "success",
          records: doc
        });
      }
    });
});


let server;
app.on('ready', function () {
  server = app.listen(3000, function () {
    console.log('API listening on port 3000!');
  });
});

mongoose.connection.once('open', function () {
  // All OK - fire (emit) a ready event. 
  app.emit('ready');
});

module.exports = app;



/* Records.
   find({}).
   where("_id").equals("10006546").
   exec((err, doc) => {
     console.log(doc[0]);
   });*/



/*

 Records.
 findOne({ "_id": '10006546' }).
 exec((err, doc) => {
   console.log(doc);
 });

 */