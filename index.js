const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/rate', calculateRate)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function calculateRate(req, res) {
  var weight = Number(req.body.weight);
  var type = req.body.type;

  console.log(weight);
  console.log(type);
  
  var typeStr = "";
  var price = 0;
  if (type === "letter-stamped") {
    typeStr = "Letter (Stamped)";
    if (weight <= 1) {
      price = 0.55;
    }
    else if (weight <= 2) {
      price = 0.70;
    }
    else if (weight <= 3) {
      price = 0.85;
    }
    else if (weight <= 3.5) {
      price = 1.00;
    }
  }
  else if (type == "letter-metered") {
    typeStr = "Letter (Metered)";
    if (weight <= 1) {
      price = 0.50;
    }
    else if (weight <= 2) {
      price = 0.65;
    }
    else if (weight <= 3) {
      price = 0.80;
    }
    else if (weight <= 3.5) {
      price = 0.95;
    }
  }
  else if (type == "large-envelope") {
    typeStr = "Large Envelope (Flats)";
    if (weight <= 1) {
      price = 1.00;
    }
    else if (weight <= 2) {
      price = 1.15;
    }
    else if (weight <= 3) {
      price = 1.30;
    }
    else if (weight <= 4) {
      price = 1.45;
    }
    else if (weight <= 5) {
      price = 1.60;
    }
    else if (weight <= 6) {
      price = 1.75;
    }
    else if (weight <= 7) {
      price = 1.90;
    }
    else if (weight <= 8) {
      price = 2.05;
    }
    else if (weight <= 9) {
      price = 2.20;
    }
    else if (weight <= 10) {
      price = 2.35;
    }
    else if (weight <= 11) {
      price = 2.50;
    }
    else if (weight <= 12) {
      price = 2.65;
    }
    else if (weight <= 13) {
      price = 2.80;
    }
  }
  else if (type == "first-class-package") {
    typeStr = "First-Class Package Service - Retail";
    if (weight <= 4) {
      price = 3.66;
    }
    else if (weight <= 8) {
      price = 4.39;
    }
    else if (weight <= 12) {
      price = 5.19;
    }
    else if (weight <= 13) {
      price = 5.71;
    }
  }

  var params = {weight: req.body.weight, type: typeStr, price}
  res.render('pages/rate', params);
}