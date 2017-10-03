const express = require('express');
const request = require('request');
const app = express();

// Variable storage area; rsurl + any_valid_ID is the API we make requests to
const rsurl = 'https://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=';
const rsRegEx = /com\/m=itemdb_oldschool\/(\d+)_obj_sprite\.gif/;

// Function definition area; getTimestamp is where we make a request to the runescape API for item data
function getTimestamp(cb) {
  request(rsurl + 2434, (err, res, body) => {
    if (err) {
      cb(err);
      return;
    }
    try {
      cb(null, JSON.parse(body).item.icon);
    } catch(e) {
      cb(e);
    }
  });
}

// Renders pug files
app.set('view engine', 'pug');

// Allows me to see what pages are being requested on the server console
app.use((req, res, next) => {
  console.log('Page requested at:', req.url);
  next()
});

// Sets the /static route to host files in the public folder on the server, so /static/index.js === ./public/index
app.use('/static', express.static('public'));

// Sets response for main page to ./views/index.pug
app.get('/', function(req, res){
  
  // Sets the variable someText in our Pug files to equal the string 'OurText'
  res.locals.someText = 'OurText';
  
  // An object can be handed as an arg to res.render to set variables alternatively to the above locals method
  res.render('index', {
    // someText: 'asdf'
  });
});

// Sets response for /rs to make a request to the rs API and render the page using the response
app.get('/rs', (req, res) => {
  getTimestamp((err, iconURL) => {
    if (err) {
      res.render('index', {
        hasError: true
      });
      return;
    }
    res.locals.someText = iconURL;
    res.render('index');
  })
});

// Creates an API response out of response data from rs API
app.get('/rsapi/get-icon', (req, res) => {
  getTimestamp((err, iconURL) => {
    if (err) {
      res.render('index', {
        hasError: true
      });
      return;
    }
    res.json({ fullURL: iconURL, timestamp: iconURL.match(rsRegEx)[1] })
  })
});

// Sets response for all other pages to display 404 in the base layout view
app.get('*', (req, res) => {
  res.render('404');
});

// Makes the app listen on port 3000 for requests
app.listen(3000);

