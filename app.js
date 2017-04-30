const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', urlencodedParser, (req, res) => {
  res.redirect(`/${req.body.time}`);
});

//get call to return JSON that formats natural and unix date
app.get('/:date', (req, res, next) => {
  const date = req.params.date;

  const dateFormattingOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  if(isNaN(date)) {
    var naturalDate = new Date(date);
    naturalDate = naturalDate.toLocaleDateString('en-us', dateFormattingOptions);
    var unixDate = new Date(date).getTime()/1000;
  } else {
    var unixDate = date;
    var naturalDate = new Date(date*1000);
    naturalDate = naturalDate.toLocaleDateString('en-us', dateFormattingOptions);
  }

  res.json({
    unix: unixDate,
    natural: naturalDate
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
