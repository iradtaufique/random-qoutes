const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// route for getting rondom quote
app.get('/api/quotes/random', (req, res, next)=>{
    let randomQuote = getRandomElement(quotes); // get romdom quotes
    res.send({
      quote: randomQuote
    });
  });


//   route for getting all routes
app.get('api/quotes', (req, res, next)=>{
    const personId = req.query.person; // quotes user id
})
  
  app.listen(PORT, ()=>{
    console.log(`Listening on Port ${PORT}`)
  })