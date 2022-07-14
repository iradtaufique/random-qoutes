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
app.get('/api/quotes', (req, res, next) => {
    const personqtId = req.query.person;
    let allQuotesArray = [];
    if (personqtId) {
        allQuotesArray = quotes.filter(quote => quote.person === personqtId);
        const quotesObject = Object.create(null);
        quotesObject.quotes = allQuotesArray;
        res.send(quotesObject);
    } else {
        res.send({
            quotes: quotes
          });
    }
});
  
  app.listen(PORT, ()=>{
    console.log(`Listening on Port ${PORT}`)
  })