const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));



const createNewQuote = (queryArguments) => {
    if (queryArguments.hasOwnProperty('quote') &&
        queryArguments.hasOwnProperty('person')) {
      return {
        'quote': queryArguments.quote,
        'person':  queryArguments.person,
      };
    } else {
      return false;
    }
  };


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


// creating new post
app.post('/api/quotes', (req, res, next)=>{
    const newquote = createNewQuote(req.query);
    if (newquote){
        quotes.push(newquote);
        const quotesObject = Object.create(null);
        quotesObject.quote = newquote;
        res.status(201).send(quotesObject);
    }else{
        res.status(400).send();
    }

});
  
  app.listen(PORT, ()=>{
    console.log(`Listening on Port ${PORT}`)
  })