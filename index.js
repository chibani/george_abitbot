'use strict';
let ClasseBot = require('./lib/classebot');

//Create the bot
const settings = require('./config.json');

var classebot = new ClasseBot(settings);
console.log(classebot.quotes.length+' citations prêtes à être servies');
classebot.run();

//console.log(classebot.quotesIndex);//FIXME
